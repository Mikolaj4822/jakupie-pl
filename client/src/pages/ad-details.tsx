import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Link, useLocation } from "wouter";
import { Ad, AdResponse, Category, InsertAdResponse } from "@shared/schema";
import { CreateRatingForm } from "@/components/ratings/create-rating-form";
import { RatingStars } from "@/components/ratings/rating-stars";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Loader2, AlertCircle, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { FileUpload } from "@/components/ui/file-upload";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EditAdForm } from "@/components/ads/edit-ad-form";

type AdDetailsProps = {
  id: number;
};

export default function AdDetails({ id }: AdDetailsProps) {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch ad details
  const {
    data: ad,
    isLoading: adLoading,
    isError: adError,
  } = useQuery<Ad>({
    queryKey: [`/api/ads/${id}`],
    enabled: !!id
  });

  // Fetch categories for display
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch responses if the current user is the ad owner
  const {
    data: responses,
    isLoading: responsesLoading,
    isError: responsesError,
  } = useQuery<AdResponse[]>({
    queryKey: [`/api/ads/${id}/responses`],
    enabled: !!user && !!ad && user.id === ad.userId,
  });

  // Check if the current user has a response to this ad (is a seller)
  const {
    data: userResponse,
    isLoading: userResponseLoading,
  } = useQuery<AdResponse>({
    queryKey: [`/api/ads/${id}/my-response`],
    enabled: !!user && !!ad && user.id !== ad.userId,
  });

  // Define form schema for ad responses
  const responseSchema = z.object({
    message: z.string().min(10, { message: t("response.validation.messageTooShort") }),
    price: z.string().refine(val => !val || !isNaN(Number(val)), {
      message: t("response.validation.invalidPrice"),
    }),
    images: z.array(z.string()).default([]),
  });

  const responseForm = useForm<z.infer<typeof responseSchema>>({
    resolver: zodResolver(responseSchema),
    defaultValues: {
      message: "",
      price: "",
      images: [],
    },
  });

  // Create a response mutation
  const createResponseMutation = useMutation({
    mutationFn: async (data: { message: string; price?: string; images?: string[] }) => {
      if (!ad) throw new Error("Ad not found");

      // Przygotowujemy dane odpowiedzi
      // Zakodujmy zdjęcia w treści wiadomości jako specjalny znacznik JSON
      let messageWithImages = data.message;
      
      // Jeśli są zdjęcia, dodajemy je na końcu wiadomości jako metadane
      if (data.images && data.images.length > 0) {
        const imageMetadata = { __images: data.images };
        messageWithImages = `${data.message}\n\n__IMAGES_METADATA__${JSON.stringify(imageMetadata)}`;
      }
      
      const responseData: Partial<InsertAdResponse> = {
        message: messageWithImages,
        adId: ad.id,
      };

      if (data.price && data.price !== "") {
        responseData.price = parseInt(data.price, 10);
      }

      try {
        // Używamy apiRequest z danymi zawierającymi zakodowane zdjęcia w wiadomości
        const res = await apiRequest("POST", `/api/ads/${id}/responses`, responseData);
        return await res.json();
      } catch (error) {
        console.error("Error creating response:", error);
        if (error instanceof Error) {
          throw new Error(error.message || t("response.error.failed"));
        }
        throw new Error(t("response.error.failed"));
      }
    },
    onSuccess: () => {
      toast({
        title: t("response.sent.title"),
        description: t("response.sent.message"),
      });
      setShowResponseForm(false);
      responseForm.reset();
      // Refresh responses if user is ad owner
      if (user && ad && user.id === ad.userId) {
        queryClient.invalidateQueries({ queryKey: [`/api/ads/${id}/responses`] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: t("response.error.failed"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update response status mutation
  const updateResponseStatusMutation = useMutation({
    mutationFn: async ({ responseId, status }: { responseId: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/responses/${responseId}/status`, { status });
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "The response status has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/ads/${id}/responses`] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Update Status",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onResponseSubmit(data: z.infer<typeof responseSchema>) {
    const responseData = {
      message: data.message,
      price: data.price && data.price !== "" ? data.price : undefined,
      images: data.images
    };
    createResponseMutation.mutate(responseData);
  }

  function handleAcceptResponse(responseId: number) {
    updateResponseStatusMutation.mutate({ responseId, status: "accepted" });
  }

  function handleRejectResponse(responseId: number) {
    updateResponseStatusMutation.mutate({ responseId, status: "rejected" });
  }

  // Get category name
  const getCategoryName = (categoryId: number) => {
    if (!categories) return "Loading...";
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Get category color
  const getCategoryColor = (categoryId: number) => {
    if (!categories) return "indigo";
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.color : "indigo";
  };

  // Generate avatar initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const isLoading = adLoading || categoriesLoading || (user && ad && user.id === ad.userId && responsesLoading) || (user && ad && user.id !== ad.userId && userResponseLoading);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (adError || !ad) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            This ad could not be found or has been removed.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button variant="outline" onClick={() => navigate("/browse")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = user && user.id === ad.userId;
  const formattedDate = format(new Date(ad.createdAt), "MMM d, yyyy");

  return (
    <>
      <Helmet>
        <title>{ad.title} - {t("app.name")}</title>
        <meta name="description" content={ad.description.substring(0, 160)} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://jakupie.pl/ad/${ad.id}`} />
        <meta property="og:title" content={`${ad.title} - ${t("app.name")}`} />
        <meta property="og:description" content={ad.description.substring(0, 160)} />
        {ad.images && ad.images.length > 0 && (
          <meta property="og:image" content={ad.images[0]} />
        )}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://jakupie.pl/ad/${ad.id}`} />
        <meta property="twitter:title" content={`${ad.title} - ${t("app.name")}`} />
        <meta property="twitter:description" content={ad.description.substring(0, 160)} />
        {ad.images && ad.images.length > 0 && (
          <meta property="twitter:image" content={ad.images[0]} />
        )}
      </Helmet>

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Ad details */}
          <div className="flex-1">
            <div className="mb-4">
              <Button variant="outline" onClick={() => navigate("/browse")}>
                <ArrowLeft className="mr-2 h-4 w-4" /> {t("browse.backToList")}
              </Button>
            </div>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className={`bg-${getCategoryColor(ad.categoryId)}-100 text-${getCategoryColor(ad.categoryId)}-600`}>
                      {getCategoryName(ad.categoryId)}
                    </Badge>
                    <CardTitle className="mt-2 text-2xl dark:text-white">{ad.title}</CardTitle>
                  </div>
                  <Badge variant={ad.status === "active" ? "default" : "secondary"}>
                    {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <i className="fas fa-calendar-alt mr-1"></i>
                  <span>{t("adDetails.posted")} {formattedDate}</span>
                  {ad.location && (
                    <>
                      <span className="mx-2">•</span>
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      <span>{ad.location}</span>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium dark:text-white">{t("adDetails.description")}</h3>
                    <p className="mt-2 whitespace-pre-line dark:text-gray-300">{ad.description}</p>
                  </div>

                  {/* Usuwamy całkowicie sekcję budżetu, ponieważ dane są niepoprawne */}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {isOwner ? (
                  <div className="flex space-x-2 items-center">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{t("adDetails.ownAd")}</div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">{t("ad.details.edit")}</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>{t("ad.details.edit")}</DialogTitle>
                          <DialogDescription>
                            {t("createAd.form.description")}
                          </DialogDescription>
                        </DialogHeader>
                        <EditAdForm ad={ad} categories={categories || []} onSuccess={() => {
                          queryClient.invalidateQueries({ queryKey: [`/api/ads/${id}`] });
                        }} />
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : ad.status === "active" ? (
                  <Button onClick={() => setShowResponseForm(true)}>{t("adDetails.contactBuyer")}</Button>
                ) : (
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t("adDetails.notActive")}</div>
                )}
              </CardFooter>
            </Card>

            {/* Rating form for sellers */}
            {!isOwner && userResponse && userResponse.status === "accepted" && (
              <Card className="mt-6 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">Oceń kupującego</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Twoja oferta została zaakceptowana. Możesz teraz ocenić kupującego.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateRatingForm 
                    adId={ad.id}
                    toUserId={ad.userId}
                    allowedTypes={["seller"]}
                    adTitle={ad.title}
                  />
                </CardContent>
              </Card>
            )}
            
            {/* Response form */}
            {!isOwner && ad.status === "active" && showResponseForm && (
              <Card className="mt-6 dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="dark:text-white">{t("adDetails.contactForm.title")}</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    {t("adDetails.contactForm.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...responseForm}>
                    <form onSubmit={responseForm.handleSubmit(onResponseSubmit)} className="space-y-4">
                      <FormField
                        control={responseForm.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("response.form.yourMessage")}</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder={t("response.form.message.enterDetails")}
                                className="min-h-[100px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={responseForm.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("response.form.yourPrice")}</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-2.5">zł</span>
                                <Input 
                                  type="text" 
                                  inputMode="numeric" 
                                  placeholder={t("response.form.price.enterPrice")}
                                  className="pl-7" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              {t("response.form.price.leaveEmpty")}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={responseForm.control}
                        name="images"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("response.form.images")}</FormLabel>
                            <FormControl>
                              <FileUpload
                                onChange={field.onChange}
                                value={field.value || []}
                                maxFiles={5}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex gap-2">
                        <Button 
                          type="submit" 
                          disabled={createResponseMutation.isPending}
                        >
                          {createResponseMutation.isPending ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {t("common.sending")}
                            </>
                          ) : (
                            t("response.form.sendMessage")
                          )}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setShowResponseForm(false)}
                        >
                          {t("response.form.cancel")}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Responses section (for ad owner only) */}
          {isOwner && (
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Otrzymane odpowiedzi</CardTitle>
                  <CardDescription>
                    {responses && responses.length > 0
                      ? (responses.length === 1 ? "Otrzymano jedną odpowiedź" : `Otrzymano ${responses.length} odpowiedzi`)
                      : "Brak odpowiedzi na to ogłoszenie"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {responsesError ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Błąd</AlertTitle>
                      <AlertDescription>
                        Nie udało się załadować odpowiedzi. Spróbuj ponownie.
                      </AlertDescription>
                    </Alert>
                  ) : responses && responses.length > 0 ? (
                    <div className="space-y-4">
                      {responses.map((response) => (
                        <div key={response.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar>
                                <AvatarFallback>
                                  {response.sellerId.toString().substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="ml-2">
                                <div className="font-medium">
                                  {`${t("seller")} #${response.sellerId}`}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {format(new Date(response.createdAt), 
                                    language === 'pl' ? "d 'maj' yyyy" : "MMM d, yyyy"
                                  )}
                                </div>
                              </div>
                            </div>
                            <Badge variant={
                              response.status === "pending" ? "outline" : 
                              response.status === "accepted" ? "secondary" : 
                              "destructive"
                            }>
                              {t(`response.status.${response.status.toLowerCase()}Label`)}
                            </Badge>
                          </div>
                          
                          <Separator className="my-3" />
                          
                          <div className="mt-2">
                            {/* Wyświetlamy wiadomość bez metadanych zdjęć */}
                            <p className="text-sm">
                              {response.message && response.message.includes('__IMAGES_METADATA__')
                                ? response.message.split('__IMAGES_METADATA__')[0]
                                : response.message
                              }
                            </p>
                            
                            {response.price && (
                              <div className="mt-2">
                                <span className="text-sm font-medium">Oferowana cena: </span>
                                <span className="font-bold">{response.price} zł</span>
                              </div>
                            )}
                            
                            {/* Wyświetlanie rzeczywistych zdjęć z odpowiedzi */}
                            {response.message && response.message.includes('__IMAGES_METADATA__') && (
                              (() => {
                                try {
                                  // Próbujemy wyciągnąć metadane ze zdjęciami
                                  const metadataPart = response.message.split('__IMAGES_METADATA__')[1];
                                  const imageMetadata = JSON.parse(metadataPart);
                                  const images: string[] = imageMetadata.__images || [];
                                  
                                  if (images.length > 0) {
                                    return (
                                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {images.map((image, idx) => (
                                          <div 
                                            key={idx} 
                                            className="relative aspect-video rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                                            onClick={() => setSelectedImage(image)}
                                          >
                                            <img 
                                              src={image} 
                                              alt={`Zdjęcie ${idx+1}`} 
                                              className="object-cover w-full h-full"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all">
                                              <span className="text-white text-sm font-medium opacity-0 hover:opacity-100">Powiększ</span>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    );
                                  }
                                } catch (e) {
                                  console.error("Błąd odczytu zdjęć z wiadomości:", e);
                                }
                                return null;
                              })()
                            )}
                          </div>
                          
                          {response.status === "accepted" && (
                            <div className="mt-4 border-t pt-4">
                              <h4 className="text-sm font-medium mb-2">{t("rating.rateTransaction")}</h4>
                              <CreateRatingForm 
                                adId={ad.id}
                                toUserId={response.sellerId}
                                allowedTypes={["buyer"]}
                                adTitle={ad.title}
                              />
                            </div>
                          )}
                          
                          {response.status === "pending" && (
                            <div className="mt-4 flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="default">Akceptuj</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Zaakceptować tę ofertę?</DialogTitle>
                                    <DialogDescription>
                                      Zamierzasz zaakceptować ofertę tego sprzedawcy. Powiadomimy go o Twojej decyzji.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button 
                                      onClick={() => handleAcceptResponse(response.id)}
                                      disabled={updateResponseStatusMutation.isPending}
                                    >
                                      {updateResponseStatusMutation.isPending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        "Tak, akceptuję ofertę"
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">Odrzuć</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Odrzucić tę ofertę?</DialogTitle>
                                    <DialogDescription>
                                      Zamierzasz odrzucić ofertę tego sprzedawcy. Powiadomimy go o Twojej decyzji.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button 
                                      variant="destructive"
                                      onClick={() => handleRejectResponse(response.id)}
                                      disabled={updateResponseStatusMutation.isPending}
                                    >
                                      {updateResponseStatusMutation.isPending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        "Tak, odrzucam ofertę"
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <i className="fas fa-inbox text-4xl mb-2"></i>
                      <p>{t("ad.details.noResponses")}</p>
                      <p className="text-sm mt-1">{t("ad.details.whenSellersRespond")}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      {/* Modal do powiększania zdjęć */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img 
              src={selectedImage} 
              alt="Powiększone zdjęcie" 
              className="max-h-[90vh] max-w-full object-contain mx-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}

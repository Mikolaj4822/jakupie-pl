import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import { Ad, AdResponse, Category } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdCard from "@/components/ads/ad-card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserRatingSummary } from "@/components/ratings/user-rating-summary";
import { UserRatingsList } from "@/components/ratings/user-ratings-list";

export default function UserDashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("my-ads");

  // Fetch user's ads
  const {
    data: userAds,
    isLoading: userAdsLoading,
    isError: userAdsError,
  } = useQuery<Ad[]>({
    queryKey: ["/api/user/ads"],
  });

  // Fetch user's responses
  const {
    data: userResponses,
    isLoading: userResponsesLoading,
    isError: userResponsesError,
  } = useQuery<AdResponse[]>({
    queryKey: ["/api/user/responses"],
  });

  // Fetch categories for display
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch ads related to user's responses
  const {
    data: responseAds,
    isLoading: responseAdsLoading,
  } = useQuery<Ad[]>({
    queryKey: ["/api/ads"],
    enabled: !!userResponses && userResponses.length > 0,
  });

  const isLoading = userAdsLoading || userResponsesLoading || categoriesLoading || responseAdsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Get ad details for a response
  const getAdForResponse = (adId: number) => {
    if (!responseAds) return null;
    return responseAds.find(ad => ad.id === adId);
  };

  return (
    <>
      <Helmet>
        <title>{t("dashboard.title")} - {t("app.name")}</title>
        <meta name="description" content={`${t("dashboard.subtitle")} ${t("app.name")}.`} />
      </Helmet>

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t("dashboard.title")}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{t("dashboard.subtitle")}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/create-ad">
              <Button>
                <i className="fas fa-plus mr-2"></i> {t("dashboard.post.new")}
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-2/3 grid-cols-3 mb-8">
            <TabsTrigger value="my-ads">{t("dashboard.tabs.myAds")}</TabsTrigger>
            <TabsTrigger value="my-responses">{t("dashboard.tabs.myResponses")}</TabsTrigger>
            <TabsTrigger value="ratings">{t("user_ratings")}</TabsTrigger>
          </TabsList>

          <TabsContent value="my-ads">
            {userAdsError ? (
              <Card className="dark:bg-gray-800">
                <CardContent className="pt-6">
                  <p className="text-red-500">{t("dashboard.errors.ads")}</p>
                </CardContent>
              </Card>
            ) : userAds && userAds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userAds.map((ad) => (
                  <AdCard key={ad.id} ad={ad} categories={categories || []} showManageButton />
                ))}
              </div>
            ) : (
              <Card className="dark:bg-gray-800">
                <CardContent className="pt-6 text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{t("dashboard.noAds.title")}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">{t("dashboard.noAds.subtitle")}</p>
                  <Link href="/create-ad">
                    <Button>
                      <i className="fas fa-plus mr-2"></i> {t("dashboard.noAds.cta")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ratings">
            {user && (
              <div className="space-y-8">
                <UserRatingSummary userId={user.id} />
                <UserRatingsList userId={user.id} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-responses">
            {userResponsesError ? (
              <Card className="dark:bg-gray-800">
                <CardContent className="pt-6">
                  <p className="text-red-500">{t("dashboard.errors.responses")}</p>
                </CardContent>
              </Card>
            ) : userResponses && userResponses.length > 0 ? (
              <div className="space-y-6">
                {userResponses.map((response) => {
                  const ad = getAdForResponse(response.adId);
                  
                  return (
                    <Card key={response.id} className="dark:bg-gray-800">
                      <CardHeader>
                        <div className="flex justify-between">
                          <div>
                            <CardTitle className="dark:text-white">
                              {ad ? (
                                <Link href={`/ads/${ad.id}`} className="hover:underline">
                                  {ad.title}
                                </Link>
                              ) : (
                                t("dashboard.response.loading")
                              )}
                            </CardTitle>
                            <CardDescription className="dark:text-gray-400">
                              {`${t("dashboard.response.date")} ${format(new Date(response.createdAt), "MMM d, yyyy")}`}
                            </CardDescription>
                          </div>
                          <Badge variant={
                            response.status === "pending" ? "outline" : 
                            response.status === "accepted" ? "default" : 
                            "secondary"
                          }>
                            {response.status.charAt(0).toUpperCase() + response.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium dark:text-gray-300">{t("dashboard.response.message")}</h4>
                            <p className="mt-1 text-gray-700 dark:text-gray-300">{response.message}</p>
                          </div>
                          
                          {response.price && (
                            <div>
                              <h4 className="text-sm font-medium dark:text-gray-300">{t("dashboard.response.price")}</h4>
                              <p className="mt-1 font-bold dark:text-white">{response.price} zł</p>
                            </div>
                          )}
                          
                          <Separator className="dark:bg-gray-700" />
                          
                          {ad && (
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="text-sm font-medium dark:text-gray-300">{t("dashboard.response.adStatus")}</h4>
                                <Badge variant="outline" className="mt-1">{ad.status}</Badge>
                              </div>
                              <Link href={`/ads/${ad.id}`}>
                                <Button variant="outline" size="sm">
                                  {t("dashboard.response.viewAd")}
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="dark:bg-gray-800">
                <CardContent className="pt-6 text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">{t("dashboard.noResponses.title")}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">{t("dashboard.noResponses.subtitle")}</p>
                  <Link href="/browse">
                    <Button>
                      <i className="fas fa-search mr-2"></i> {t("dashboard.noResponses.cta")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category, insertAdSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import AdForm from "@/components/ads/ad-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

export default function CreateAd() {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  
  // Fetch categories
  const { data: categories, isLoading: categoriesLoading, isError: categoriesError } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  // Extended schema with validation
  const formSchema = insertAdSchema.extend({
    categoryId: z.number({
      required_error: t("createAd.validation.category"),
      invalid_type_error: t("createAd.validation.category"),
    }),
    title: z.string().min(5, { message: t("createAd.validation.title.min") }),
    description: z.string().min(20, { message: t("createAd.validation.description.min") }),
    minBudget: z.number().min(0, { message: t("createAd.validation.minBudget") }).optional(),
    maxBudget: z.number().min(0, { message: t("createAd.validation.maxBudget") }).optional(),
  }).refine(data => {
    // If both budgets are provided, maxBudget should be greater than or equal to minBudget
    if (data.minBudget !== undefined && data.maxBudget !== undefined) {
      return data.maxBudget >= data.minBudget;
    }
    return true;
  }, {
    message: t("createAd.validation.budgetRange"),
    path: ["maxBudget"],
  });
  
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      minBudget: undefined,
      maxBudget: undefined,
      userId: 0, // Will be set by the server
      categoryId: 0, // Will be selected by user
    },
  });
  
  // Create ad mutation
  const createAdMutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const res = await apiRequest("POST", "/api/ads", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: t("createAd.success.title"),
        description: t("createAd.success.description"),
      });
      // Invalidate ads query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["/api/ads"] });
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      toast({
        title: t("createAd.error.title"),
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Handle form submission
  function onSubmit(data: z.infer<typeof formSchema>) {
    createAdMutation.mutate(data);
  }
  
  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (categoriesError || !categories) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {t("createAd.error.loading")}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("createAd.title")} - {t("app.name")}</title>
        <meta name="description" content={t("createAd.description")} />
      </Helmet>

      <div className="bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
              {t("createAd.title")}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              {t("createAd.description")}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-9">
              <Card className="dark:bg-gray-800 border-t-4 border-red-500 shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                      <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-1">
                        Stwórz swoje ogłoszenie
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Wypełnij formularz poniżej, aby stworzyć ogłoszenie. Im dokładniej opiszesz czego szukasz, tym trafniejsze oferty otrzymasz.
                      </p>
                    </div>
                    
                    <AdForm
                      form={form}
                      onSubmit={onSubmit}
                      categories={categories}
                      isLoading={createAdMutation.isPending}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sticky top-6 border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Wskazówki
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
                  <li className="flex">
                    <span className="text-red-500 font-bold mr-2">•</span>
                    <span>Używaj jasnych i konkretnych opisów</span>
                  </li>
                  <li className="flex">
                    <span className="text-red-500 font-bold mr-2">•</span>
                    <span>Podaj swój budżet - zwiększa to szanse na dopasowane oferty</span>
                  </li>
                  <li className="flex">
                    <span className="text-red-500 font-bold mr-2">•</span>
                    <span>Uzupełnij wszystkie filtry kategorii - pomaga to w dokładnym dopasowaniu</span>
                  </li>
                  <li className="flex">
                    <span className="text-red-500 font-bold mr-2">•</span>
                    <span>Dodaj lokalizację, aby otrzymać oferty z twojego regionu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { Ad, Category } from "@shared/schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";

interface EditAdFormProps {
  ad: Ad;
  categories: Category[];
  onSuccess: () => void;
}

// Schema for form validation
const editAdSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters",
  }),
  categoryId: z.number({
    required_error: "Please select a category",
  }),
  budgetRange: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
});

export function EditAdForm({ ad, categories, onSuccess }: EditAdFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(true);

  // Initialize form with existing ad data
  const form = useForm<z.infer<typeof editAdSchema>>({
    resolver: zodResolver(editAdSchema),
    defaultValues: {
      title: ad.title,
      description: ad.description,
      categoryId: ad.categoryId,
      budgetRange: ad.budgetRange || "", // Przekształcamy null na pusty string
      location: ad.location || "", // Przekształcamy null na pusty string
    },
  });

  // Mutation for updating the ad
  const updateAdMutation = useMutation({
    mutationFn: async (values: z.infer<typeof editAdSchema>) => {
      try {
        // Logujemy wartości formularza przed wysłaniem
        console.log("Wysyłanie danych do serwera:", values);
        
        const res = await fetch(`/api/ads/${ad.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        });
        
        // Sprawdzamy, czy odpowiedź jest prawidłowa
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Błąd aktualizacji ogłoszenia:", errorText);
          throw new Error(`Błąd serwera: ${res.status} ${res.statusText}`);
        }
        
        // Zwracamy sukces nawet bez parsowania odpowiedzi JSON
        return { success: true };
      } catch (error) {
        console.error("Błąd podczas wywołania PATCH:", error);
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Ogłoszenie zaktualizowane",
        description: "Twoje ogłoszenie zostało pomyślnie zaktualizowane.",
      });
      
      // Wywołujemy funkcję onSuccess, która odświeża dane
      onSuccess();
      
      // Zamykamy dialog
      setDialogOpen(false);
      
      // Odświeżamy stronę po krótkim opóźnieniu, aby toast został wyświetlony
      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (error: Error) => {
      toast({
        title: "Błąd aktualizacji",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof editAdSchema>) {
    updateAdMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">{t("createAd.form.title")}</FormLabel>
              <FormControl>
                <Input placeholder={t("createAd.form.title.placeholder")} {...field} className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" />
              </FormControl>
              <FormDescription className="dark:text-gray-400">
                {t("createAd.form.title.desc")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">{t("createAd.form.category")}</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : undefined}
              >
                <FormControl>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue placeholder={t("createAd.form.category.placeholder")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()} className="dark:text-gray-200 dark:focus:bg-gray-700">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">{t("createAd.form.description")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("createAd.form.description.placeholder")}
                  className="min-h-[200px] dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  {...field}
                />
              </FormControl>
              <FormDescription className="dark:text-gray-400">
                {t("createAd.form.description.desc")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budgetRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-white">{t("createAd.form.budgetRange")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 dark:text-gray-200">zł</span>
                  <Input
                    type="text"
                    placeholder=""
                    className="pl-7 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    {...field}
                    value={field.value || ""}
                  />
                </div>
              </FormControl>
              <FormDescription className="dark:text-gray-400">
                {t("createAd.form.budgetRange.desc")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => {
            // Upewnij się, że wartość jest zawsze stringiem
            const safeValue = field.value || "";
            return (
              <FormItem>
                <FormLabel className="dark:text-white">{t("createAd.form.location")}</FormLabel>
                <FormControl>
                  <Input 
                    placeholder={t("createAd.form.location.placeholder")} 
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" 
                    {...field}
                    value={safeValue}
                  />
                </FormControl>
                <FormDescription className="dark:text-gray-400">
                  {t("createAd.form.location.desc")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <DialogFooter>
          <Button type="submit" disabled={updateAdMutation.isPending} className="bg-slate-700 hover:bg-slate-800">
            {updateAdMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("createAd.form.submitting")}
              </>
            ) : (
              t("ad.details.edit")
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
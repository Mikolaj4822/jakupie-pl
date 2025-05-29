import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "./rating-stars";
import { ShoppingCart, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCreateRating } from "@/hooks/use-ratings";
import { useLanguage } from "@/hooks/use-language";

// Schema for the rating form
const ratingFormSchema = z.object({
  adId: z.number(),
  toUserId: z.number(),
  score: z.number().min(1).max(5),
  ratingType: z.enum(["buyer", "seller"]),
  comment: z.string().max(500).nullable().default(null),
  transactionId: z.number().nullable().default(null),
});

type RatingFormValues = z.infer<typeof ratingFormSchema>;

interface CreateRatingFormProps {
  adId: number;
  toUserId: number;
  allowedTypes: Array<"buyer" | "seller">;
  onSuccess?: () => void;
  adTitle?: string;
}

export function CreateRatingForm({
  adId,
  toUserId,
  allowedTypes,
  onSuccess,
  adTitle,
}: CreateRatingFormProps) {
  const { t } = useLanguage();
  const createRatingMutation = useCreateRating();
  const [score, setScore] = useState(5);
  
  // Default to the first allowed type
  const defaultType = allowedTypes[0] || "buyer";
  
  const form = useForm<RatingFormValues>({
    resolver: zodResolver(ratingFormSchema),
    defaultValues: {
      adId,
      toUserId,
      score: 5,
      ratingType: defaultType,
      comment: null,
      transactionId: null,
    },
  });
  
  function onSubmit(data: RatingFormValues) {
    createRatingMutation.mutate(data, {
      onSuccess: () => {
        if (onSuccess) onSuccess();
      },
    });
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wystaw ocenę</CardTitle>
        {adTitle && (
          <p className="text-sm text-muted-foreground mt-1">
            Dla transakcji: {adTitle}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ocena</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <RatingStars
                        rating={score}
                        interactive
                        size="lg"
                        onChange={(newScore) => {
                          setScore(newScore);
                          field.onChange(newScore);
                        }}
                      />
                      <span className="text-xl font-semibold">{score}/5</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {allowedTypes.length > 1 && (
              <FormField
                control={form.control}
                name="ratingType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Typ oceny</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {allowedTypes.includes("buyer") && (
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="buyer" id="buyer" />
                            <Label htmlFor="buyer" className="flex items-center">
                              <ShoppingCart className="h-4 w-4 mr-2 text-primary" />
                              Jako kupujący
                            </Label>
                          </div>
                        )}
                        {allowedTypes.includes("seller") && (
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="seller" id="seller" />
                            <Label htmlFor="seller" className="flex items-center">
                              <Store className="h-4 w-4 mr-2 text-primary" />
                              Jako sprzedawca
                            </Label>
                          </div>
                        )}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Komentarz</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Wpisz swój komentarz..."
                      className="min-h-[100px]"
                      value={field.value === null ? '' : field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={createRatingMutation.isPending}
            >
              {createRatingMutation.isPending ? "Wysyłanie..." : "Wyślij ocenę"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
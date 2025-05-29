import { useUserRatingStats } from "@/hooks/use-ratings";
import { RatingStars } from "./rating-stars";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, ThumbsDown, Minus, Award, ShoppingCart, Store } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/use-language";

interface UserRatingSummaryProps {
  userId: number;
  showTitle?: boolean;
}

export function UserRatingSummary({ userId, showTitle = true }: UserRatingSummaryProps) {
  const { data: stats, isLoading } = useUserRatingStats(userId);
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          {showTitle && <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-8 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!stats || !stats.totalRatingsReceived) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          {showTitle && <CardTitle>{t("user_ratings")}</CardTitle>}
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <Award className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>{t("no_ratings_yet")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        {showTitle && <CardTitle>{t("user_ratings")}</CardTitle>}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <RatingStars rating={stats.averageRating} className="mt-1" />
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3 text-green-500" /> 
                {stats.positiveRatings}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Minus className="h-3 w-3 text-amber-500" /> 
                {stats.neutralRatings}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <ThumbsDown className="h-3 w-3 text-red-500" /> 
                {stats.negativeRatings}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="border border-muted">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4 text-primary" /> 
                    <span className="font-medium">{t("as_buyer")}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stats.asBuyerRatings} {t("ratings")}
                  </span>
                </div>
                {stats.asBuyerRatings > 0 ? (
                  <div className="flex items-center justify-between">
                    <RatingStars rating={stats.asBuyerAvgRating} size="sm" />
                    <span className="font-semibold">{stats.asBuyerAvgRating.toFixed(1)}</span>
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    {t("no_buyer_ratings")}
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="border border-muted">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4 text-primary" /> 
                    <span className="font-medium">{t("as_seller")}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stats.asSellerRatings} {t("ratings")}
                  </span>
                </div>
                {stats.asSellerRatings > 0 ? (
                  <div className="flex items-center justify-between">
                    <RatingStars rating={stats.asSellerAvgRating} size="sm" />
                    <span className="font-semibold">{stats.asSellerAvgRating.toFixed(1)}</span>
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    {t("no_seller_ratings")}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
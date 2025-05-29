import { useUserRatings, RatingWithUser } from "@/hooks/use-ratings";
import { RatingStars } from "./rating-stars";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Store, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/hooks/use-language";

interface UserRatingsListProps {
  userId: number;
  showTitle?: boolean;
}

export function UserRatingsList({ userId, showTitle = true }: UserRatingsListProps) {
  const { data: ratings, isLoading } = useUserRatings(userId);
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          {showTitle && <CardTitle><Skeleton className="h-6 w-40" /></CardTitle>}
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!ratings || ratings.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          {showTitle && <CardTitle>{t("user_ratings")}</CardTitle>}
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <p>{t("user_has_no_ratings")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Group ratings by type
  const buyerRatings = ratings.filter(r => r.ratingType === 'buyer');
  const sellerRatings = ratings.filter(r => r.ratingType === 'seller');
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        {showTitle && <CardTitle>{t("user_ratings")}</CardTitle>}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">{t("all_ratings")} ({ratings.length})</TabsTrigger>
            <TabsTrigger value="buyer">
              <ShoppingCart className="h-4 w-4 mr-1" />
              {t("as_buyer")} ({buyerRatings.length})
            </TabsTrigger>
            <TabsTrigger value="seller">
              <Store className="h-4 w-4 mr-1" />
              {t("as_seller")} ({sellerRatings.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {ratings.map(rating => (
              <RatingItem key={rating.id} rating={rating} />
            ))}
          </TabsContent>
          
          <TabsContent value="buyer" className="space-y-4">
            {buyerRatings.length > 0 ? (
              buyerRatings.map(rating => (
                <RatingItem key={rating.id} rating={rating} />
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <p>{t("no_buyer_ratings_yet")}</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="seller" className="space-y-4">
            {sellerRatings.length > 0 ? (
              sellerRatings.map(rating => (
                <RatingItem key={rating.id} rating={rating} />
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <p>{t("no_seller_ratings_yet")}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function RatingItem({ rating }: { rating: RatingWithUser }) {
  const { t } = useLanguage();
  
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={rating.rater.avatar || undefined} alt={rating.rater.username} />
            <AvatarFallback>{rating.rater.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{rating.rater.fullName || rating.rater.username}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {format(new Date(rating.createdAt), "d MMM yyyy")}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <RatingStars rating={rating.score} size="sm" />
          <Badge variant="outline" className="mt-1">
            {rating.ratingType === 'buyer' 
              ? <><ShoppingCart className="h-3 w-3 mr-1" /> {t("as_buyer")}</>
              : <><Store className="h-3 w-3 mr-1" /> {t("as_seller")}</>
            }
          </Badge>
        </div>
      </div>
      
      {rating.comment && (
        <div className="mt-2 text-sm">
          "{rating.comment}"
        </div>
      )}
    </div>
  );
}
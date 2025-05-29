import { Ad, Category, User } from "@shared/schema";
import { Link } from "wouter";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/hooks/use-language";
import { useQuery } from "@tanstack/react-query";

interface AdCardProps {
  ad: Ad;
  categories: Category[];
  showManageButton?: boolean;
}

export default function AdCard({ ad, categories, showManageButton = false }: AdCardProps) {
  // Get translation function
  const { t } = useLanguage();
  
  // Find the category of the ad
  const category = categories.find((cat) => cat.id === ad.categoryId);
  
  // Get user data
  const { data: userData } = useQuery<User>({
    queryKey: [`/api/users/${ad.userId}`],
    enabled: !!ad.userId
  });
  
  // Format the date as relative time in Polish (e.g., "2 dni temu")
  const timeAgo = formatDistanceToNow(new Date(ad.createdAt), { 
    addSuffix: true,
    locale: pl
  });
  
  // Get color based on category
  const getCategoryColor = (color: string = "indigo") => {
    return {
      indigo: "bg-indigo-100 text-indigo-800",
      blue: "bg-blue-100 text-blue-800",
      green: "bg-green-100 text-green-800",
      yellow: "bg-yellow-100 text-yellow-800",
      red: "bg-red-100 text-red-800",
      purple: "bg-purple-100 text-purple-800",
    }[color] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={getCategoryColor(category?.color)}>
              {category?.name || "Unknown"}
            </Badge>
            <h3 className="mt-2 text-xl font-semibold text-gray-800">
              <Link href={`/ads/${ad.id}`} className="hover:text-primary">
                {ad.title}
              </Link>
            </h3>
          </div>
          <span className="text-gray-500 text-sm">{timeAgo}</span>
        </div>
        
        <p className="mt-3 text-gray-600 line-clamp-3">{ad.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            {ad.budgetRange && (
              <>
                <span className="text-sm font-medium text-gray-800 mr-1">
                  Budżet:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {ad.budgetRange.includes("zł") ? ad.budgetRange : `${ad.budgetRange} zł`}
                </span>
              </>
            )}
          </div>
          {ad.location && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <i className="fas fa-map-marker-alt"></i>
              <span>{ad.location}</span>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-indigo-100 text-indigo-500 text-xs">
                {userData && userData.username ? userData.username.substring(0, 2).toUpperCase() : ad.userId.toString().substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {userData && (userData.fullName || userData.username) || `User #${ad.userId}`}
            </span>
          </div>
          
          {showManageButton ? (
            <Link href={`/ads/${ad.id}`}>
              <Button variant="outline" size="sm">
                {t("adCard.manage")}
              </Button>
            </Link>
          ) : (
            <Link href={`/ads/${ad.id}`}>
              <Button size="sm" variant="outline">
                {t("adCard.contact")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

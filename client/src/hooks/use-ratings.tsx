import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Rating } from "@shared/schema";

// Typ reprezentujący ocenę z dodatkowymi informacjami o użytkowniku
export type RatingWithUser = Rating & {
  rater: {
    id: number;
    username: string;
    fullName: string;
    email: string;
    avatar: string | null;
  }
};

// Hook do pobierania ocen dla użytkownika
export function useUserRatings(userId: number, type?: string) {
  const queryKey = type 
    ? [`/api/users/${userId}/ratings`, { type }]
    : [`/api/users/${userId}/ratings`];
    
  return useQuery<RatingWithUser[], Error>({
    queryKey,
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!userId,
  });
}

// Hook do pobierania statystyk ocen użytkownika
export function useUserRatingStats(userId: number) {
  return useQuery({
    queryKey: [`/api/users/${userId}/rating-stats`],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!userId,
  });
}

// Hook do tworzenia nowej oceny
export function useCreateRating() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (rating: Omit<Rating, "id" | "fromUserId" | "createdAt">) => {
      const res = await apiRequest("POST", "/api/ratings", rating);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Ocena dodana",
        description: "Twoja ocena została pomyślnie dodana.",
      });
      
      // Aktualizacja cache'a dla użytkownika, który otrzymał ocenę
      queryClient.invalidateQueries({
        queryKey: [`/api/users/${data.toUserId}/ratings`],
      });
      queryClient.invalidateQueries({
        queryKey: [`/api/users/${data.toUserId}/rating-stats`],
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się dodać oceny: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

// Hook do aktualizacji oceny
export function useUpdateRating() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { score?: number; comment?: string } }) => {
      const res = await apiRequest("PATCH", `/api/ratings/${id}`, data);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Ocena zaktualizowana",
        description: "Twoja ocena została pomyślnie zaktualizowana.",
      });
      
      // Aktualizacja cache'a dla użytkownika, który otrzymał ocenę
      queryClient.invalidateQueries({
        queryKey: [`/api/users/${data.toUserId}/ratings`],
      });
      queryClient.invalidateQueries({
        queryKey: [`/api/users/${data.toUserId}/rating-stats`],
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się zaktualizować oceny: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

// Hook do usuwania oceny
export function useDeleteRating() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, toUserId }: { id: number; toUserId: number }) => {
      await apiRequest("DELETE", `/api/ratings/${id}`);
      return { id, toUserId };
    },
    onSuccess: (data) => {
      toast({
        title: "Ocena usunięta",
        description: "Twoja ocena została pomyślnie usunięta.",
      });
      
      // Aktualizacja cache'a dla użytkownika, który miał ocenę
      queryClient.invalidateQueries({
        queryKey: [`/api/users/${data.toUserId}/ratings`],
      });
      queryClient.invalidateQueries({
        queryKey: [`/api/users/${data.toUserId}/rating-stats`],
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się usunąć oceny: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}
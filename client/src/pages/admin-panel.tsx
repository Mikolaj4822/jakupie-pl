import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Search, Trash2, Ban, CheckCircle, UserX, Shield } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { User, Ad } from "@shared/schema";

// Tymczasowe rozwiązanie dla ról użytkowników - w produkcji powinno być w bazie danych
const ADMIN_EMAILS = ["admin@jakupie.pl", "za@za"]; // dodany Twój email za@za jako admin

export default function AdminPanel() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [bannedUsers, setBannedUsers] = useState<number[]>([]);

  // Sprawdzenie czy użytkownik jest administratorem
  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  // Przekierowanie jeśli użytkownik nie jest zalogowany lub nie jest adminem
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    } 
    
    if (!isAdmin) {
      toast({
        title: "Brak dostępu",
        description: "Nie masz uprawnień do panelu administratora.",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [user, isAdmin, navigate, toast]);

  // Pobierz listę użytkowników
  const { 
    data: users = [], 
    isLoading: usersLoading,
    refetch: refetchUsers
  } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", "/api/users");
        return await response.json();
      } catch (error) {
        console.error(t("admin.error"), error);
        return [];
      }
    },
    enabled: !!isAdmin // używamy !!isAdmin zamiast isAdmin
  });

  // Pobierz listę ogłoszeń
  const { 
    data: ads = [], 
    isLoading: adsLoading,
    refetch: refetchAds
  } = useQuery<Ad[]>({
    queryKey: ["/api/admin/ads"],
    queryFn: async () => {
      try {
        const response = await apiRequest("GET", "/api/ads");
        return await response.json();
      } catch (error) {
        console.error(t("admin.error"), error);
        return [];
      }
    },
    enabled: !!isAdmin // używamy !!isAdmin zamiast isAdmin
  });

  // Filtrowanie użytkowników
  const filteredUsers = users.filter((user: User) => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtrowanie ogłoszeń
  const filteredAds = ads.filter((ad: Ad) => 
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mutacja do "banowania" użytkownika (symulacja - dodajemy do lokalnej listy)
  const banUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      // Dodajemy użytkownika do listy zbanowanych
      setBannedUsers(prev => [...prev, userId]);
      return { success: true, userId };
    },
    onSuccess: (data) => {
      toast({
        title: t("admin.userBanned"),
        description: t("admin.userBannedSuccess"),
      });
      refetchUsers();
    },
    onError: () => {
      toast({
        title: t("admin.error"),
        description: t("admin.banError"),
        variant: "destructive"
      });
    }
  });

  // Mutacja do usuwania ogłoszenia
  const deleteAdMutation = useMutation({
    mutationFn: async (adId: number) => {
      try {
        // Używamy endpointu do zmiany statusu ogłoszenia
        const response = await apiRequest("PATCH", `/api/ads/${adId}/status`, { status: "deleted" });
        return await response.json();
      } catch (error) {
        console.error("Błąd usuwania ogłoszenia:", error);
        throw new Error("Nie udało się usunąć ogłoszenia");
      }
    },
    onSuccess: () => {
      toast({
        title: "Ogłoszenie usunięte",
        description: "Ogłoszenie zostało pomyślnie usunięte",
      });
      refetchAds();
    },
    onError: () => {
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć ogłoszenia",
        variant: "destructive"
      });
    }
  });

  // Jeśli strona się ładuje
  if (usersLoading || adsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Jeśli użytkownik nie jest administratorem, nie pokazujemy zawartości panelu
  if (!isAdmin) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Brak dostępu</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">Nie masz uprawnień do panelu administratora</p>
            <Button onClick={() => navigate("/")} variant="default">
              Wróć na stronę główną
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panel Administratora - JaKupię.pl</title>
        <meta name="description" content="Panel administratora do zarządzania stroną JaKupię.pl" />
      </Helmet>

      <div className="container mx-auto py-8 px-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Panel Administratora</CardTitle>
            <CardDescription className="text-center">
              Zarządzaj użytkownikami i ogłoszeniami na platformie JaKupię.pl
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Wyszukaj..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="users">Użytkownicy</TabsTrigger>
                <TabsTrigger value="ads">Ogłoszenia</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nazwa użytkownika</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Imię i nazwisko</TableHead>
                      <TableHead>Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Brak wyników wyszukiwania
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.fullName}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => banUserMutation.mutate(user.id)}
                                title="Zbanuj użytkownika"
                              >
                                <UserX className="h-4 w-4 mr-1" />
                                Zbanuj
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  // Tutaj dodać nadanie uprawnień admina
                                  toast({
                                    title: "Funkcja w przygotowaniu",
                                    description: "Nadawanie uprawnień administratora będzie dostępne wkrótce",
                                  });
                                }}
                                title="Nadaj uprawnienia administratora"
                              >
                                <Shield className="h-4 w-4 mr-1" />
                                Admin
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="ads" className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tytuł</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Użytkownik</TableHead>
                      <TableHead>Data utworzenia</TableHead>
                      <TableHead>Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAds.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Brak wyników wyszukiwania
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAds.map((ad) => (
                        <TableRow key={ad.id}>
                          <TableCell>{ad.id}</TableCell>
                          <TableCell>{ad.title}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              ad.status === 'active' ? 'bg-green-100 text-green-800' : 
                              ad.status === 'closed' ? 'bg-gray-100 text-gray-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>{ad.userId}</TableCell>
                          <TableCell>{new Date(ad.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => deleteAdMutation.mutate(ad.id)}
                                title="Usuń ogłoszenie"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Usuń
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
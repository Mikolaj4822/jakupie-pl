import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertAdSchema, insertAdResponseSchema, insertRatingSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Categories
  app.get("/api/categories", async (_req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });
  
  // Endpoint do zresetowania kategorii (tylko w środowisku deweloperskim)
  app.delete("/api/reset-categories", async (_req, res) => {
    if (process.env.NODE_ENV === "development") {
      await storage.resetCategories();
      res.status(200).json({ message: "Kategorie zostały zresetowane" });
    } else {
      res.status(403).json({ message: "Ta operacja jest dostępna tylko w środowisku deweloperskim" });
    }
  });

  // Search Suggestions
  app.get("/api/search/suggestions", async (req, res) => {
    const query = req.query.q as string;
    if (!query || query.trim().length < 2) {
      return res.json([]);
    }

    // Get suggestions from titles and descriptions
    const suggestions = await storage.getSearchSuggestions(query.trim());
    res.json(suggestions);
  });

  // Ads
  app.get("/api/ads", async (req, res) => {
    const { categoryId, status, search } = req.query;
    const filter: { categoryId?: number; status?: string; search?: string } = {};
    
    if (categoryId) filter.categoryId = Number(categoryId);
    if (status) filter.status = String(status);
    if (search) filter.search = String(search);
    
    const ads = await storage.getAds(filter);
    res.json(ads);
  });

  app.get("/api/ads/:id", async (req, res) => {
    const id = Number(req.params.id);
    const ad = await storage.getAdById(id);
    
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    
    res.json(ad);
  });

  app.post("/api/ads", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // Wyodrębniamy categoryFilters z ciała żądania przed walidacją
      const { categoryFilters, ...adDataRaw } = req.body;
      
      // Parsujemy dane ogłoszenia
      const adData = insertAdSchema.parse(adDataRaw);
      
      // Ustawiamy ID użytkownika z uwierzytelnionego użytkownika
      adData.userId = req.user!.id;
      
      // Obsługa filtrów specyficznych dla kategorii - dodajemy je do opisu
      if (categoryFilters) {
        // Dodajemy informacje o filtrach do opisu ogłoszenia
        const filtersJson = JSON.stringify(categoryFilters);
        adData.description = `${adData.description}\n\n--- Filtry kategorii ---\n${filtersJson}`;
      }
      
      const ad = await storage.createAd(adData);
      res.status(201).json(ad);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Error creating ad:", error);
      res.status(500).json({ message: "Failed to create ad" });
    }
  });

  app.patch("/api/ads/:id/status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = Number(req.params.id);
    const { status } = req.body;
    
    if (!status || typeof status !== "string") {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const ad = await storage.getAdById(id);
    
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    
    // Lista administratorów
    const ADMIN_EMAILS = ["admin@jakupie.pl", "za@za"];
    const isAdmin = ADMIN_EMAILS.includes(req.user!.email);
    
    // Tylko właściciel lub administrator może zmieniać status ogłoszeń
    if (ad.userId !== req.user!.id && !isAdmin) {
      return res.status(403).json({ message: "Forbidden: You can only update your own ads" });
    }
    
    const updatedAd = await storage.updateAdStatus(id, status);
    res.json(updatedAd);
  });
  
  // Update ad details
  app.patch("/api/ads/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const id = Number(req.params.id);
    const adData = req.body;
    
    console.log("Aktualizacja ogłoszenia:", id, adData); // Dodajemy log dla debugowania
    
    const ad = await storage.getAdById(id);
    
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    
    // Lista administratorów
    const ADMIN_EMAILS = ["admin@jakupie.pl", "za@za"];
    const isAdmin = ADMIN_EMAILS.includes(req.user!.email);
    
    // Tylko właściciel lub administrator może aktualizować ogłoszenia
    if (ad.userId !== req.user!.id && !isAdmin) {
      return res.status(403).json({ message: "Forbidden: You can only update your own ads" });
    }
    
    try {
      // We'll use a simplified update method, focusing on key fields
      const updatedFields = {
        title: adData.title,
        description: adData.description,
        categoryId: adData.categoryId,
        budgetRange: adData.budgetRange,
        location: adData.location
      };
      
      // Obsługa filtrów specyficznych dla kategorii podczas aktualizacji
      if (adData.categoryFilters) {
        // Wyodrębniamy categoryFilters z ciała żądania
        const filtersJson = JSON.stringify(adData.categoryFilters);
        updatedFields.description = `${updatedFields.description}\n\n--- Filtry kategorii ---\n${filtersJson}`;
      }
      
      console.log("Updated fields:", updatedFields); // Dodajemy log dla debugowania
      
      // Implement a custom method for updating the ad
      const updatedAd = await storage.updateAd(id, updatedFields);
      
      if (!updatedAd) {
        console.error("Nie udało się zaktualizować ogłoszenia - updatedAd jest null/undefined");
        return res.status(500).json({ message: "Failed to update ad" });
      }
      
      console.log("Zaktualizowane ogłoszenie:", updatedAd); // Dodajemy log dla debugowania
      return res.json(updatedAd);
    } catch (error) {
      console.error("Error updating ad:", error);
      return res.status(500).json({ message: "Failed to update ad" });
    }
  });

  // User's Ads
  app.get("/api/user/ads", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const ads = await storage.getAdsByUserId(req.user!.id);
    res.json(ads);
  });

  // Ad Responses
  app.get("/api/ads/:id/responses", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const adId = Number(req.params.id);
    const ad = await storage.getAdById(adId);
    
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    
    // Only the ad owner can see responses
    if (ad.userId !== req.user!.id) {
      return res.status(403).json({ message: "Forbidden: You can only view responses to your own ads" });
    }
    
    const responses = await storage.getAdResponses(adId);
    
    // Dodaj informacje o sprzedawcy do każdej odpowiedzi
    const responsesWithSellerInfo = await Promise.all(
      responses.map(async (response) => {
        const seller = await storage.getUser(response.sellerId);
        return {
          ...response,
          seller: seller ? {
            id: seller.id,
            username: seller.username,
            avatar: seller.avatar
          } : null
        };
      })
    );
    
    res.json(responsesWithSellerInfo);
  });

  app.post("/api/ads/:id/responses", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const adId = Number(req.params.id);
    const ad = await storage.getAdById(adId);
    
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    
    // Prevent users from responding to their own ads
    if (ad.userId === req.user!.id) {
      return res.status(400).json({ message: "You cannot respond to your own ad" });
    }
    
    try {
      // Obsługa zdjęć przesłanych w odpowiedzi
      const requestData = req.body;
      
      // Przygotowujemy dane do wstawienia do bazy danych
      const responseData = insertAdResponseSchema.parse({
        ...requestData,
        adId,
        sellerId: req.user!.id
      });
      
      // Tworzymy odpowiedź
      const response = await storage.createAdResponse(responseData);
      
      // Przygotowujemy odpowiedź do klienta
      const responseWithDetails = {
        ...response
      };
      
      res.status(201).json(responseWithDetails);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Error creating response:", error);
      res.status(500).json({ message: "Failed to create response" });
    }
  });

  app.patch("/api/responses/:id/status", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const id = Number(req.params.id);
    const { status } = req.body;
    
    if (!status || typeof status !== "string") {
      return res.status(400).json({ message: "Status is required" });
    }
    
    const response = await storage.getAdResponseById(id);
    
    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }
    
    const ad = await storage.getAdById(response.adId);
    
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }
    
    // Only ad owner can update response status
    if (ad.userId !== req.user!.id) {
      return res.status(403).json({ message: "Forbidden: You can only update responses for your own ads" });
    }
    
    const updatedResponse = await storage.updateAdResponseStatus(id, status);
    res.json(updatedResponse);
  });

  // User's Responses
  app.get("/api/user/responses", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const responses = await storage.getAdResponsesByUserId(req.user!.id);
    res.json(responses);
  });

  // Ratings API endpoints
  
  // Get ratings for a specific user
  app.get("/api/users/:id/ratings", async (req, res) => {
    const userId = Number(req.params.id);
    const { type } = req.query; // Optional filter by rating type ('buyer' or 'seller')
    
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const ratings = await storage.getRatingsForUserId(userId, type as string | undefined);
    
    // Return ratings without sensitive user information
    const safeRatings = await Promise.all(ratings.map(async (rating) => {
      // Get the user who left the rating (without password)
      const rater = await storage.getUser(rating.fromUserId);
      const { password, ...safeRater } = rater || { password: "", id: 0, username: "Unknown User" };
      
      return {
        ...rating,
        rater: safeRater
      };
    }));
    
    res.json(safeRatings);
  });
  
  // Get user data by ID
  app.get("/api/users/:id", async (req, res) => {
    const userId = Number(req.params.id);
    
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Don't send the password
    const { password, ...userData } = user;
    
    res.json(userData);
  });
  
  // Get user's rating stats
  app.get("/api/users/:id/rating-stats", async (req, res) => {
    const userId = Number(req.params.id);
    
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Get or calculate user stats
    let stats = await storage.getUserStats(userId);
    if (!stats) {
      stats = await storage.recalculateUserStats(userId);
    }
    
    res.json(stats);
  });
  
  // Create a new rating
  app.post("/api/ratings", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
      const fromUserId = req.user!.id;
      const ratingData = insertRatingSchema.parse({
        ...req.body,
        fromUserId
      });
      
      // Don't allow users to rate themselves
      if (ratingData.fromUserId === ratingData.toUserId) {
        return res.status(400).json({ message: "You cannot rate yourself" });
      }
      
      // Verify the ad exists
      const ad = await storage.getAdById(ratingData.adId);
      if (!ad) {
        return res.status(404).json({ message: "Ad not found" });
      }
      
      // Verify the transaction between these users for this ad (by checking responses)
      let isValidTransaction = false;
      
      if (ratingData.ratingType === "buyer") {
        // If rating as buyer, the rater must be the ad owner and ratee must have a response
        isValidTransaction = ad.userId === fromUserId;
        
        if (isValidTransaction) {
          const responses = await storage.getAdResponses(ad.id);
          isValidTransaction = responses.some(r => 
            r.sellerId === ratingData.toUserId && 
            r.status === "accepted"
          );
        }
      }
      else if (ratingData.ratingType === "seller") {
        // If rating as seller, the rater must be the responder and ratee must be ad owner
        isValidTransaction = ratingData.toUserId === ad.userId;
        
        const responses = await storage.getAdResponses(ad.id);
        isValidTransaction = isValidTransaction && responses.some(r => 
          r.sellerId === fromUserId && 
          r.status === "accepted"
        );
      }
      
      if (!isValidTransaction) {
        return res.status(403).json({ 
          message: "You can only rate users you've completed transactions with" 
        });
      }
      
      // Prevent duplicate ratings
      const existingRatings = await storage.getRatingsByUserId(fromUserId);
      const alreadyRated = existingRatings.some(r => 
        r.adId === ratingData.adId && 
        r.toUserId === ratingData.toUserId &&
        r.ratingType === ratingData.ratingType
      );
      
      if (alreadyRated) {
        return res.status(400).json({ 
          message: "You have already rated this user for this transaction" 
        });
      }
      
      const rating = await storage.createRating(ratingData);
      res.status(201).json(rating);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Error creating rating:", error);
      res.status(500).json({ message: "Failed to create rating" });
    }
  });
  
  // Update a rating
  app.patch("/api/ratings/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const id = Number(req.params.id);
    const rating = await storage.getRatingById(id);
    
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    
    // Only the user who created the rating can update it
    if (rating.fromUserId !== req.user!.id) {
      return res.status(403).json({ 
        message: "Forbidden: You can only update your own ratings" 
      });
    }
    
    // Only allow updating score and comment
    const { score, comment } = req.body;
    const updatedFields: any = {};
    
    if (score !== undefined) updatedFields.score = score;
    if (comment !== undefined) updatedFields.comment = comment;
    
    try {
      const updatedRating = await storage.updateRating(id, updatedFields);
      res.json(updatedRating);
    } catch (error) {
      console.error("Error updating rating:", error);
      res.status(500).json({ message: "Failed to update rating" });
    }
  });
  
  // Delete a rating
  app.delete("/api/ratings/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const id = Number(req.params.id);
    const rating = await storage.getRatingById(id);
    
    if (!rating) {
      return res.status(404).json({ message: "Rating not found" });
    }
    
    // Only the user who created the rating can delete it
    if (rating.fromUserId !== req.user!.id) {
      return res.status(403).json({ 
        message: "Forbidden: You can only delete your own ratings" 
      });
    }
    
    const deleted = await storage.deleteRating(id);
    
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(500).json({ message: "Failed to delete rating" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

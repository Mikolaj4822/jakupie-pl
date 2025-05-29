import { 
  users, type User, type InsertUser, 
  categories, type Category, type InsertCategory, 
  ads, type Ad, type InsertAd, 
  adResponses, type AdResponse, type InsertAdResponse,
  ratings, type Rating, type InsertRating,
  userStats, type UserStats, type InsertUserStats
} from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Ad methods
  getAds(filter?: {categoryId?: number, status?: string, search?: string}): Promise<Ad[]>;
  getAdById(id: number): Promise<Ad | undefined>;
  getAdsByUserId(userId: number): Promise<Ad[]>;
  createAd(ad: InsertAd): Promise<Ad>;
  updateAdStatus(id: number, status: string): Promise<Ad | undefined>;
  updateAd(id: number, adData: Partial<Ad>): Promise<Ad | undefined>;
  
  // Search methods
  getSearchSuggestions(query: string): Promise<string[]>;
  
  // Ad response methods
  getAdResponses(adId: number): Promise<AdResponse[]>;
  getAdResponseById(id: number): Promise<AdResponse | undefined>;
  getAdResponsesByUserId(userId: number): Promise<AdResponse[]>;
  createAdResponse(response: InsertAdResponse): Promise<AdResponse>;
  updateAdResponseStatus(id: number, status: string): Promise<AdResponse | undefined>;
  
  // Ratings and reviews methods
  getRatingsByUserId(userId: number, asRatingType?: string): Promise<Rating[]>;
  getRatingsForUserId(userId: number, asRatingType?: string): Promise<Rating[]>;
  getRatingById(id: number): Promise<Rating | undefined>;
  createRating(rating: InsertRating): Promise<Rating>;
  updateRating(id: number, rating: Partial<Rating>): Promise<Rating | undefined>;
  deleteRating(id: number): Promise<boolean>;
  
  // User stats methods
  getUserStats(userId: number): Promise<UserStats | undefined>;
  updateUserStats(userId: number, stats: Partial<UserStats>): Promise<UserStats>;
  recalculateUserStats(userId: number): Promise<UserStats>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private ads: Map<number, Ad>;
  private adResponses: Map<number, AdResponse>;
  private ratings: Map<number, Rating>;
  private userStatsMap: Map<number, UserStats>;
  sessionStore: session.SessionStore;
  private userCurrentId: number;
  private categoryCurrentId: number;
  private adCurrentId: number;
  private adResponseCurrentId: number;
  private ratingCurrentId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.ads = new Map();
    this.adResponses = new Map();
    this.ratings = new Map();
    this.userStatsMap = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    this.userCurrentId = 1;
    this.categoryCurrentId = 1;
    this.adCurrentId = 1;
    this.adResponseCurrentId = 1;
    this.ratingCurrentId = 1;
    
    // Initialize with default categories
    this.initializeCategories();
  }

  private initializeCategories() {
    const defaultCategories: InsertCategory[] = [
      // Główne kategorie (unikalne ikony)
      { name: "Elektronika", icon: "cpu", color: "indigo" }, // procesor dla elektroniki
      { name: "Motoryzacja", icon: "car", color: "red" }, // samochód dla motoryzacji
      { name: "Nieruchomości", icon: "building", color: "blue" }, // budynek dla nieruchomości
      { name: "Dom i Ogród", icon: "sofa", color: "green" }, // sofa dla domu
      { name: "Moda", icon: "shirt", color: "purple" }, // koszula dla mody
      { name: "Rolnictwo", icon: "wheat", color: "yellow" }, // pszenica dla rolnictwa
      { name: "Zwierzęta", icon: "paw-print", color: "orange" }, // ślad łapy dla zwierząt
      { name: "Dla Dzieci", icon: "baby", color: "pink" }, // niemowlę dla kategorii dziecięcej
      { name: "Sport i Hobby", icon: "dumbbell", color: "indigo" }, // hantle dla sportu
      { name: "Muzyka i Edukacja", icon: "music-4", color: "blue" }, // nuta dla muzyki
      { name: "Firma i Przemysł", icon: "factory", color: "gray" }, // fabryka dla przemysłu
      { name: "Antyki i Kolekcje", icon: "landmark", color: "brown" }, // zabytek dla antyków
      { name: "Zdrowie i Uroda", icon: "heart-pulse", color: "red" }, // puls serca dla zdrowia
      { name: "Wypożyczalnia", icon: "timer", color: "green" }, // czasomierz dla wypożyczalni
      { name: "Oddam za darmo", icon: "gift", color: "purple" }, // prezent dla oddam za darmo
      
      // Kategorie na końcu listy
      { name: "Usługi", icon: "tool", color: "indigo" }, // narzędzie dla usług
      { name: "Noclegi", icon: "bed", color: "blue" }, // łóżko dla noclegów
      { name: "Praca", icon: "briefcase", color: "green" } // teczka dla pracy
    ];
    
    defaultCategories.forEach(category => {
      this.createCategory(category);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase(),
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    const user: User = { ...insertUser, id, avatar: null, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async resetCategories(): Promise<void> {
    // Usuń wszystkie istniejące kategorie
    this.categories.clear();
    this.categoryCurrentId = 1;
    
    // Utwórz nowe kategorie
    this.initializeCategories();
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Ad methods
  async getAds(filter?: {
    categoryId?: number, 
    status?: string, 
    search?: string,
    minBudget?: number,
    maxBudget?: number,
    location?: string
  }): Promise<Ad[]> {
    let allAds = Array.from(this.ads.values());
    
    if (filter) {
      if (filter.categoryId) {
        allAds = allAds.filter(ad => ad.categoryId === filter.categoryId);
      }
      
      if (filter.status) {
        allAds = allAds.filter(ad => ad.status === filter.status);
      }
      
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        allAds = allAds.filter(ad => 
          ad.title.toLowerCase().includes(searchLower) || 
          ad.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Filter by min budget
      if (filter.minBudget !== undefined) {
        allAds = allAds.filter(ad => {
          if (ad.minBudget === null && ad.maxBudget === null) return true;
          if (ad.minBudget === null) return ad.maxBudget! >= filter.minBudget!;
          return ad.minBudget >= filter.minBudget!;
        });
      }
      
      // Filter by max budget
      if (filter.maxBudget !== undefined) {
        allAds = allAds.filter(ad => {
          if (ad.minBudget === null && ad.maxBudget === null) return true;
          if (ad.maxBudget === null) return ad.minBudget! <= filter.maxBudget!;
          return ad.maxBudget <= filter.maxBudget!;
        });
      }
      
      // Filter by location
      if (filter.location) {
        const locationLower = filter.location.toLowerCase();
        allAds = allAds.filter(ad => {
          if (!ad.location) return false;
          return ad.location.toLowerCase().includes(locationLower);
        });
      }
    }
    
    return allAds.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async getAdById(id: number): Promise<Ad | undefined> {
    return this.ads.get(id);
  }

  async getAdsByUserId(userId: number): Promise<Ad[]> {
    return Array.from(this.ads.values())
      .filter(ad => ad.userId === userId)
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  async createAd(insertAd: InsertAd): Promise<Ad> {
    const id = this.adCurrentId++;
    const now = new Date();
    const ad: Ad = { ...insertAd, id, status: "active", createdAt: now };
    this.ads.set(id, ad);
    return ad;
  }

  async updateAdStatus(id: number, status: string): Promise<Ad | undefined> {
    const ad = this.ads.get(id);
    if (!ad) return undefined;
    
    const updatedAd: Ad = { ...ad, status };
    this.ads.set(id, updatedAd);
    return updatedAd;
  }
  
  async updateAd(id: number, adData: Partial<Ad>): Promise<Ad | undefined> {
    const ad = this.ads.get(id);
    if (!ad) return undefined;
    
    const updatedAd: Ad = { ...ad, ...adData };
    this.ads.set(id, updatedAd);
    return updatedAd;
  }

  // Ad response methods
  async getAdResponses(adId: number): Promise<AdResponse[]> {
    return Array.from(this.adResponses.values())
      .filter(response => response.adId === adId)
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  async getAdResponseById(id: number): Promise<AdResponse | undefined> {
    return this.adResponses.get(id);
  }

  async getAdResponsesByUserId(userId: number): Promise<AdResponse[]> {
    return Array.from(this.adResponses.values())
      .filter(response => response.sellerId === userId)
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  async createAdResponse(insertResponse: InsertAdResponse): Promise<AdResponse> {
    const id = this.adResponseCurrentId++;
    const now = new Date();
    const response: AdResponse = { ...insertResponse, id, status: "pending", createdAt: now };
    this.adResponses.set(id, response);
    return response;
  }

  async updateAdResponseStatus(id: number, status: string): Promise<AdResponse | undefined> {
    const response = this.adResponses.get(id);
    if (!response) return undefined;
    
    const updatedResponse: AdResponse = { ...response, status };
    this.adResponses.set(id, updatedResponse);
    return updatedResponse;
  }

  // Search methods
  async getSearchSuggestions(query: string): Promise<string[]> {
    const normalizedQuery = query.toLowerCase();
    const allAds = Array.from(this.ads.values());
    const categories = Array.from(this.categories.values());
    
    // Get matching titles and descriptions from ads
    const titleMatches = allAds
      .filter(ad => ad.title.toLowerCase().includes(normalizedQuery))
      .map(ad => ad.title);
    
    // Get matching locations
    const locationMatches = allAds
      .filter(ad => ad.location && ad.location.toLowerCase().includes(normalizedQuery))
      .map(ad => ad.location as string);
      
    // Get matching category names
    const categoryMatches = categories
      .filter(category => category.name.toLowerCase().includes(normalizedQuery))
      .map(category => category.name);
    
    // Combine all matches, remove duplicates, and limit to 10 results
    const allMatches = [...new Set([...titleMatches, ...locationMatches, ...categoryMatches])];
    
    // Sort by relevance (starting with the query is more relevant)
    allMatches.sort((a, b) => {
      const aStarts = a.toLowerCase().startsWith(normalizedQuery);
      const bStarts = b.toLowerCase().startsWith(normalizedQuery);
      
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      // Secondary sort by length (shorter suggestions first)
      return a.length - b.length;
    });
    
    return allMatches.slice(0, 10);
  }

  // Ratings and reviews methods
  async getRatingsByUserId(userId: number, asRatingType?: string): Promise<Rating[]> {
    // Ratings given by this user
    const ratings = Array.from(this.ratings.values()).filter(rating => {
      if (rating.fromUserId !== userId) return false;
      if (asRatingType && rating.ratingType !== asRatingType) return false;
      return true;
    });
    
    return ratings;
  }
  
  async getRatingsForUserId(userId: number, asRatingType?: string): Promise<Rating[]> {
    // Ratings received by this user
    const ratings = Array.from(this.ratings.values()).filter(rating => {
      if (rating.toUserId !== userId) return false;
      if (asRatingType && rating.ratingType !== asRatingType) return false;
      return true;
    });
    
    return ratings;
  }
  
  async getRatingById(id: number): Promise<Rating | undefined> {
    return this.ratings.get(id);
  }
  
  async createRating(rating: InsertRating): Promise<Rating> {
    const id = this.ratingCurrentId++;
    const now = new Date();
    
    // Ensure consistent rating score range (1-5)
    const validatedScore = Math.max(1, Math.min(5, rating.score));
    
    const newRating: Rating = {
      ...rating,
      id,
      score: validatedScore,
      createdAt: now
    };
    
    this.ratings.set(id, newRating);
    
    // Update user stats
    await this.recalculateUserStats(rating.toUserId);
    
    return newRating;
  }
  
  async updateRating(id: number, ratingUpdate: Partial<Rating>): Promise<Rating | undefined> {
    const existingRating = await this.getRatingById(id);
    if (!existingRating) return undefined;
    
    // Don't allow changing user IDs or rating type
    const { fromUserId, toUserId, ratingType, adId, ...allowedUpdates } = ratingUpdate;
    
    // Ensure score is valid if provided
    let validatedScore = existingRating.score;
    if (allowedUpdates.score !== undefined) {
      validatedScore = Math.max(1, Math.min(5, allowedUpdates.score));
    }
    
    const updatedRating: Rating = {
      ...existingRating,
      ...allowedUpdates,
      score: validatedScore
    };
    
    this.ratings.set(id, updatedRating);
    
    // Recalculate user stats
    await this.recalculateUserStats(existingRating.toUserId);
    
    return updatedRating;
  }
  
  async deleteRating(id: number): Promise<boolean> {
    const rating = await this.getRatingById(id);
    if (!rating) return false;
    
    const success = this.ratings.delete(id);
    
    if (success) {
      // Recalculate user stats
      await this.recalculateUserStats(rating.toUserId);
    }
    
    return success;
  }
  
  // User stats methods
  async getUserStats(userId: number): Promise<UserStats | undefined> {
    return this.userStatsMap.get(userId);
  }
  
  async updateUserStats(userId: number, stats: Partial<UserStats>): Promise<UserStats> {
    const existingStats = await this.getUserStats(userId);
    
    const updatedStats: UserStats = {
      userId,
      totalRatingsReceived: 0,
      averageRating: 0,
      positiveRatings: 0,
      neutralRatings: 0,
      negativeRatings: 0,
      asBuyerRatings: 0,
      asSellerRatings: 0,
      asBuyerAvgRating: 0,
      asSellerAvgRating: 0,
      completedTransactions: 0,
      lastUpdated: new Date(),
      ...existingStats,
      ...stats
    };
    
    this.userStatsMap.set(userId, updatedStats);
    return updatedStats;
  }
  
  async recalculateUserStats(userId: number): Promise<UserStats> {
    // Get all ratings for this user
    const ratings = await this.getRatingsForUserId(userId);
    
    if (ratings.length === 0) {
      // Create empty stats if no ratings
      return this.updateUserStats(userId, {
        totalRatingsReceived: 0,
        averageRating: 0,
        positiveRatings: 0,
        neutralRatings: 0,
        negativeRatings: 0,
        asBuyerRatings: 0,
        asSellerRatings: 0,
        asBuyerAvgRating: 0,
        asSellerAvgRating: 0,
        lastUpdated: new Date()
      });
    }
    
    // Calculate total and average ratings
    const totalRatings = ratings.length;
    const totalScore = ratings.reduce((sum, r) => sum + r.score, 0);
    const avgRating = totalScore / totalRatings;
    
    // Count by type (positive/neutral/negative)
    const positiveRatings = ratings.filter(r => r.score >= 4).length;
    const neutralRatings = ratings.filter(r => r.score === 3).length;
    const negativeRatings = ratings.filter(r => r.score <= 2).length;
    
    // Calculate by role (buyer/seller)
    const buyerRatings = ratings.filter(r => r.ratingType === 'buyer');
    const sellerRatings = ratings.filter(r => r.ratingType === 'seller');
    
    const asBuyerRatings = buyerRatings.length;
    const asSellerRatings = sellerRatings.length;
    
    const asBuyerAvgRating = asBuyerRatings > 0 
      ? buyerRatings.reduce((sum, r) => sum + r.score, 0) / asBuyerRatings 
      : 0;
      
    const asSellerAvgRating = asSellerRatings > 0 
      ? sellerRatings.reduce((sum, r) => sum + r.score, 0) / asSellerRatings 
      : 0;
    
    // Update the user stats
    return this.updateUserStats(userId, {
      totalRatingsReceived: totalRatings,
      averageRating: avgRating,
      positiveRatings,
      neutralRatings,
      negativeRatings,
      asBuyerRatings,
      asSellerRatings,
      asBuyerAvgRating,
      asSellerAvgRating,
      lastUpdated: new Date()
    });
  }
}

import { DatabaseStorage } from "./database-storage";

// Uncomment to use the memory storage instead of database
// export const storage = new MemStorage();

// Use database storage
export const storage = new DatabaseStorage();

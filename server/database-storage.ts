import { 
  users, type User, type InsertUser, 
  categories, type Category, type InsertCategory, 
  ads, type Ad, type InsertAd, 
  adResponses, type AdResponse, type InsertAdResponse,
  ratings, type Rating, type InsertRating,
  userStats, type UserStats, type InsertUserStats
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, like, desc, asc, isNull, between, gte, lte } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";
import { IStorage } from "./storage";

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
    
    // Initialize categories if they don't exist
    this.initializeCategories();
  }

  private async initializeCategories() {
    const existingCategories = await db.select().from(categories);
    
    if (existingCategories.length === 0) {
      const defaultCategories: InsertCategory[] = [
        // Główne kategorie (unikalne ikony)
        { name: "Elektronika", icon: "cpu", color: "indigo" }, 
        { name: "Motoryzacja", icon: "car", color: "red" }, 
        { name: "Nieruchomości", icon: "building", color: "blue" }, 
        { name: "Dom i Ogród", icon: "sofa", color: "green" }, 
        { name: "Moda", icon: "shirt", color: "purple" }, 
        { name: "Rolnictwo", icon: "wheat", color: "yellow" }, 
        { name: "Zwierzęta", icon: "paw-print", color: "orange" }, 
        { name: "Dla Dzieci", icon: "baby", color: "pink" }, 
        { name: "Sport i Hobby", icon: "dumbbell", color: "indigo" }, 
        { name: "Muzyka i Edukacja", icon: "music-4", color: "blue" }, 
        { name: "Firma i Przemysł", icon: "factory", color: "gray" }, 
        { name: "Antyki i Kolekcje", icon: "landmark", color: "brown" }, 
        { name: "Zdrowie i Uroda", icon: "heart-pulse", color: "red" }, 
        { name: "Wypożyczalnia", icon: "timer", color: "green" }, 
        { name: "Oddam za darmo", icon: "gift", color: "purple" }, 
        
        // Kategorie na końcu listy
        { name: "Usługi", icon: "tool", color: "indigo" }, 
        { name: "Noclegi", icon: "bed", color: "blue" }, 
        { name: "Praca", icon: "briefcase", color: "green" }
      ];
      
      for (const category of defaultCategories) {
        await this.createCategory(category);
      }
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return db.select().from(categories);
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db.insert(categories).values(insertCategory).returning();
    return category;
  }

  // Ad methods
  async getAds(filter?: {
    categoryId?: number, 
    status?: string, 
    search?: string,
    budgetRange?: string,   // Przedział cenowy, np. "500-1000"
    location?: string
  }): Promise<Ad[]> {
    let query = db.select().from(ads);
    
    if (filter) {
      const conditions = [];
      
      if (filter.categoryId) {
        conditions.push(eq(ads.categoryId, filter.categoryId));
      }
      
      if (filter.status) {
        conditions.push(eq(ads.status, filter.status));
      }
      
      if (filter.search) {
        conditions.push(
          or(
            like(ads.title, `%${filter.search}%`),
            like(ads.description, `%${filter.search}%`)
          )
        );
      }
      
      if (filter.budgetRange !== undefined) {
        conditions.push(
          or(
            isNull(ads.budgetRange),
            like(ads.budgetRange, `%${filter.budgetRange}%`)
          )
        );
      }
      
      if (filter.location) {
        conditions.push(like(ads.location, `%${filter.location}%`));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    return query.orderBy(desc(ads.createdAt));
  }

  async getAdById(id: number): Promise<Ad | undefined> {
    const [ad] = await db.select().from(ads).where(eq(ads.id, id));
    return ad;
  }

  async getAdsByUserId(userId: number): Promise<Ad[]> {
    return db.select().from(ads).where(eq(ads.userId, userId)).orderBy(desc(ads.createdAt));
  }

  async createAd(insertAd: InsertAd): Promise<Ad> {
    const [ad] = await db.insert(ads).values({
      ...insertAd,
      status: "active"
    }).returning();
    return ad;
  }

  async updateAdStatus(id: number, status: string): Promise<Ad | undefined> {
    const [updatedAd] = await db
      .update(ads)
      .set({ status })
      .where(eq(ads.id, id))
      .returning();
    return updatedAd;
  }
  
  async updateAd(id: number, adData: Partial<Ad>): Promise<Ad | undefined> {
    const [updatedAd] = await db
      .update(ads)
      .set(adData)
      .where(eq(ads.id, id))
      .returning();
    return updatedAd;
  }

  // Ad response methods
  async getAdResponses(adId: number): Promise<AdResponse[]> {
    return db
      .select()
      .from(adResponses)
      .where(eq(adResponses.adId, adId))
      .orderBy(desc(adResponses.createdAt));
  }

  async getAdResponseById(id: number): Promise<AdResponse | undefined> {
    const [response] = await db.select().from(adResponses).where(eq(adResponses.id, id));
    return response;
  }

  async getAdResponsesByUserId(userId: number): Promise<AdResponse[]> {
    return db
      .select()
      .from(adResponses)
      .where(eq(adResponses.sellerId, userId))
      .orderBy(desc(adResponses.createdAt));
  }

  async createAdResponse(insertResponse: InsertAdResponse): Promise<AdResponse> {
    const [response] = await db.insert(adResponses).values({
      ...insertResponse,
      status: "pending"
    }).returning();
    return response;
  }

  async updateAdResponseStatus(id: number, status: string): Promise<AdResponse | undefined> {
    const [updatedResponse] = await db
      .update(adResponses)
      .set({ status })
      .where(eq(adResponses.id, id))
      .returning();
    return updatedResponse;
  }

  // Search methods
  async getSearchSuggestions(query: string): Promise<string[]> {
    const searchQuery = `%${query}%`;
    
    // Get titles from ads
    const adTitles = await db
      .select({ title: ads.title })
      .from(ads)
      .where(like(ads.title, searchQuery))
      .limit(5);
    
    // Get locations from ads (excluding nulls)
    const adLocations = await db
      .select({ location: ads.location })
      .from(ads)
      .where(like(ads.location, searchQuery))
      .limit(5);
    
    // Get category names
    const categoryNames = await db
      .select({ name: categories.name })
      .from(categories)
      .where(like(categories.name, searchQuery))
      .limit(5);
    
    // Combine results
    const suggestions = [
      ...adTitles.map(r => r.title),
      ...adLocations.filter(r => r.location !== null).map(r => r.location as string),
      ...categoryNames.map(r => r.name)
    ];
    
    // Remove duplicates using Array.from for compatibility
    return Array.from(new Set(suggestions)).slice(0, 10);
  }

  // Ratings methods
  async getRatingsByUserId(userId: number, asRatingType?: string): Promise<Rating[]> {
    let whereClause = eq(ratings.fromUserId, userId);
    
    if (asRatingType) {
      whereClause = and(whereClause, eq(ratings.ratingType, asRatingType));
    }
    
    return db
      .select()
      .from(ratings)
      .where(whereClause);
  }

  async getRatingsForUserId(userId: number, asRatingType?: string): Promise<Rating[]> {
    let whereClause = eq(ratings.toUserId, userId);
    
    if (asRatingType) {
      whereClause = and(whereClause, eq(ratings.ratingType, asRatingType));
    }
    
    return db
      .select()
      .from(ratings)
      .where(whereClause);
  }

  async getRatingById(id: number): Promise<Rating | undefined> {
    const [rating] = await db.select().from(ratings).where(eq(ratings.id, id));
    return rating;
  }

  async createRating(insertRating: InsertRating): Promise<Rating> {
    // Ensure score is in range 1-5
    const validatedScore = Math.max(1, Math.min(5, insertRating.score));
    
    const [rating] = await db.insert(ratings).values({
      ...insertRating,
      score: validatedScore
    }).returning();
    
    // Update user stats
    await this.recalculateUserStats(insertRating.toUserId);
    
    return rating;
  }

  async updateRating(id: number, ratingUpdate: Partial<Rating>): Promise<Rating | undefined> {
    const existingRating = await this.getRatingById(id);
    if (!existingRating) return undefined;
    
    // Exclude user IDs, rating type, and ad ID from updates
    const { fromUserId, toUserId, ratingType, adId, ...allowedUpdates } = ratingUpdate;
    
    // Validate score if provided
    if (allowedUpdates.score !== undefined) {
      allowedUpdates.score = Math.max(1, Math.min(5, allowedUpdates.score));
    }
    
    const [updatedRating] = await db
      .update(ratings)
      .set(allowedUpdates)
      .where(eq(ratings.id, id))
      .returning();
    
    // Recalculate user stats
    await this.recalculateUserStats(existingRating.toUserId);
    
    return updatedRating;
  }

  async deleteRating(id: number): Promise<boolean> {
    const rating = await this.getRatingById(id);
    if (!rating) return false;
    
    await db.delete(ratings).where(eq(ratings.id, id));
    
    // Recalculate user stats
    await this.recalculateUserStats(rating.toUserId);
    return true;
  }

  // User stats methods
  async getUserStats(userId: number): Promise<UserStats | undefined> {
    const [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
    return stats;
  }

  async updateUserStats(userId: number, stats: Partial<UserStats>): Promise<UserStats> {
    const existingStats = await this.getUserStats(userId);
    
    if (existingStats) {
      // Update existing stats
      const [updatedStats] = await db
        .update(userStats)
        .set({
          ...stats,
          lastUpdated: new Date()
        })
        .where(eq(userStats.userId, userId))
        .returning();
      return updatedStats;
    } else {
      // Create new stats
      const [newStats] = await db
        .insert(userStats)
        .values({
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
          ...stats
        })
        .returning();
      return newStats;
    }
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
        asSellerAvgRating: 0
      });
    }
    
    // Calculate the stats
    const totalRatingsReceived = ratings.length;
    
    // Average rating
    const totalScore = ratings.reduce((sum, r) => sum + r.score, 0);
    const averageRating = totalScore / totalRatingsReceived;
    
    // Count ratings by score
    const positiveRatings = ratings.filter(r => r.score >= 4).length;
    const neutralRatings = ratings.filter(r => r.score === 3).length;
    const negativeRatings = ratings.filter(r => r.score <= 2).length;
    
    // Calculate ratings by role (buyer/seller)
    const asBuyerRatings = ratings.filter(r => r.ratingType === 'buyer').length;
    const asSellerRatings = ratings.filter(r => r.ratingType === 'seller').length;
    
    // Average rating by role
    const asBuyerTotal = ratings
      .filter(r => r.ratingType === 'buyer')
      .reduce((sum, r) => sum + r.score, 0);
    const asSellerTotal = ratings
      .filter(r => r.ratingType === 'seller')
      .reduce((sum, r) => sum + r.score, 0);
    
    const asBuyerAvgRating = asBuyerRatings > 0 ? asBuyerTotal / asBuyerRatings : 0;
    const asSellerAvgRating = asSellerRatings > 0 ? asSellerTotal / asSellerRatings : 0;
    
    // Update the stats
    return this.updateUserStats(userId, {
      totalRatingsReceived,
      averageRating,
      positiveRatings,
      neutralRatings,
      negativeRatings,
      asBuyerRatings,
      asSellerRatings,
      asBuyerAvgRating,
      asSellerAvgRating
    });
  }
}
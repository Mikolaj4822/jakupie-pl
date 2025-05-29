import { pgTable, text, serial, integer, boolean, timestamp, smallint, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  avatar: true,
});

// Categories schema
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").default("indigo").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

// Ads schema
export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  budgetRange: text("budget_range"),  // Przedział cenowy, np. "500-1000"
  location: text("location"),
  userId: integer("user_id").notNull(),
  categoryId: integer("category_id").notNull(),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdSchema = createInsertSchema(ads).omit({
  id: true,
  createdAt: true,
  status: true,
});

// Ad responses schema
export const adResponses = pgTable("ad_responses", {
  id: serial("id").primaryKey(),
  adId: integer("ad_id").notNull(),
  sellerId: integer("seller_id").notNull(),
  message: text("message").notNull(),
  price: integer("price"),
  // Usuwamy pole images, ponieważ nie istnieje w bazie danych
  
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertAdResponseSchema = createInsertSchema(adResponses).omit({
  id: true,
  createdAt: true,
  status: true,
});

// Ratings schema
export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  fromUserId: integer("from_user_id").notNull(), // User giving the rating
  toUserId: integer("to_user_id").notNull(),     // User receiving the rating
  adId: integer("ad_id").notNull(),              // Ad related to this rating
  score: smallint("score").notNull(),            // Rating score (e.g., 1-5)
  comment: text("comment"),                      // Optional review text
  ratingType: text("rating_type").notNull(),     // "buyer" or "seller"
  transactionId: integer("transaction_id"),      // Optional, if we track transactions
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRatingSchema = createInsertSchema(ratings).omit({
  id: true,
  createdAt: true,
});

// User stats for caching ratings summary
export const userStats = pgTable("user_stats", {
  userId: integer("user_id").primaryKey(),
  totalRatingsReceived: integer("total_ratings_received").default(0).notNull(),
  averageRating: doublePrecision("average_rating").default(0).notNull(),
  positiveRatings: integer("positive_ratings").default(0).notNull(),
  neutralRatings: integer("neutral_ratings").default(0).notNull(),
  negativeRatings: integer("negative_ratings").default(0).notNull(),
  asBuyerRatings: integer("as_buyer_ratings").default(0).notNull(),
  asSellerRatings: integer("as_seller_ratings").default(0).notNull(),
  asBuyerAvgRating: doublePrecision("as_buyer_avg_rating").default(0).notNull(),
  asSellerAvgRating: doublePrecision("as_seller_avg_rating").default(0).notNull(),
  completedTransactions: integer("completed_transactions").default(0).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const insertUserStatsSchema = createInsertSchema(userStats).omit({
  lastUpdated: true,
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertAd = z.infer<typeof insertAdSchema>;
export type Ad = typeof ads.$inferSelect;

export type InsertAdResponse = z.infer<typeof insertAdResponseSchema>;
export type AdResponse = typeof adResponses.$inferSelect;

export type InsertRating = z.infer<typeof insertRatingSchema>;
export type Rating = typeof ratings.$inferSelect;

export type InsertUserStats = z.infer<typeof insertUserStatsSchema>;
export type UserStats = typeof userStats.$inferSelect;

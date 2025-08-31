import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFitnessDataSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get fitness data for a specific date
  app.get("/api/fitness/:date", async (req, res) => {
    try {
      const { date } = req.params;
      const userId = "demo-user-1"; // For demo purposes, always use demo user
      
      const data = await storage.getFitnessData(userId, date);
      if (!data) {
        return res.status(404).json({ message: "No fitness data found for this date" });
      }
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fitness data" });
    }
  });

  // Get fitness data for a date range
  app.get("/api/fitness/range/:startDate/:endDate", async (req, res) => {
    try {
      const { startDate, endDate } = req.params;
      const userId = "demo-user-1"; // For demo purposes, always use demo user
      
      const data = await storage.getFitnessDataRange(userId, startDate, endDate);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fitness data range" });
    }
  });

  // Create or update fitness data
  app.post("/api/fitness", async (req, res) => {
    try {
      const validatedData = insertFitnessDataSchema.parse({
        ...req.body,
        userId: "demo-user-1" // For demo purposes, always use demo user
      });
      
      const data = await storage.createOrUpdateFitnessData(validatedData);
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: "Invalid fitness data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

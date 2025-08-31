import { type User, type InsertUser, type FitnessData, type InsertFitnessData } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getFitnessData(userId: string, date: string): Promise<FitnessData | undefined>;
  getFitnessDataRange(userId: string, startDate: string, endDate: string): Promise<FitnessData[]>;
  createOrUpdateFitnessData(data: InsertFitnessData): Promise<FitnessData>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private fitnessData: Map<string, FitnessData>;

  constructor() {
    this.users = new Map();
    this.fitnessData = new Map();
    
    // Initialize with some demo data
    this.initializeDemo();
  }

  private initializeDemo() {
    // Create a demo user
    const demoUser: User = {
      id: "demo-user-1",
      username: "demo",
      password: "demo123"
    };
    this.users.set(demoUser.id, demoUser);

    // Create demo fitness data for the current week
    const today = new Date();
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      const steps = i === 0 ? 6253 : Math.floor(Math.random() * 8000) + 2000;
      const calories = Math.floor(steps * 0.04) + Math.floor(Math.random() * 100);
      const distanceKm = (steps * 0.0008).toFixed(1);
      
      const fitnessEntry: FitnessData = {
        id: randomUUID(),
        userId: demoUser.id,
        date: dateStr,
        steps,
        stepGoal: 8000,
        calories,
        distance: `${distanceKm} km`
      };
      
      this.fitnessData.set(`${demoUser.id}-${dateStr}`, fitnessEntry);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFitnessData(userId: string, date: string): Promise<FitnessData | undefined> {
    return this.fitnessData.get(`${userId}-${date}`);
  }

  async getFitnessDataRange(userId: string, startDate: string, endDate: string): Promise<FitnessData[]> {
    const results: FitnessData[] = [];
    for (const data of this.fitnessData.values()) {
      if (data.userId === userId && data.date >= startDate && data.date <= endDate) {
        results.push(data);
      }
    }
    return results.sort((a, b) => a.date.localeCompare(b.date));
  }

  async createOrUpdateFitnessData(insertData: InsertFitnessData): Promise<FitnessData> {
    const key = `${insertData.userId}-${insertData.date}`;
    const existing = this.fitnessData.get(key);
    
    if (existing) {
      const updated: FitnessData = { ...existing, ...insertData };
      this.fitnessData.set(key, updated);
      return updated;
    } else {
      const id = randomUUID();
      const data: FitnessData = { ...insertData, id };
      this.fitnessData.set(key, data);
      return data;
    }
  }
}

export const storage = new MemStorage();

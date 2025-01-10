import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { clients } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  // Get all clients
  app.get("/api/clients", async (_req, res) => {
    const allClients = await db.select().from(clients);
    res.json(allClients);
  });

  // Get single client
  app.get("/api/clients/:id", async (req, res) => {
    const client = await db.select().from(clients).where(eq(clients.id, parseInt(req.params.id)));
    if (client.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client[0]);
  });

  // Create new client
  app.post("/api/clients", async (req, res) => {
    const newClient = await db.insert(clients).values(req.body).returning();
    res.status(201).json(newClient[0]);
  });

  // Update client
  app.put("/api/clients/:id", async (req, res) => {
    const updatedClient = await db
      .update(clients)
      .set({ ...req.body, updatedAt: new Date() })
      .where(eq(clients.id, parseInt(req.params.id)))
      .returning();
    res.json(updatedClient[0]);
  });

  const httpServer = createServer(app);
  return httpServer;
}

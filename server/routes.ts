import type { Express } from "express";
import { createServer, type Server } from "http";
import { requireAuth } from "./auth";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export function registerRoutes(app: Express): Server {
  // Basic health
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Protect the following routes with Clerk
  app.use("/api/clients", requireAuth);

  // List all clients
  app.get("/api/clients", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("updatedAt", { ascending: false });
      if (error) throw error;
      return res.json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Create a new client
  app.post("/api/clients", async (req, res) => {
    try {
      const { name, notes, additionalComments } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Client name is required" });
      }
      const { data, error } = await supabase
        .from("clients")
        .insert({
          name,
          notes,
          additionalComments
        })
        .select()
        .single();
      if (error) throw error;
      return res.json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Update a client
  app.put("/api/clients/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase
        .from("clients")
        .update(req.body)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return res.json(data);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
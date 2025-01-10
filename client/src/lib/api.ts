import { Client, NewClient } from "@/types/client";

export async function getClients(): Promise<Client[]> {
  const res = await fetch("/api/clients");
  if (!res.ok) throw new Error("Failed to fetch clients");
  return res.json();
}

export async function getClient(id: string): Promise<Client> {
  const res = await fetch(`/api/clients/${id}`);
  if (!res.ok) throw new Error("Failed to fetch client");
  return res.json();
}

export async function createClient(client: NewClient): Promise<Client> {
  const res = await fetch("/api/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });
  if (!res.ok) throw new Error("Failed to create client");
  return res.json();
}

export async function updateClient(id: number, client: Partial<Client>): Promise<Client> {
  const res = await fetch(`/api/clients/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });
  if (!res.ok) throw new Error("Failed to update client");
  return res.json();
}

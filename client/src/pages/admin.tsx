import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * This Admin panel lists existing clients, offers a search bar,
 * plus links to add a new customer or manage templates.
 */
export default function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useLocation();
  
  const { data: clients = [] } = useQuery({
    queryKey: ["/api/clients"],
    queryFn: async () => {
      const res = await fetch("/api/clients");
      if (!res.ok) throw new Error("Failed to fetch clients");
      return await res.json();
    }
  });

  const filtered = clients.filter((client: any) => {
    return (
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setLocation("/templates")}
            >
              Manage Templates
            </Button>
            <Button
              onClick={() => setLocation("/add-customer")}
            >
              Add New Customer
            </Button>
          </div>
          <div>
            <Input
              placeholder="Search clients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-background rounded border p-4 mt-4">
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">No clients found.</p>
          ) : (
            <div className="space-y-2">
              {filtered.map((client: any) => (
                <Link
                  key={client.id}
                  href={`/clients/${client.id}`}
                  className="block rounded p-2 hover:bg-muted transition-colors"
                >
                  <div className="font-semibold">{client.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {client.notes}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
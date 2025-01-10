import { useQuery } from "@tanstack/react-query";
import { getClients } from "@/lib/api";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

export default function ClientList() {
  const [search, setSearch] = useState("");
  const { data: clients = [] } = useQuery({ queryKey: ["/api/clients"], queryFn: getClients });

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground">Clients</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-[300px]"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="grid gap-4">
            {filteredClients.map((client) => (
              <Link key={client.id} href={`/clients/${client.id}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-medium">{client.name}</h2>
                        <p className="text-sm text-muted-foreground">{client.company}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(client.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

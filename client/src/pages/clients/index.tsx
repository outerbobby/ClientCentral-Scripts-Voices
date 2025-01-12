import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients } from "@/lib/api";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ClientList() {
  const [search, setSearch] = useState("");
  const { data: clients = [] } = useQuery({
    queryKey: ["/api/clients"],
    queryFn: getClients,
  });

  // Controls for the "Add Client" dialog
  const [openAddClient, setOpenAddClient] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const queryClient = useQueryClient();
  const createClientMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          notes: clientNotes,
          // We could handle the template logic here if needed
          additionalComments: `Applied template: ${selectedTemplate}`,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create client");
      }
      return response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["/api/clients"]);
      setOpenAddClient(false);
      setClientName("");
      setClientNotes("");
      setSelectedTemplate("");
    },
  });

  function handleAddClient(e: React.FormEvent) {
    e.preventDefault();
    if (!clientName.trim()) return;
    createClientMutation.mutate();
  }

  // Controls for the "Template Manager" dialog
  const [openTemplateManager, setOpenTemplateManager] = useState(false);

  // Filter the list of clients
  const filteredClients = clients.filter((client) =>
    [client.name, client.company, client.notes]
      .filter(Boolean)
      .some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground">Clients</h1>
          <div className="flex items-center gap-2">
            {/* Add New Client Button/Trigger */}
            <Button variant="default" onClick={() => setOpenAddClient(true)}>
              Add New Client
            </Button>

            {/* Template Manager Button/Trigger */}
            <Button variant="outline" onClick={() => setOpenTemplateManager(true)}>
              Template Manager
            </Button>

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
        </div>

        {/* Clients List */}
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="grid gap-4">
            {filteredClients.map((client) => (
              <Link key={client.id} href={`/clients/${client.id}`}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-medium">{client.name}</h2>
                        <p className="text-sm text-muted-foreground">
                          {client.company}
                        </p>
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

        {/* Dialog for Add New Client */}
        <Dialog open={openAddClient} onOpenChange={setOpenAddClient}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Provide basic info about the new client below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddClient}>
              <div className="space-y-4 py-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Client Name
                  </label>
                  <Input
                    placeholder="Enter client name..."
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Notes
                  </label>
                  <Textarea
                    placeholder="Free text for any notes..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Template
                  </label>
                  <Select
                    value={selectedTemplate}
                    onValueChange={setSelectedTemplate}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="templateA">Template A</SelectItem>
                      <SelectItem value="templateB">Template B</SelectItem>
                      <SelectItem value="templateC">Template C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={createClientMutation.isLoading}>
                  {createClientMutation.isLoading ? "Saving..." : "Create Client"}
                </Button>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Dialog for Template Manager */}
        <Dialog open={openTemplateManager} onOpenChange={setOpenTemplateManager}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Template Manager</DialogTitle>
              <DialogDescription>
                Edit or add new templates here.
              </DialogDescription>
            </DialogHeader>
            {/* Placeholder UI for template manager */}
            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">
                This is a placeholder for the template manager. 
                You could embed an existing component here or build out UI.
              </p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
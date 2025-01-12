import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [location, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, notes, additionalComments }),
      });
      if (!res.ok) throw new Error("Failed to add customer");
      return res.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["/api/clients"]);
      setLocation("/admin");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    mutation.mutate();
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add New Customer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Client Name *</label>
            <Input
              type="text"
              placeholder="Client name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <Textarea
              placeholder="Enter any background or context..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Additional Comments</label>
            <Textarea
              placeholder="Additional comments..."
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
            />
          </div>

          <Button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
    </div>
  );
}
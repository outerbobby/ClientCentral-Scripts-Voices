import { useQuery } from "@tanstack/react-query";
import { getClient } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useParams } from "wouter";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ClientDetail() {
  const { id } = useParams();
  const { data: client, refetch } = useQuery({
    queryKey: [`/api/clients/${id}`],
    queryFn: () => getClient(id),
  });

  const [templateApplied, setTemplateApplied] = useState(false);

  function handleApplyTemplate() {
    // For demonstration, we'll just fake that we updated the client with new sections
    // A real approach would fetch from a templates DB, then update the client doc
    // with those default sections
    setTemplateApplied(true);
    // Possibly we would do a PUT to /api/clients/:id with new section data here
  }

  if (!client) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">{client.name}</h1>
            <p className="text-muted-foreground">{client.company}</p>
          </div>
          {!templateApplied && (
            <Button onClick={handleApplyTemplate}>
              Apply Template
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <Tabs defaultValue="script-writing" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="script-writing">Script Builder</TabsTrigger>
                <TabsTrigger value="voice-actor">Voice Actor</TabsTrigger>
                <TabsTrigger value="quality-control">Quality Control</TabsTrigger>
                <TabsTrigger value="training-map">Flow Training Map</TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[calc(100vh-20rem)]">
                <TabsContent value="script-writing" className="mt-6">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Script Writing Details</h3>
                    {templateApplied ? (
                      <p className="text-sm mb-2">Default template sections have been applied!</p>
                    ) : null}
                    <pre className="text-sm">
                      {JSON.stringify(client.scriptWriting, null, 2)}
                    </pre>
                  </CardContent>
                </TabsContent>

                <TabsContent value="voice-actor" className="mt-6">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Voice Actor Details</h3>
                    <pre className="text-sm">
                      {JSON.stringify(client.voiceActor, null, 2)}
                    </pre>
                  </CardContent>
                </TabsContent>

                <TabsContent value="quality-control" className="mt-6">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Quality Control Details</h3>
                    <pre className="text-sm">
                      {JSON.stringify(client.qualityControl, null, 2)}
                    </pre>
                  </CardContent>
                </TabsContent>

                <TabsContent value="training-map" className="mt-6">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Flow Training Map</h3>
                    <pre className="text-sm">
                      {JSON.stringify(client.trainingMap, null, 2)}
                    </pre>
                  </CardContent>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
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
  const { data: client } = useQuery({
    queryKey: [`/api/clients/${id}`],
    queryFn: () => getClient(id),
  });

  const [templateApplied, setTemplateApplied] = useState(false);

  function handleApplyTemplate() {
    // For demonstration, we simply set a flag
    setTemplateApplied(true);
  }

  if (!client) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">{client.name}</h1>
            <p className="text-muted-foreground">
              {client.company || "No company info yet"}
            </p>
          </div>
          {!templateApplied && (
            <Button onClick={handleApplyTemplate}>
              Apply Template
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            {/* The 4 tabs: Script Builder, Voice Actor, Quality Control, Flow Training Map */}
            <Tabs defaultValue="script-builder" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="script-builder">Script Builder</TabsTrigger>
                <TabsTrigger value="voice-actor">Voice Actor</TabsTrigger>
                <TabsTrigger value="quality-control">Quality Control</TabsTrigger>
                <TabsTrigger value="training-map">Flow Training Map</TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[calc(100vh-20rem)]">
                <TabsContent value="script-builder" className="mt-6">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Script Builder</h3>
                    {templateApplied ? (
                      <p className="text-sm mb-2 text-green-600">
                        Template applied for Script Builder!
                      </p>
                    ) : null}
                    <p className="text-sm">Placeholder content for Script Builder tab.</p>
                  </CardContent>
                </TabsContent>

                <TabsContent value="voice-actor" className="mt-6">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Voice Actor</h3>
                    {templateApplied ? (
                      <p className="text-sm mb-2 text-green-600">
                        Template applied for Voice Actor!
                      </p>
                    ) : null}
                    <p className="text-sm">Placeholder content for Voice Actor tab.</p>
                  </CardContent>
                </TabsContent>

                <TabsContent value="quality-control" className="mt-6">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Quality Control</h3>
                    {templateApplied ? (
                      <p className="text-sm mb-2 text-green-600">
                        Template applied for Quality Control!
                      </p>
                    ) : null}
                    <p className="text-sm">Placeholder content for Quality Control tab.</p>
                  </CardContent>
                </TabsContent>

                <TabsContent value="training-map" className="mt-6">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Flow Training Map</h3>
                    {templateApplied ? (
                      <p className="text-sm mb-2 text-green-600">
                        Template applied for Flow Training Map!
                      </p>
                    ) : null}
                    <p className="text-sm">Placeholder content for Flow Training Map tab.</p>
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
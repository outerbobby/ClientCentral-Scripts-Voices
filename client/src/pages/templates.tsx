import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * This page is a placeholder for creating/editing script templates
 * that can be applied to a client's workspace for a particular scenario.
 */
export default function Templates() {
  const [templates, setTemplates] = useState<{ name: string; content: string }[]>([]);
  const [tempName, setTempName] = useState("");
  const [tempContent, setTempContent] = useState("");

  function handleAddTemplate() {
    if (!tempName.trim()) return;
    setTemplates(prev => [...prev, { name: tempName, content: tempContent }]);
    setTempName("");
    setTempContent("");
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Manage Templates</h1>
        <div className="border p-4 space-y-2 rounded">
          <Input
            placeholder="Template Name"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
          <Textarea
            placeholder="Template content..."
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
          />
          <Button onClick={handleAddTemplate}>Add Template</Button>
        </div>

        <div className="space-y-2">
          {templates.map((t, idx) => (
            <div key={idx} className="p-4 border rounded">
              <div className="font-semibold text-lg">{t.name}</div>
              <pre className="mt-2 text-sm whitespace-pre-wrap">{t.content}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
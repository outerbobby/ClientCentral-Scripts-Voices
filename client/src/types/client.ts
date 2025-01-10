export interface Client {
  id: number;
  name: string;
  company: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  scriptWriting: Record<string, any>;
  voiceActor: Record<string, any>;
  qualityControl: Record<string, any>;
  trainingMap: Record<string, any>;
}

export type NewClient = Omit<Client, "id" | "createdAt" | "updatedAt">;

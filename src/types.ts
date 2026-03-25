export interface MomentData {
  id?: string;
  occasion: string;
  relationship: string;
  tone: string;
  memories: string[];
  messages: string[];
  media: {
    images: string[];
    videos: string[];
    voice: string[];
  };
  narrative?: string;
  sections?: Array<{
    title: string;
    content: string;
    suggestedMediaIndex: number;
  }>;
  heroMessage?: string;
  layout?: any;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

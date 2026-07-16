"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const generatePostSchema = z.object({
  topic: z.string().min(3, "L'argomento deve contenere almeno 3 caratteri"),
  tone: z.enum(["divertente", "professionale", "urgente"]),
  platform: z.enum(["instagram", "linkedin", "facebook"]),
});

export type GeneratePostInput = z.infer<typeof generatePostSchema>;

export interface GeneratePostResult {
  success: boolean;
  content?: string;
  error?: string;
}

const toneDescriptions: Record<string, string> = {
  divertente: "divertente, leggero e coinvolgente con emoji appropriate",
  professionale: "professionale, autorevole ma accessibile",
  urgente: "urgente, che crea senso di scarsità e FOMO",
};

const platformGuidelines: Record<string, string> = {
  instagram: "Usa emoji frequenti, hashtag popolari (5-10), linguaggio giovane e visivo. Max 2200 caratteri.",
  linkedin: "Tono più formale, hashtag professionali (3-5), focus su valore e insight. Struttura con paragrafi brevi.",
  facebook: "Tono conversazionale, emoji moderate, 1-3 hashtag, invito all'interazione nei commenti.",
};

export async function generatePost(input: GeneratePostInput): Promise<GeneratePostResult> {
  try {
    // Validate input
    const validatedData = generatePostSchema.safeParse(input);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.errors[0]?.message || "Dati non validi",
      };
    }

    const { topic, tone, platform } = validatedData.data;

    if (!process.env.GOOGLE_API_KEY) {
      return {
        success: false,
        error: "API key non configurata. Contatta l'amministratore.",
      };
    }

    const prompt = `Sei un copywriter esperto di social media marketing italiano. Crei contenuti virali e coinvolgenti.

Scrivi un post per ${platform.charAt(0).toUpperCase() + platform.slice(1)} con tono ${toneDescriptions[tone]} su questo argomento: "${topic}".

Linee guida per ${platform}: ${platformGuidelines[platform]}

Il post deve:
- Essere accattivante fin dalla prima riga
- Includere emoji pertinenti
- Terminare con una call-to-action
- Includere hashtag rilevanti alla fine

Rispondi SOLO con il testo del post, senza spiegazioni aggiuntive.`;

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const generatedContent = response.text();

    if (!generatedContent) {
      return {
        success: false,
        error: "Nessun contenuto generato. Riprova.",
      };
    }

    return {
      success: true,
      content: generatedContent.trim(),
    };
  } catch (error) {
    console.error("Error generating post:", error);
    
    // Handle Google AI errors
    const errorMessage = error instanceof Error ? error.message : "";
    
    if (errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("401")) {
      return {
        success: false,
        error: "API key non valida. Contatta l'amministratore.",
      };
    }
    
    if (errorMessage.includes("RATE_LIMIT") || errorMessage.includes("429")) {
      return {
        success: false,
        error: "Limite di richieste raggiunto. Riprova tra qualche minuto.",
      };
    }

    return {
      success: false,
      error: "Si è verificato un errore. Riprova più tardi.",
    };
  }
}

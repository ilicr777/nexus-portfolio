"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

const translateMenuSchema = z.object({
  menuText: z.string().min(10, "Il menu deve contenere almeno 10 caratteri"),
});

export type TranslateMenuInput = z.infer<typeof translateMenuSchema>;

export interface TranslatedMenu {
  english: string;
  french: string;
  chinese: string;
}

export interface TranslateMenuResult {
  success: boolean;
  translations?: TranslatedMenu;
  error?: string;
}

const createTranslationPrompt = (menuText: string, targetLanguage: string, languageCode: string): string => {
  return `You are a professional translator for high-end Italian restaurants. Your task is to translate the following Italian menu.

RULES:
1. KEEP the name of each dish in original Italian (e.g., "Spaghetti alla Carbonara" stays as is)
2. Translate and explain the ingredients/description in ${targetLanguage}
3. Format the output clearly and elegantly
4. Maintain the structure of the original menu
5. If there are prices, keep them as-is

TARGET LANGUAGE: ${targetLanguage}

ITALIAN MENU TO TRANSLATE:
${menuText}

Provide ONLY the translated menu, no additional explanations.`;
};

async function translateToLanguage(menuText: string, language: string, languageCode: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  const prompt = createTranslationPrompt(menuText, language, languageCode);
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function translateMenu(input: TranslateMenuInput): Promise<TranslateMenuResult> {
  try {
    // Validate input
    const validatedData = translateMenuSchema.safeParse(input);

    if (!validatedData.success) {
      return {
        success: false,
        error: validatedData.error.errors[0]?.message || "Dati non validi",
      };
    }

    const { menuText } = validatedData.data;

    if (!process.env.GOOGLE_API_KEY) {
      return {
        success: false,
        error: "API key non configurata. Contatta l'amministratore.",
      };
    }

    // Make parallel translation calls for all 3 languages
    const [english, french, chinese] = await Promise.all([
      translateToLanguage(menuText, "English", "en"),
      translateToLanguage(menuText, "French", "fr"),
      translateToLanguage(menuText, "Chinese (Simplified)", "zh"),
    ]);

    return {
      success: true,
      translations: {
        english,
        french,
        chinese,
      },
    };
  } catch (error) {
    console.error("Error translating menu:", error);
    
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

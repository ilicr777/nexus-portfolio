"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

interface DictionaryContextType {
  dictionary: Dictionary;
  locale: Locale;
}

const DictionaryContext = createContext<DictionaryContextType | null>(null);

interface DictionaryProviderProps {
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
}

export function DictionaryProvider({
  children,
  dictionary,
  locale,
}: DictionaryProviderProps) {
  return (
    <DictionaryContext.Provider value={{ dictionary, locale }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context;
}

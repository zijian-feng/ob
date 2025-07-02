import type { Locale } from "@/contexts/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useLocaleStore = create(
  persist<{ locale: Locale }>((set) => ({
    locale: navigator.language as Locale,
    setLocale: (locale: Locale) => set({ locale })
  }), {
    name: 'locale',
    storage: createJSONStorage(() => localStorage)
  })
)
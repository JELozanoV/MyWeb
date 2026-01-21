import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

type Locale = 'es' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  fadePhase: "idle" | "out" | "in";
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('es');
  const [fadePhase, setFadePhase] = useState<"idle" | "out" | "in">("idle");

  const transitionIdRef = useRef(0);
  const pendingLocaleRef = useRef<Locale | null>(null);
  const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fadeInTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const FADE_OUT_MS = 150;
  const FADE_IN_MS = 200;

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale;
    if (saved) setLocaleState(saved);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const requestLocaleChange = (nextLocale: Locale) => {
    // Cancel any ongoing timeouts
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }
    if (fadeInTimeoutRef.current) {
      clearTimeout(fadeInTimeoutRef.current);
      fadeInTimeoutRef.current = null;
    }

    // Update refs
    pendingLocaleRef.current = nextLocale;
    transitionIdRef.current += 1;
    const currentTransitionId = transitionIdRef.current;

    // Start fade-out
    setFadePhase("out");

    fadeOutTimeoutRef.current = setTimeout(() => {
      if (currentTransitionId !== transitionIdRef.current) return; // Stale transition

      // Swap locale
      if (pendingLocaleRef.current) {
        setLocale(pendingLocaleRef.current);
        pendingLocaleRef.current = null;
      }

      // Start fade-in
      setFadePhase("in");

      fadeInTimeoutRef.current = setTimeout(() => {
        if (currentTransitionId !== transitionIdRef.current) return; // Stale transition
        setFadePhase("idle");
      }, FADE_IN_MS);
    }, FADE_OUT_MS);
  };

  const toggleLocale = () => {
    const nextLocale = locale === 'es' ? 'en' : 'es';
    requestLocaleChange(nextLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, fadePhase }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used within LocaleProvider');
  return context;
};
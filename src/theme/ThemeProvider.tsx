import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";
type TransitionState = "idle" | "collapsing" | "expanding";

interface ThemeContextValue {
  theme: Theme;
  transitionState: TransitionState;
  origin: { x: number; y: number };
  setThemeWithTransition: (
    next: Theme,
    origin?: { x: number; y: number },
  ) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "portfolio-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [transitionState, setTransitionState] =
    useState<TransitionState>("idle");
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const busyRef = useRef(false);

  // Audio elements for the two transition sounds
  const darkAudioRef = useRef<HTMLAudioElement | null>(null);
  const lightAudioRef = useRef<HTMLAudioElement | null>(null);

  // Set up audio elements once
  useEffect(() => {
    if (typeof window === "undefined") return;

    const dark = new Audio("/audio/darktheme.mp3");
    dark.preload = "auto";
    dark.volume = 0.55;

    const light = new Audio("/audio/lighttheme.mp3");
    light.preload = "auto";
    light.volume = 0.4;

    darkAudioRef.current = dark;
    lightAudioRef.current = light;

    return () => {
      dark.src = "";
      light.src = "";
    };
  }, []);

  // Hydrate theme from storage / OS preference
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const prefersLight = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;
    const initial: Theme = stored ?? (prefersLight ? "light" : "dark");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const setThemeWithTransition = useCallback(
    (next: Theme, clickOrigin?: { x: number; y: number }) => {
      if (busyRef.current || next === theme) return;
      busyRef.current = true;

      if (clickOrigin) {
        setOrigin(clickOrigin);
      } else {
        setOrigin({ x: window.innerWidth - 60, y: 60 });
      }

      const goingDark = next === "dark";

      // Play the appropriate sound
      const audio = goingDark
        ? darkAudioRef.current
        : lightAudioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {
          // Autoplay might be blocked; silently ignore
        });
      }

      setTransitionState(goingDark ? "collapsing" : "expanding");

      // Flip the actual theme at the midpoint of the visual
      setTimeout(
        () => {
          setTheme(next);
          document.documentElement.dataset.theme = next;
          localStorage.setItem(STORAGE_KEY, next);
        },
        goingDark ? 900 : 700,
      );

      // Reset
      setTimeout(
        () => {
          setTransitionState("idle");
          busyRef.current = false;
        },
        goingDark ? 1800 : 1500,
      );
    },
    [theme],
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        transitionState,
        origin,
        setThemeWithTransition,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
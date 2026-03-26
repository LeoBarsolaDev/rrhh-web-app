import { useEffect, useState } from "react";

export function useBreakpoint(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches("matches" in e ? e.matches : (e as MediaQueryList).matches);
    };

    // inicial
    handler(media);

    // escuchar cambios
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
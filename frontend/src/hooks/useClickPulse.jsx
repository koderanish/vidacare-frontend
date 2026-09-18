import { useEffect, useRef, useState } from "react";

// Minimal "acknowledged" feedback for a button click: a brief, dim buffering
// ring shown for a fixed short window, independent of any real async
// loading state. Not meant to read as "loading" - just a subtle tap response
// so every click feels acknowledged immediately, even on instant actions.
export function useClickPulse(duration = 400) {
  const [pulsing, setPulsing] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  function pulse() {
    setPulsing(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPulsing(false), duration);
  }

  return [pulsing, pulse];
}

// The ring itself, sized/dimmed to stay in the background - pair with
// `useClickPulse` and render only while `pulsing` (and not already
// `loading`, which should keep its own full-strength indicator).
export function ClickPulseRing({ className = "" }) {
  return (
    <span
      className={`inline-block h-3 w-3 shrink-0 animate-spin rounded-full border-[1.5px] border-current border-t-transparent opacity-50 ${className}`}
    />
  );
}

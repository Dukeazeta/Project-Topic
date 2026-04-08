"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useExamTimer(initialSeconds: number, enabled: boolean, onExpire?: () => void) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const onExpireRef = useRef(onExpire);
  const hasExpiredRef = useRef(false);

  // Keep the callback ref fresh without re-triggering effects
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // Only sync from server when the value meaningfully changes (> 2s drift)
  useEffect(() => {
    if (initialSeconds <= 0) return;
    setRemainingSeconds((current) => {
      const drift = Math.abs(current - initialSeconds);
      // Only re-sync if the server time differs by more than 2 seconds
      return drift > 2 ? initialSeconds : current;
    });
  }, [initialSeconds]);

  // Reset the expired flag if we get a fresh positive timer from the server
  useEffect(() => {
    if (initialSeconds > 0) {
      hasExpiredRef.current = false;
    }
  }, [initialSeconds]);

  // Single stable countdown interval — no dependency on remainingSeconds
  useEffect(() => {
    if (!enabled) return;

    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          if (!hasExpiredRef.current) {
            hasExpiredRef.current = true;
            // Fire onExpire asynchronously to avoid setState-during-render
            queueMicrotask(() => onExpireRef.current?.());
          }
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [enabled]);

  const formatted = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;

  return { remainingSeconds, formatted, setRemainingSeconds };
}

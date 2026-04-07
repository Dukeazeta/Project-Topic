"use client";

import { useEffect, useState } from "react";

export function useExamTimer(initialSeconds: number, enabled: boolean, onExpire?: () => void) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  useEffect(() => {
    setRemainingSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!enabled) return;
    if (remainingSeconds <= 0) {
      onExpire?.();
      return;
    }

    const timer = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          onExpire?.();
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [enabled, onExpire, remainingSeconds]);

  const formatted = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;

  return { remainingSeconds, formatted, setRemainingSeconds };
}

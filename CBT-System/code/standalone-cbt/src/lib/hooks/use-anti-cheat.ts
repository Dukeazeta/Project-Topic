"use client";

import { useEffect } from "react";

export type ViolationType = "tab_switch" | "fullscreen_exit" | "copy_paste" | "right_click" | "devtools";

export function useAntiCheat(enabled: boolean, onViolation: (type: ViolationType, metadata?: string) => void) {
  useEffect(() => {
    if (!enabled) return;

    const onVisibilityChange = () => {
      if (document.hidden) onViolation("tab_switch", JSON.stringify({ at: new Date().toISOString() }));
    };

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        onViolation("fullscreen_exit", JSON.stringify({ at: new Date().toISOString() }));
      }
    };

    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      onViolation("right_click", JSON.stringify({ at: new Date().toISOString() }));
    };

    const onCopyPaste = (event: ClipboardEvent) => {
      event.preventDefault();
      onViolation("copy_paste", JSON.stringify({ at: new Date().toISOString(), type: event.type }));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (
        key === "F12" ||
        ((event.ctrlKey || event.metaKey) && event.shiftKey && ["I", "J", "C"].includes(key))
      ) {
        event.preventDefault();
        onViolation("devtools", JSON.stringify({ at: new Date().toISOString(), key: event.key }));
      }
    };

    const onWindowBlur = () => {
      onViolation("tab_switch", JSON.stringify({ at: new Date().toISOString(), reason: "blur" }));
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("copy", onCopyPaste);
    document.addEventListener("cut", onCopyPaste);
    document.addEventListener("paste", onCopyPaste);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", onWindowBlur);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("copy", onCopyPaste);
      document.removeEventListener("cut", onCopyPaste);
      document.removeEventListener("paste", onCopyPaste);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [enabled, onViolation]);
}

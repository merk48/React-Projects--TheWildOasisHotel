import { useEffect, useState } from "react";

/**
 * Helper: returns viewport width (basic)
 */
export function useViewportWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    function onResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}

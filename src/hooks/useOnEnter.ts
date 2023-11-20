import { useEffect } from "react";

export const useOnEnter = (
  method: (event: KeyboardEvent) => void,
  hasEmptyField: boolean
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        method(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [method, hasEmptyField]);
};

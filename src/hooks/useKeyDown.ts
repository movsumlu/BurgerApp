import { useEffect } from "react";

export const useKeyDown = (
  method: (event: KeyboardEvent) => void,
  keyName: string,
  hasEmptyField: boolean = false
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === keyName && !hasEmptyField) {
        method(event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [method, keyName, hasEmptyField]);
};

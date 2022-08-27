import { useState } from "react";

const useVisibility = (initial?: boolean) => {
  const [isVisible, setVisibility] = useState(initial || false);
  const toggleVisibility = () => setVisibility((prev) => !prev);
  const show = () => setVisibility(true);
  const hide = () => setVisibility(false);
  return { isVisible, setVisibility, toggleVisibility, show, hide } as const;
};

export default useVisibility;

import { useEffect, useRef } from "react";
export const useOnChange = (callback, dependancies) => {
  const ref = useRef(false);
  useEffect(() => {
    ref.current ? callback() : (ref.current = true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependancies);
};

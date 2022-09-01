import { useState, useEffect } from "react";

export const useLocalStorage = (storageKey, fallbackState) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState
  );

  useEffect(() => {
    console.log("trying to store", storageKey, value);
    localStorage.setItem(storageKey, JSON.stringify(value));
    console.log(localStorage.getItem("user"));
  }, [value, storageKey]);

  return [value, setValue];
};

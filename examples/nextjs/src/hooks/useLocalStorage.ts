// Simplified hook from: https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/src/useLocalStorage/useLocalStorage.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
): [T, Dispatch<SetStateAction<T>>, () => void] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue;

    if (typeof window === undefined) {
      return initialValueToUse;
    }

    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValueToUse;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValueToUse;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(() => readValue());

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const newValue = value instanceof Function ? value(readValue()) : value;

        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(newValue));

        // Save state
        setStoredValue(newValue);

        // We dispatch a custom event so every similar useLocalStorage hook is notified
        window.dispatchEvent(new StorageEvent("local-storage", { key }));
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, readValue],
  );

  const removeValue = useCallback(() => {
    const defaultValue =
      initialValue instanceof Function ? initialValue() : initialValue;

    // Remove the key from local storage
    window.localStorage.removeItem(key);

    // Save state with default value
    setStoredValue(defaultValue);

    // We dispatch a custom event so every similar useLocalStorage hook is notified
    window.dispatchEvent(new StorageEvent("local-storage", { key }));
  }, [initialValue, key]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStoredValue(readValue());
  }, [key, readValue]);

  return [storedValue, setValue, removeValue];
}

export { useLocalStorage };

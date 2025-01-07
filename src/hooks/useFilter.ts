import { useState, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFilter = <T extends Record<string, any>>(initialFilter: T) => {
  const removeNullFields = (obj: Partial<T>): Partial<T> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null)) as Partial<T>;
  };

  const [filter, setFilter] = useState<Partial<T>>(removeNullFields(initialFilter));

  const updateFilter = useCallback((newFilter: Partial<T>) => {
    setFilter((prevFilter) => removeNullFields({ ...prevFilter, ...newFilter }));
  }, []);

  const resetFilter = useCallback(() => {
    setFilter(removeNullFields(initialFilter));
  }, [initialFilter]);

  return {
    filter,
    setFilter: updateFilter,
    resetFilter,
  };
};

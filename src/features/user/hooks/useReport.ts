import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { UserService } from "../../../services/user.service";
import LocalStorageService from "../../../services/local-storage.service";
import { useState, useCallback } from "react";

export const useReport = (filter: Partial<IFilter> | null) => {
  const user = LocalStorageService.getItem<{ id: string }>("user");
  const userId = user?.id;
  console.log(userId);
  if (!userId) {
    console.error("User ID not found in local storage or user object is invalid.");
    throw new Error("User ID is required to fetch the report.");
  }

  const query = useQuery({
    queryKey: ["report", userId, filter],
    queryFn: () => UserService.getUserReport(userId, filter), 
    placeholderData: keepPreviousData,
  });

  return query;
};

export interface IFilter {
  isWinner: boolean | null;
  startDate: Date | null;
  endDate: Date | null;
  isClosed: boolean | null;
  vehicleName: string | null;
  vin: string | null;
  pageNumber: number | null;
  pageSize: number | null;
}

export const useFilter = (initialFilter: IFilter) => {
  const removeNullFields = (obj: Partial<IFilter>): Partial<IFilter> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null));
  };

  const [filter, setFilter] = useState<Partial<IFilter>>(removeNullFields(initialFilter));

  // Utility function to remove null fields from an object

  const updateFilter = useCallback((newFilter: Partial<IFilter>) => {
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

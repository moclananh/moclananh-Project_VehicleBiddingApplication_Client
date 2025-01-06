import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { VehicleService } from "../../../services/vehicle.service";

export const useVehicles = (filter: Partial<IFilter> | null) => {
  const query = useQuery({
    queryKey: ["vehicle", filter],
    queryFn: () => VehicleService.getVehicles(filter),
    placeholderData: keepPreviousData,
  });

  return query;
};
export const useVehiclesDetails = (id: number) => {
  const query = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => VehicleService.getById(id),
    placeholderData: keepPreviousData,
  });

  return query;
};
import { useState, useCallback } from "react";

export interface IFilter {
  name: string | null;
  brands: string | null;
  vin: string | null;
  color: string | null;
  status: string | null;
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

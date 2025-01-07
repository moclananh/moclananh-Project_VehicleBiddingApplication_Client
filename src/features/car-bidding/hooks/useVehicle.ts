import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { VehicleService } from "../../../services/vehicle.service";
import { IVehicleFilter } from "../types/cars.type";

export const useVehicles = (filter: Partial<IVehicleFilter> | null) => {
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

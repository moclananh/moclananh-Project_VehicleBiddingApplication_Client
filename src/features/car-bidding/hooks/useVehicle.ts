import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IFilter } from "../components/filter-box/FilterBox";
import { VehicleService } from "../../../services/vehicle.service";

export const useVehicles = (filter: IFilter | null) => {
  const query = useQuery({
    queryKey: ["vehicle", filter],
    queryFn: () => VehicleService.getVehicles(filter),
    placeholderData: keepPreviousData,
  });

  return query;
};

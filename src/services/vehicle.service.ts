import { VEHICLES_ENDPOINT } from "../constants/endpoint";
import { IVehicleWithMetaData } from "../features/car-bidding/types/cars.type";
import http from "../libs/interceptor";
import { ApiResponse } from "../types/api-response";
import { IFilter } from "./../features/car-bidding/components/filter-box/FilterBox";
export const VehicleService = {
  getVehicles: async (IFilter: IFilter | null = null) => {
    const response = await http.get<ApiResponse<IVehicleWithMetaData>>(VEHICLES_ENDPOINT, {
      params: IFilter,
    });
    return response.data;
  },
};

import { VEHICLES_ENDPOINT } from "../constants/endpoint";
import { IVehicle, IVehicleFilter, IVehicleWithMetaData } from "../features/car-bidding/types/cars.type";
import http from "../libs/interceptor";
import { ApiResponse } from "../types/api-response";
export const VehicleService = {
  getVehicles: async (IFilter: Partial<IVehicleFilter> | null = null) => {
    const response = await http.get<ApiResponse<IVehicleWithMetaData>>(VEHICLES_ENDPOINT, {
      params: IFilter,
    });
    return response.data;
  },
  getById: async (id: number) => {
    const response = await http.get<ApiResponse<IVehicle>>(`${VEHICLES_ENDPOINT}/${id}`);
    return response.data;
  },
};

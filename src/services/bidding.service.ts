import { BIDDING_SESSION_ENDPOINT } from "../constants/endpoint";
import { IBiddingSessionWithMetaData } from "../features/car-bidding/types/sessions.type";
import http from "../libs/interceptor";
import { ApiResponse } from "../types/api-response";
import { IFilter } from "../features/car-bidding/components/filter-box/VehicleFilter";
export const BiddingService = {
  getSession: async (filter: IFilter | null = null) => {
    const response = await http.get<ApiResponse<IBiddingSessionWithMetaData>>(BIDDING_SESSION_ENDPOINT, {
      params: filter,
    });
    return response.data;
  },
};

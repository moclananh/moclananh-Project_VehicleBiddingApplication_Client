import { BIDDING_SESSION_ENDPOINT } from "../constants/endpoint";
import { IBiddingFilter, IBiddingSessionWithMetaData } from "../features/car-bidding/types/sessions.type";
import http from "../libs/interceptor";
import { ApiResponse } from "../types/api-response";
export const BiddingService = {
  getSession: async (filter: Partial<IBiddingFilter> | null = null) => {
    const response = await http.get<ApiResponse<IBiddingSessionWithMetaData>>(BIDDING_SESSION_ENDPOINT, {
      params: filter,
    });
    return response.data;
  },
};

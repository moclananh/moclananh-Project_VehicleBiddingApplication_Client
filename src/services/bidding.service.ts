import { BIDDING_SESSION_ENDPOINT, USER_ENDPOINT } from "../constants/endpoint";
import { IBiddingFilter, IBiddingSession, IBiddingSessionWithMetaData } from "../features/car-bidding/types/sessions.type";
import http from "../libs/interceptor";
import { ApiResponse } from "../types/api-response";
export const BiddingService = {
  getSession: async (filter: Partial<IBiddingFilter> | null = null) => {
    const response = await http.get<ApiResponse<IBiddingSessionWithMetaData>>(BIDDING_SESSION_ENDPOINT, {
      params: filter,
    });
    return response.data;
  },
  getSessionById: async (id: string) => {
    const response = await http.get<ApiResponse<IBiddingSession>>(`${BIDDING_SESSION_ENDPOINT}/${id}`);
    return response.data;
  },
  getSessionByIdWithUserState: async (userId: string, sessionId: string) => {
    const response = await http.get<ApiResponse<IBiddingSession>>(`${USER_ENDPOINT}/${userId}/sessions/${sessionId}`);
    return response.data;
  },
};

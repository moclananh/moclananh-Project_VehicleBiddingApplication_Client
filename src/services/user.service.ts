import { USER_ENDPOINT } from "../constants/endpoint";
import http from "../libs/interceptor";
import { ApiResponse } from "../types/api-response";
import { IUserReportWithMetaData } from "../features/user/types/report.type";
import { IReportFilter } from "../features/user/types/filter.type";
export const UserService = {
  getUserReport: async (userId: string, filter: Partial<IReportFilter> | null = null) => {
    const response = await http.get<ApiResponse<IUserReportWithMetaData>>(`${USER_ENDPOINT}/${userId}/report`, {
      params: filter,
    });
    return response.data;
  },
};

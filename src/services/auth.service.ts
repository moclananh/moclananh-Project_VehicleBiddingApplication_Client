import { IUser } from "./../features/auth/types/auth.type";
import { ApiResponse } from "./../types/api-response";
import { LOGIN_ENDPOINT } from "../constants/endpoint";
import { ILogin } from "../features/auth/types/auth.type";
import http from "../libs/interceptor";

export const AuthService = {
  login: async (request: ILogin) => {
    const response = await http.post<ApiResponse<IUser>>(LOGIN_ENDPOINT, request);
    return response.data;
  },
};

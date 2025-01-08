import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { UserService } from "../../../services/user.service";
import LocalStorageService from "../../../services/local-storage.service";
import { IReportFilter } from "../types/filter.type";
import { useAuth } from "../../auth/hooks/useAuth";

export const useReport = (filter: Partial<IReportFilter> | null) => {
  const { user } = useAuth();
  const userId = user?.id;
  if (!userId) {
    console.error("User ID not found in local storage or user object is invalid.");
    throw new Error("User ID is required to fetch the report.");
  }

  const query = useQuery({
    queryKey: ["report", userId, filter],
    queryFn: () => UserService.getUserReport(userId, filter),
    placeholderData: keepPreviousData,
  });

  return query;
};

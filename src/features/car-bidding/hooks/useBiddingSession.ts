import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { UserService } from "../../../services/user.service";
import { IBiddingFilter } from "../types/sessions.type";
import LocalStorageService from "../../../services/local-storage.service";

export const useBiddingSession = (filter: Partial<IBiddingFilter> | null) => {
  const user = LocalStorageService.getItem<{ id: string }>("user");
  const userId = user?.id;
  console.log(userId);
  if (!userId) {
    throw new Error("User ID is required to fetch the report.");
  }
  const query = useQuery({
    queryKey: ["session", userId, filter],
    queryFn: () => UserService.getSessionByUserId(userId, filter),
    placeholderData: keepPreviousData,
  });
  return query;
};

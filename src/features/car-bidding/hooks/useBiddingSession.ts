import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { UserService } from "../../../services/user.service";
import { useAuth } from "../../auth/hooks/useAuth";
import { IBiddingFilter } from "../types/sessions.type";
import { BiddingService } from "../../../services/bidding.service";

export const useBiddingSession = (filter: Partial<IBiddingFilter> | null) => {
  const { user } = useAuth();
  const userId = user?.id;
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
export const useBiddingSessionDetails = (id: string) => {
  const query = useQuery({
    queryKey: ["session-details", id],
    queryFn: () => BiddingService.getSessionById(id),
    placeholderData: keepPreviousData,
  });
  return query;
};

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { BiddingService } from "../../../services/bidding.service";
import { UserService } from "../../../services/user.service";
import { useAuth } from "../../auth/hooks/useAuth";
import { IBiddingFilter } from "../types/sessions.type";

export const useBiddingSession = (filter: Partial<IBiddingFilter> | null) => {
  const { user } = useAuth();
  const userId = user?.id;
  if (!userId) {
    throw new Error("User ID is required to fetch the report.");
  }
  const query = useQuery({
    queryKey: ["sessions", userId, filter],
    queryFn: () => UserService.getSessionByUserId(userId, filter),
    refetchOnMount: true,
  });
  return query;
};
export const useBiddingSessionDetails = (id: string) => {
  const query = useQuery({
    queryKey: ["session-details", id],
    queryFn: () => BiddingService.getSessionById(id),
  });
  return query;
};

export const useBiddingSessionDetailsWithUserState = (userId: string, sessionId: string) => {
  const query = useQuery({
    queryKey: ["session-details-with-user", userId, sessionId],
    queryFn: () => BiddingService.getSessionByIdWithUserState(userId, sessionId),
    placeholderData: keepPreviousData,
  });
  return query;
};

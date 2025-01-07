import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { BiddingService } from "../../../services/bidding.service";
import { IBiddingFilter } from "../types/sessions.type";

export const useBiddingSession = (filter: Partial<IBiddingFilter> | null) => {
  const query = useQuery({
    queryKey: ["session", filter],
    queryFn: () => BiddingService.getSession(filter),
    placeholderData: keepPreviousData,
  });
  return query;
};

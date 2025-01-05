import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { BiddingService } from "../../../services/bidding.service";
import { IFilter } from "../components/filter-box/VehicleFilter";

export const useBiddingSession = (filter: IFilter | null) => {
  const query = useQuery({
    queryKey: ["session", filter],
    queryFn: () => BiddingService.getSession(filter),
    placeholderData: keepPreviousData,
  });
  return query;
};

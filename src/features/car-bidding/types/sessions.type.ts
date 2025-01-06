import { WithMetaData } from "../../../types/api-response";
import { IVehicle } from "./cars.type";

export interface IBiddingSession {
  id: string;
  startTime: string;
  endTime: string;
  totalBiddingCount: number;
  highestBidding: number;
  miniumJumpingValue: number;
  isActive: boolean;
  isClosed: boolean;
  vehicleId: number;
  vehicles: IVehicle;
}
export type IBiddingSessionWithMetaData = WithMetaData<IBiddingSession>;

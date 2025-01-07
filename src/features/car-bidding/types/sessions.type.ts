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
export interface IBiddingFilter {
  isActive: boolean | null;
  startTime: string | null;
  endTime: string | null;
  VIN: string | null;
  PageNumber: number | null;
  PageSize: number | null;
}
export type IBiddingSessionWithMetaData = WithMetaData<IBiddingSession>;

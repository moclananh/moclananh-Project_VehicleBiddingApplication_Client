import { WithMetaData } from "../../../types/api-response";
import { IUser } from "../../auth/types/auth.type";
import { IVehicle } from "./cars.type";

export interface IBiddingSession {
  id: string;
  startTime: string;
  endTime: string;
  totalBiddingCount: number;
  highestBidding: number;
  minimumJumpingValue: number;
  isActive: boolean;
  isClosed: boolean;
  vehicleId: number;
  userId: string;
  userBiddingState?: IBidding;
  biddings: IBidding[];
  vehicles: IVehicle;
}

export interface IBiddingFilter {
  isActive: boolean | null;
  startTime: Date | null;
  endTime: Date | null;
  VIN: string | null;
  name: string | null;
  brand: string | null;
  pageNumber: number | null;
  pageSize: number | null;
}

export interface IUserBiddingFilter {
  startTime: Date | null;
  endTime: Date | null;
  VIN: string | null;
  name: string | null;
  brand: string | null;
  pageNumber: number | null;
  pageSize: number | null;
}
export interface IBidding {
  biddingAt: string;
  biddingSessionId: string;
  isWinner: boolean;
  userCurrentBidding: number;
  userId: string;
  user?: IUser;
}

export enum VehicleBrands {
  BMW,
  RollsRoyce,
  Nissan,
  Honda,
}

export type IBiddingSessionWithMetaData = WithMetaData<IBiddingSession>;

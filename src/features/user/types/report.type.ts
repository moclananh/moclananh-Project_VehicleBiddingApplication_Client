import { WithMetaData } from "../../../types/api-response";

export interface IReport {
  biddingId: number;
  userCurrentBidding: number;
  isWinner: boolean;
  sessionId: string;
  startTime: Date;
  endTime: Date;
  biddingAt: Date;
  isClosed: boolean;
  vehicleName: string;
  vin: string;
  imageUrl: string;
}
export type IUserReportWithMetaData = WithMetaData<IReport>;


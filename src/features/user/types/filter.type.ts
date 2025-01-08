import { WithMetaData } from "../../../types/api-response";
export interface IReportFilter {
  isWinner: boolean | null;
  startTime: string | null;
  endTime: string | null;
  isClosed: boolean | null;
  vehicleName?: string | null;
  vin: string | null;
  pageNumber: number | null;
  pageSize: number | null;
}
export type IReportWithMetaData = WithMetaData<IReportFilter>;
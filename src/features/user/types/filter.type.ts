export interface IReportFilter {
  isWinner: boolean | null;
  startDate: string | null;
  endDate: string | null;
  isClosed: boolean | null;
  vehicleName?: string | null;
  vin: string | null;
  pageNumber: number | null;
  pageSize: number | null;
}

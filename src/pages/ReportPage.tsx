import { Pagination, Stack, Table, Text } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { calculateTotalPage } from "../common/utils";
import { GlobalFilter } from "../constants/ui";
import CarsSkeleton from "../features/car-bidding/components/cars-skeleton/CarsSkeleton";
import { useReport } from "../features/user/hooks/useReport";
import { isEmpty } from "lodash";
import { ReportCard } from "../features/user/components/report-card/ReportCard";
import { useFilter } from "../hooks/useFilter";
import { IReportFilter } from "../features/user/types/filter.type";

const ReportPage = () => {
  // Hooks to manage filter and fetch data
  const { filter, setFilter } = useFilter<IReportFilter>(GlobalFilter.DEFAULT_REPORT_FILTER);
  const { data: responseData, isLoading } = useReport(filter);

  // Calculate pagination details
  const totalItems = responseData?.data.itemCounts ?? GlobalFilter.DEFAULT_TOTAL_ITEM;
  const pageSize = responseData?.data.pageSize ?? GlobalFilter.DEFAULT_PAGE_SIZE;
  const totalPages = calculateTotalPage(totalItems, pageSize);
  const reports = responseData?.data.items ?? [];

  // Initialize pagination
  const pagination = usePagination({
    total: totalPages,
    initialPage: 1,
    onChange: (page) => setFilter({ ...filter, pageNumber: page }),
  });

  // Handle loading and empty state
  if (isLoading) {
    return <CarsSkeleton />;
  }

  const isEmptyReports = isEmpty(reports);

  return (
    <Stack px="xl">
      {isEmptyReports ? (
        <Text fz="h2" c="dimmed" fs="italic" ta="center">
          No reports found
        </Text>
      ) : (
        <Table striped highlightOnHover withColumnBorders>
          <thead>
            <tr>
              <th>Vehicle Name</th>
              <th>VIN</th>
              <th>Session</th>
              <th>Bidding Value</th>
              <th>Status</th>
              <th>Bidding At</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <ReportCard key={report.biddingId} report={report} />
            ))}
          </tbody>
        </Table>
      )}

      {!isEmptyReports && (
        <Pagination
          total={totalPages}
          radius="xl"
          value={pagination.active}
          onChange={pagination.setPage}
          mt="lg"
        />
      )}
    </Stack>
  );
};

export default ReportPage;
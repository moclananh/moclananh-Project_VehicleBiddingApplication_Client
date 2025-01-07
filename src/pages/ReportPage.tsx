import { Group, Pagination, SimpleGrid, Stack, Text } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { calculateTotalPage } from "../common/utils";
import { GlobalFilter } from "../constants/ui";
import CarsSkeleton from "../features/car-bidding/components/cars-skeleton/CarsSkeleton";
import VehicleFilter from "../features/car-bidding/components/filter-box/VehicleFilter";
import { useFilter, useReport } from "../features/user/hooks/useReport";
import { isEmpty } from "lodash";
import { ReportCard } from "../features/user/components/report-card/ReportCard";

const ReportPage = () => {
  const { filter, setFilter } = useFilter(GlobalFilter.DEFAULT_FILTER);
  const { data: responseData, isLoading } = useReport(filter);
  const totalItems = responseData?.data.itemCounts ?? GlobalFilter.DEFAULT_TOTAL_ITEM;
  const pageSize = responseData?.data.pageSize ?? GlobalFilter.DEFAULT_PAGE_SIZE;
  const totalPages = calculateTotalPage(totalItems, pageSize);
  const vehicles = responseData?.data.items ?? [];
  const pagination = usePagination({
    total: totalPages,
    initialPage: 1,
    onChange: (page) => setFilter({ ...filter, pageNumber: page }),
  });

  if (isLoading) return <CarsSkeleton />;
  const isEmptyReports = isEmpty(vehicles);

  return (
    <Stack align="center" px="xl">
      {/* Filter Section */}
      <Group w="100%" justify="flex-start">
        <VehicleFilter
          onClearFilter={() => setFilter(GlobalFilter.DEFAULT_FILTER)}
          onFilterChange={(updatedFilter) => setFilter(updatedFilter)}
          onSearchChange={() =>
            setFilter({
              ...filter,
            })
          }
          filter={filter}
        />
      </Group>

      {/* Reports Section */}
      {isEmptyReports ? (
        <Text fz="h2" c="dimmed" fs="italic">
          No reports found
        </Text>
      ) : (
        <SimpleGrid
          cols={{
            base: 1,
            sm: 2,
            md: 3,
            lg: 4,
          }}
        >
          {vehicles.map((vehicle) => (
            <ReportCard key={vehicle.biddingId} report={vehicle} />
          ))}
        </SimpleGrid>
      )}

      {/* Pagination */}
      <Pagination
        total={totalPages}
        radius="xl"
        value={pagination.active}
        onChange={pagination.setPage}
      />
    </Stack>
  );
};

export default ReportPage;

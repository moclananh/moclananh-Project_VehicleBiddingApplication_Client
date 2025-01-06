import { Group, Pagination, SimpleGrid, Stack, Text } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { calculateTotalPage } from "../common/utils";
import { GlobalFilter } from "../constants/ui";
import { CarCard } from "../features/car-bidding/components/car-card/CarCard";
import CarsSkeleton from "../features/car-bidding/components/cars-skeleton/CarsSkeleton";
import VehicleFilter from "../features/car-bidding/components/filter-box/VehicleFilter";
import { useFilter, useVehicles } from "../features/car-bidding/hooks/useVehicle";
import { isEmpty } from "lodash";

const CarsPage = () => {
  const { filter, setFilter } = useFilter(GlobalFilter.DEFAULT_FILTER);
  const { data: responseData, isLoading } = useVehicles(filter);
  const totalItems = responseData?.data.itemCounts ?? GlobalFilter.DEFAULT_TOTAL_ITEM;
  const pageSize = responseData?.data.pageSize ?? GlobalFilter.DEFAULT_PAGE_SIZE;
  const totalPages = calculateTotalPage(totalItems, pageSize);
  const vehicles = responseData?.data.items ?? [];
  const navigate = useNavigate();
  const pagination = usePagination({
    total: totalPages,
    initialPage: 1,
    onChange: (page) => setFilter({ ...filter, pageNumber: page }),
  });

  if (isLoading) return <CarsSkeleton />;
  const isEmptyCars = isEmpty(vehicles) && !isLoading;

  return (
    <Stack align="center" px="xl">
      <Group w="100%" justify="flex-start">
        <VehicleFilter
          onClearFilter={() => setFilter(GlobalFilter.DEFAULT_FILTER)}
          onFilterChange={(filter) => setFilter(filter)}
          onSearchChange={(search) => {
            setFilter({
              ...filter,
              name: search,
            });
          }}
          filter={filter}
        />
      </Group>

      {isEmptyCars ? (
        <Text fz="h2" c="dimmed" fs="italic">
          No vehicles found
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
            <CarCard key={vehicle.id} car={vehicle} onViewDetails={() => navigate(`/dashboard/cars/${vehicle.id}`)} />
          ))}
        </SimpleGrid>
      )}
      <Pagination total={totalPages} radius="xl" onChange={pagination.setPage} onNextPage={pagination.next} onPreviousPage={pagination.previous} />
    </Stack>
  );
};

export default CarsPage;

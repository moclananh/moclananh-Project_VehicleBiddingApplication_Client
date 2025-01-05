import { Group, Pagination, SimpleGrid, Stack } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { calculateTotalPage } from "../common/utils";
import { GlobalFilter } from "../constants/ui";
import { CarCard } from "../features/car-bidding/components/car-card/CarCard";
import CarsSkeleton from "../features/car-bidding/components/cars-skeleton/CarsSkeleton";
import VehicleFilter from "../features/car-bidding/components/filter-box/VehicleFilter";
import { useVehicles } from "../features/car-bidding/hooks/useVehicle";

const CarsPage = () => {
  const { data: responseData, isLoading } = useVehicles(null);
  const totalItems = responseData?.data.totalItems ?? GlobalFilter.DEFAULT_TOTAL_ITEM;
  const pageSize = responseData?.data.pageSize ?? GlobalFilter.DEFAULT_PAGE_SIZE;
  const totalPages = calculateTotalPage(totalItems, pageSize);
  const vehicles = responseData?.data.items ?? [];
  const pagination = usePagination({
    total: totalPages,
    initialPage: 1,
  });
  if (isLoading) return <CarsSkeleton />;

  return (
    <Stack align="center" px="xl">
      <Group w="100%" justify="flex-start">
        <VehicleFilter />
      </Group>
      <SimpleGrid
        cols={{  
          base: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}
      >
        {vehicles.map((vehicle) => (
          <CarCard key={vehicle.id} car={vehicle} />
        ))}
      </SimpleGrid>
      <Pagination total={totalPages} radius="xl" onChange={pagination.setPage} onNextPage={pagination.next} onPreviousPage={pagination.previous} />
    </Stack>
  );
};

export default CarsPage;

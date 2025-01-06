import { Group, Pagination, SimpleGrid, Stack } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { calculateTotalPage } from "../common/utils";
import { GlobalFilter } from "../constants/ui";
import { CarCard } from "../features/car-bidding/components/car-card/CarCard";
import CarsSkeleton from "../features/car-bidding/components/cars-skeleton/CarsSkeleton";
import VehicleFilter from "../features/car-bidding/components/filter-box/VehicleFilter";
import { useVehicles } from "../features/car-bidding/hooks/useVehicle";
import { CarDetails } from "../features/car-bidding/components/car-details/CarDetails";
import { IVehicle } from "../features/car-bidding/types/cars.type";
import { useState } from "react";

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

    // State to track the selected car
    const [selectedCar, setSelectedCar] = useState<IVehicle | null>(null);

    // Handler to set the selected car for details view
    const handleViewDetails = (car: IVehicle) => {
      setSelectedCar(car);
    };
  
    // Handler to reset and show the listing
    const handleBackToListing = () => {
      setSelectedCar(null);
    };
  
    // Show the details page if a car is selected
    if (selectedCar) {
      return (
        <Stack align="center">
          <CarDetails car={selectedCar} onBack={handleBackToListing} />
        </Stack>
      );
    }

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
         <CarCard
            key={vehicle.id}
            car={vehicle}
            onViewDetails={() => handleViewDetails(vehicle)}
          />
        ))}
      </SimpleGrid>
      <Pagination total={totalPages} radius="xl" onChange={pagination.setPage} onNextPage={pagination.next} onPreviousPage={pagination.previous} />
    </Stack>
  );
};

export default CarsPage;

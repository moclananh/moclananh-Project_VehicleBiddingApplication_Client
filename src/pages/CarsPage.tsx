import { Pagination, SimpleGrid, Stack } from "@mantine/core";
import React, { useState } from "react";
import { CarCard } from "../features/car-bidding/components/car-card/CarCard";
import { CarDetails } from "../features/car-bidding/components/car-details/CarDetails";
import { useVehicles } from "../features/car-bidding/hooks/useVehicle";
import { IVehicle } from "../types/cars.type";

const CarsPage = () => {
  const { data: responseData } = useVehicles(null);
  const vehicles = responseData?.data.items ?? [];

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

  // Show the car listing by default
  return (
    <Stack align="center">
      <SimpleGrid cols={4}>
        {vehicles.map((vehicle) => (
          <CarCard
            key={vehicle.id}
            car={vehicle}
            onViewDetails={() => handleViewDetails(vehicle)}
          />
        ))}
      </SimpleGrid>
      <Pagination total={10} radius="xl" />
    </Stack>
  );
};

export default CarsPage;

import { Pagination, SimpleGrid, Stack } from "@mantine/core";
import React from "react";
import { CarCard } from "../features/car-bidding/components/car-card/CarCard";
import { useVehicles } from "../features/car-bidding/hooks/useVehicle";

const CarsPage = () => {
  const { data: responseData } = useVehicles(null);

  const vehicles = responseData?.data.items ?? [];

  return (
    <Stack align="center">
      <SimpleGrid cols={4}>
        {vehicles.map((vehicle) => (
          <CarCard key={vehicle.id} car={vehicle} />
        ))}
      </SimpleGrid>
      <Pagination total={10} radius="xl" />
    </Stack>
  );
};

export default CarsPage;

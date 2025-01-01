import { Pagination, SimpleGrid, Stack } from "@mantine/core";
import React from "react";
import { CarCard } from "../features/car-bidding/components/car-card/CarCard";

const CarsPage = () => {
  return (
    <Stack align="center">
      <SimpleGrid cols={4}>
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </SimpleGrid>
      <Pagination  total={10} radius="xl" />
    </Stack>
  );
};

export default CarsPage;

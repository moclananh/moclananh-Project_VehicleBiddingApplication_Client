import {
    Badge,
    Button,
    Card,
    Flex,
    Group,
    Image,
    Stack,
    Text,
  } from "@mantine/core";
  import { IVehicle } from "../../types/cars.type";
  import { IconGauge, IconUsers, IconArchive, IconHorse, } from "@tabler/icons-react";
  import classes from "./CarDetails.module.css";
  
  interface CarDetailsProps {
    car: IVehicle;
    onBack: () => void;
  }
  
  const statusMapping: Record<string, string> = {
    Available: "green",
    Sold: "yellow",
    InBidding: "teal",
    Unavailable: "gray",
    Default: "blue",
  };
  
  export function CarDetails({ car, onBack }: CarDetailsProps) {
    const isBiddingAllowed = car.status === "InBidding";
  
    return (
      <Card withBorder radius="md" className={classes.card}>
        <Flex
          gap="lg"
          wrap="wrap"
          direction={{ base: "column", md: "row" }}
          align="flex-start"
          justify="center"
        >
          {/* Left: Image */}
          <div className={classes.imageSection}>
            <Image radius="sm" src={car.imageUrl} alt={car.name} />
          </div>
  
          {/* Middle: Vehicle Details */}
          <Stack style={{ flex: 1, minWidth: "300px" }}>
            <Group justify="space-between">
              <div>
                <Text fw={700} fz="xl">
                  {car.name}
                </Text>
                <Text fz="sm" c="dimmed">
                  Brand: {car.brands}
                </Text>
              </div>
              <Badge color={statusMapping[car.status ?? "Default"]}>
                {car.status}
              </Badge>
            </Group>
  
            <Text fz="sm" c="dimmed">
              {car.description}
            </Text>
  
            <Text fz="lg" fw={600}>
              Specifications
            </Text>
            <Group gap="lg">
              <Stack>
                <Group>
                  <IconUsers size={16} />
                  <Text size="sm">{car.numberOfChairs} passengers</Text>
                </Group>
                <Group>
                  <IconHorse size={16} />
                  <Text size="sm">{car.horsepower} horsepower</Text>
                </Group>
              </Stack>
              <Stack>
                <Group>
                  <IconGauge size={16} />
                  <Text size="sm">{car.maximumSpeed} km/h max speed</Text>
                </Group>
                <Group>
                  <IconArchive size={16} />
                  <Text size="sm">{car.trunkCapacity} L trunk capacity</Text>
                </Group>
              </Stack>
            </Group>
  
            <Group mt="md">
              <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                ${car.price.toFixed(2)}
              </Text>
              <Badge color="blue" size="lg">
                Color: {car.color}
              </Badge>
            </Group>
          </Stack>
  
          {/* Right: Actions */}
          <Stack style={{ minWidth: "200px" }}>
            <Button radius="xl" color="blue" disabled={!isBiddingAllowed}>
              Start Bidding
            </Button>
            <Button radius="xl" variant="outline" onClick={onBack}>
              Back to Listing
            </Button>
          </Stack>
        </Flex>
      </Card>
    );
  }
  
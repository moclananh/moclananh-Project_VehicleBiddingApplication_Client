import {
  IconGasStation,
  IconGauge,
  IconManualGearbox,
  IconUsers,
  IconPalette,
  IconArchive,
} from "@tabler/icons-react";
import { Badge, Button, Card, Center, Group, Image, Text } from "@mantine/core";
import classes from "./CarCard.module.css";
import { IVehicle } from "../../types/cars.type";
import { useNavigate } from "react-router-dom";

interface CarCardProps {
  car?: IVehicle;
  onViewDetails: () => void;
}
const statusMapping: Record<string, string> = {
  Available: "green",
  Sold: "yellow",
  InBidding: "blue",
  Unavailable: "gray",
  Default: "black",
};

export function CarCard({ car, onViewDetails }: CarCardProps) {
  const navigate = useNavigate();
  const features = [
    { label: `${car?.numberOfChairs ?? "N/A"} passengers`, icon: IconUsers },
    { label: `${car?.horsepower ?? "N/A"} horsepower`, icon: IconGauge },
    { label: `${car?.maximumSpeed ?? "N/A"} km/h`, icon: IconManualGearbox },
    {
      label: `${car?.trunkCapacity ?? "N/A"} L trunk capacity`,
      icon: IconArchive,
    },
  ].map((feature) => (
    <Center key={feature.label}>
      <feature.icon size={16} className={classes.icon} stroke={1.5} />
      <Text size="xs">{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image
          h={"100%"}
          mih={"180px"}
          radius={"sm"}
          w={"100%"}
          src={car?.imageUrl}
          alt={car?.imageUrl}
        />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{car?.name}</Text>
          <Text fz="xs" c="dimmed">
            {car?.brands}
          </Text>
        </div>
        <Badge
          variant="outline"
          color={statusMapping[car?.status ?? "Default"]}
        >
          {car?.status}
        </Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group gap={8} mb={-8}>
          {features}
          <Center>
            <IconPalette size={16} className={classes.icon} stroke={1.5} />
            <Text size="xs">{car?.color}</Text>
          </Center>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
              ${car?.price}
            </Text>
          </div>

          <Button radius="xl" style={{ flex: 1 }} onClick={onViewDetails}>
            View Details
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}

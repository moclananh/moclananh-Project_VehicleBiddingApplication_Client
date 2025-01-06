import { Badge, Button, Card, Center, Group, Image, Text } from "@mantine/core";
import { IconGauge, IconHorse, IconPalette, IconUsers, IconArchive } from "@tabler/icons-react";
import { statusMapping } from "../../../../constants/ui";
import { IVehicle } from "../../types/cars.type";
import classes from "./CarCard.module.css";

interface CarCardProps {
  car?: IVehicle;
  onViewDetails: () => void;
}

export function CarCard({ car, onViewDetails }: CarCardProps) {
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section className={classes.imageSection}>
        <Image h={"100%"} w={"100%"} src={car?.imageUrl} alt="Tesla Model S" />
      </Card.Section>

      <Group justify="space-between" mt="md">
        <div>
          <Text fw={500}>{car?.name}</Text>
          <Text fz="xs" c="dimmed">
            {car?.brands}
          </Text>
        </div>
        <Badge variant="outline" color={statusMapping[car?.status ?? "Default"]}>
          {car?.status}
        </Badge>
      </Group>

      <Card.Section className={classes.section} mt="md">
        <Text fz="sm" c="dimmed" className={classes.label}>
          Basic configuration
        </Text>

        <Group gap={8} mb={-8}>
          <Center>
            <IconHorse size={16} className={classes.icon} stroke={1.5} />
            <Text size="xs">{car?.horsepower + "hp"}</Text>
          </Center>
          <Center>
            <IconGauge size={16} className={classes.icon} stroke={1.5} />
            <Text size="xs">{car?.maximumSpeed + "km/h"}</Text>
          </Center>
          <Center>
            <IconUsers size={16} className={classes.icon} stroke={1.5} />
            <Text size="xs">{car?.numberOfChairs + " seats"}</Text>
          </Center>
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

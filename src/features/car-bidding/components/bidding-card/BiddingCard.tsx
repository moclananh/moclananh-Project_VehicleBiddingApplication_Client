import { Badge, Button, Card, ColorSwatch, Divider, Group, Image, Stack, Text } from "@mantine/core";
import { IconGauge, IconHorse, IconPalette, IconUsers, IconArchive } from "@tabler/icons-react";
import { statusMapping } from "../../../../constants/ui";
import { IBiddingSession } from "../../types/sessions.type";
import classes from "./BiddingCard.module.css";
import { timeLeft } from "../../../../common/utils";
import { NumericFormat } from "react-number-format";
interface BiddingCardProps {
  session: IBiddingSession | null;
}
const BiddingCard = ({ session }: BiddingCardProps) => {
  if (!session) {
    return null;
  }
  const { vehicles } = session;
  return (
    <Card w="100%" withBorder radius={"md"}>
      <Group>
        <Image radius={"md"} h="200px" miw="300px" className={classes.cardImage} src={vehicles.imageUrl} />
        <Divider orientation="vertical" />
        <Stack gap="sm" flex={1}>
          <Group gap={10}>
            <Text fw={500}>{vehicles.name}</Text>
            <Text c="dimmed" fw={500}>
              -
            </Text>
            <Badge variant="outline" color={statusMapping["InBidding"]}>
              {vehicles.status}
            </Badge>
          </Group>
          <Text fz="sm" c="dimmed">
            {vehicles.brands}
          </Text>
          <Text
            fz="sm"
            c="dimmed"
            fw="500"
            fs="italic"
            style={{
              textTransform: "uppercase",
            }}
          >
            Basic configuration
          </Text>
          <Group gap={24}>
            <Group gap="xs">
              <IconHorse size={20} stroke={1.5} />
              <Text size="md">{vehicles.horsepower + "hp"}</Text>
            </Group>
            <Group gap="xs">
              <IconGauge size={20} stroke={1.5} />
              <Text size="md">{vehicles.maximumSpeed + "km"}</Text>
            </Group>
            <Group gap="xs">
              <IconUsers size={20} stroke={1.5} />
              <Text size="md">{vehicles.numberOfChairs + "seats"}</Text>
            </Group>
            <Group gap="xs">
              <IconArchive size={20} stroke={1.5} />
              <Text size="md">{vehicles.trunkCapacity + "L"}</Text>
            </Group>
            <Group gap="xs">
              <IconPalette size={20} stroke={1.5} />
              <ColorSwatch color={vehicles.color} size={"15"} />
            </Group>
          </Group>
          <Text fs="italic" lineClamp={2}>
            {vehicles.description}
          </Text>
        </Stack>
        <Divider orientation="vertical" />
        <Stack className={classes.cardStatus}>
          <Badge variant="outline" color="yellow" fs="italic">
            {timeLeft(session.startTime, session.endTime)}
          </Badge>
          <Group gap="sm">
            <Text c={"dimmed"} fw="bold" fs="italic">
              Current Value:
            </Text>
            <Text>
              <NumericFormat displayType="text" value={session.highestBidding} suffix="$" />
            </Text>
          </Group>
          <Group gap="sm">
            <Text c={"dimmed"} fw="bold" fs="italic">
              Total bidding:
            </Text>
            <Text>{session.totalBiddingCount}</Text>
          </Group>
          <Button color="blue">Bid Now!!</Button>
        </Stack>
      </Group>
    </Card>
  );
};

export default BiddingCard;

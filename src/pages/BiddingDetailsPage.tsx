import {
  Badge,
  Card,
  ColorSwatch,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Timeline,
  Title,
  Avatar,
} from "@mantine/core";
import {
  IconArchive,
  IconGauge,
  IconHorse,
  IconUsers,
} from "@tabler/icons-react";
import { toString } from "lodash";
import { useParams } from "react-router-dom";
import { statusMapping } from "../constants/ui";
import BiddingForm from "../features/car-bidding/components/bidding-form/BiddingForm";
import {
  useBiddingSessionDetails,
  useBiddingSessionDetailsWithUserState,
} from "../features/car-bidding/hooks/useBiddingSession";
import { handleAxiosError } from "../libs/error";
import { useAuth } from "../features/auth/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

const BiddingDetailsPage = () => {
  const { user } = useAuth();
  const userId = user?.id;
  if (!userId) {
    console.error(
      "User ID not found in local storage or user object is invalid."
    );
    throw new Error("User ID is required to fetch the report.");
  }

  const { sessionId } = useParams();
  // MUST BE CHANGES TO useBiddingSessionDetailsWithUserState
  const { data: responseData, error } = useBiddingSessionDetails(
    toString(sessionId)
  );
  const biddingDetails = responseData?.data ?? null;
  console.log(biddingDetails);
  if (error) {
    handleAxiosError(error);
  }

  return (
    <Group grow align="flex-start">
      {/* Left section */}
      <Stack flex={1}>
        <Group align="flex-start" grow>
          {/* Car Image Section */}

          {/* Vehicle Information Section */}
          <Card withBorder radius="md" p="md" style={{ flexBasis: "60%" }}>
            <Stack gap="xs">
              <Title order={3}>{biddingDetails?.vehicles?.name}</Title>
              <Badge
                variant="outline"
                color={
                  statusMapping[biddingDetails?.vehicles?.status ?? "Default"]
                }
              >
                {biddingDetails?.vehicles?.status}
              </Badge>
              <Group>
                <Text c="dimmed">Brand:</Text>
                <Text c="dimmed">{biddingDetails?.vehicles?.brands}</Text>
              </Group>
              <Text>{biddingDetails?.vehicles?.description}</Text>

              <Text fz="h2" fs="italic">
                Specification
              </Text>
              <SimpleGrid cols={2} w="50%">
                <Stack>
                  <Group>
                    <IconUsers size={16} />
                    <Text size="sm">
                      {biddingDetails?.vehicles?.numberOfChairs} passengers
                    </Text>
                  </Group>
                  <Group>
                    <IconHorse size={16} />
                    <Text size="sm">
                      {biddingDetails?.vehicles?.horsepower} horsepower
                    </Text>
                  </Group>
                </Stack>
                <Stack>
                  <Group>
                    <IconGauge size={16} />
                    <Text size="sm">
                      {biddingDetails?.vehicles?.maximumSpeed} km/h max speed
                    </Text>
                  </Group>
                  <Group>
                    <IconArchive size={16} />
                    <Text size="sm">
                      {biddingDetails?.vehicles?.trunkCapacity} L trunk capacity
                    </Text>
                  </Group>
                </Stack>
              </SimpleGrid>
              <Group mt="md">
                <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                  ${biddingDetails?.vehicles.price.toFixed(2)}
                </Text>
                <Group>
                  <Text>Color:</Text>
                  <ColorSwatch
                    color={biddingDetails?.vehicles.color ?? "white"}
                    size={20}
                  />
                </Group>
              </Group>
            </Stack>
          </Card>
        </Group>

        {/* Bidding Form Section */}
        <BiddingForm
          highestBidding={biddingDetails?.highestBidding}
          minimumJumpingValue={biddingDetails?.minimumJumpingValue}
        />
      </Stack>

      {/* Right Section */}
      <Stack style={{ flexBasis: "40%" }}>
        <Title>Top 10 Biddings</Title>
        <Timeline
          active={biddingDetails?.biddings?.length - 1}
          bulletSize={26}
          lineWidth={2}
        >
          {biddingDetails?.biddings?.map((bidding, index) => (
            <Timeline.Item
              key={index}
              title={bidding.user.id === userId ? "You" : bidding.user.userName}
              bullet={
                <Avatar color="white" radius="sm">
                  {bidding.user.id === userId
                    ? "Y"
                    : bidding.user.userName[0].toUpperCase()}
                </Avatar>
              }
            >
              <Text c="dimmed" size="sm">
                {bidding.user.id === userId
                  ? `You bid $${bidding.userCurrentBidding}.`
                  : `User ${bidding.user.userName} bid $${bidding.userCurrentBidding}.`}
              </Text>
              <Text size="xs" mt={4}>
                {formatDistanceToNow(new Date(bidding.biddingAt), {
                  addSuffix: true,
                })}
              </Text>
              {bidding.isWinner && (
                <Badge color="green" variant="light">
                  Winning
                </Badge>
              )}
            </Timeline.Item>
          ))}
        </Timeline>
      </Stack>
    </Group>
  );
};

export default BiddingDetailsPage;

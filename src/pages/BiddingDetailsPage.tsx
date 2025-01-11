import { Badge, Card, ColorSwatch, Container, Group, Image, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { IconArchive, IconGauge, IconHorse, IconUsers } from "@tabler/icons-react";
import { toString } from "lodash";
import { useParams } from "react-router-dom";
import { statusMapping } from "../constants/ui";
import { useAuth } from "../features/auth/hooks/useAuth";
import BiddingForm from "../features/car-bidding/components/bidding-form/BiddingForm";
import BiddingHistory from "../features/car-bidding/components/bidding-history/BiddingHistory";
import { useBiddingSessionDetailsWithUserState } from "../features/car-bidding/hooks/useBiddingSession";
import { handleAxiosError } from "../libs/error";

const BiddingDetailsPage = () => {
  const { user } = useAuth();
  const { sessionId } = useParams();
  const { data: responseData, error } = useBiddingSessionDetailsWithUserState(toString(user?.id), toString(sessionId));
  const biddingDetails = responseData?.data ?? null;
  if (error) {
    handleAxiosError(error);
  }

  return (
    <Container size="xl">
      <Group grow align="flex-start">
        {/* Left section */}
        <Stack>
          <Image radius={"md"} src={biddingDetails?.vehicles?.imageUrl} alt={biddingDetails?.vehicles?.name} />
          <Title>Bidding History</Title>
          {/*  History */}
          <BiddingHistory biddingHistory={biddingDetails?.biddings ?? []} />
        </Stack>
        {/* Right Section */}
        <Stack flex={1}>
          {/* Information Card */}
          <Card withBorder radius="md" p="md">
            <Stack gap="xs">
              <Title order={3}>{biddingDetails?.vehicles?.name}</Title>
              <Badge variant="outline" color={statusMapping[biddingDetails?.vehicles?.status ?? "Default"]}>
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
              <SimpleGrid cols={2} w="100%">
                <Stack>
                  <Group wrap="nowrap">
                    <IconUsers size={16} />
                    <Text size="sm">{biddingDetails?.vehicles?.numberOfChairs} passengers</Text>
                  </Group>
                  <Group wrap="nowrap">
                    <IconHorse size={16} />
                    <Text size="sm">{biddingDetails?.vehicles?.horsepower} horsepower</Text>
                  </Group>
                </Stack>
                <Stack>
                  <Group wrap="nowrap">
                    <IconGauge size={16} />
                    <Text size="sm">{biddingDetails?.vehicles?.maximumSpeed} km/h max speed</Text>
                  </Group>
                  <Group wrap="nowrap">
                    <IconArchive size={16} />
                    <Text size="sm">{biddingDetails?.vehicles?.trunkCapacity} L trunk capacity</Text>
                  </Group>
                </Stack>
              </SimpleGrid>
              <Group mt="md">
                <Text fz="xl" fw={700} style={{ lineHeight: 1 }}>
                  ${biddingDetails?.vehicles.price.toFixed(2)}
                </Text>
                <Group>
                  <Text>Color:</Text>
                  <ColorSwatch color={biddingDetails?.vehicles.color ?? "white"} size={20} />
                </Group>
              </Group>
            </Stack>
          </Card>
          <BiddingForm
            highestBidding={biddingDetails?.highestBidding}
            minimumJumpingValue={biddingDetails?.minimumJumpingValue}
            currentUserBidding={biddingDetails?.userBiddingState}
          />
        </Stack>
      </Group>
    </Container>
  );
};

export default BiddingDetailsPage;

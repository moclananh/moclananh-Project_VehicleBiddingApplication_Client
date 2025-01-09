import { Badge, Card, ColorSwatch, Group, Image, SimpleGrid, Stack, Text, Timeline, Title } from "@mantine/core";
import { IconArchive, IconGauge, IconGitBranch, IconGitCommit, IconGitPullRequest, IconHorse, IconMessageDots, IconUsers } from "@tabler/icons-react";
import { toString } from "lodash";
import { useParams } from "react-router-dom";
import { statusMapping } from "../constants/ui";
import BiddingForm from "../features/car-bidding/components/bidding-form/BiddingForm";
import { useBiddingSessionDetails } from "../features/car-bidding/hooks/useBiddingSession";
import { handleAxiosError } from "../libs/error";

const BiddingDetailsPage = () => {
  const { sessionId } = useParams();
  const { data: responseData, error } = useBiddingSessionDetails(toString(sessionId));
  const biddingDetails = responseData?.data ?? null;
  if (error) {
    handleAxiosError(error);
  }

  return (
    <Group grow align="flex-start">
      {/* Left section */}
      <Stack style={{ flexBasis: "40%" }}>
        <Image radius={"md"} src={biddingDetails?.vehicles?.imageUrl} alt={biddingDetails?.vehicles?.name} />
        <Title>Bidding History</Title>
        {/*  History */}
        <Timeline active={1} bulletSize={24} lineWidth={2}>
          <Timeline.Item bullet={<IconGitBranch size={12} />} title="New branch">
            <Text c="dimmed" size="sm">
              You&apos;ve created new branch{" "}
              <Text variant="link" component="span" inherit>
                fix-notifications
              </Text>{" "}
              from master
            </Text>
            <Text size="xs" mt={4}>
              2 hours ago
            </Text>
          </Timeline.Item>

          <Timeline.Item bullet={<IconGitCommit size={12} />} title="Commits">
            <Text c="dimmed" size="sm">
              You&apos;ve pushed 23 commits to
              <Text variant="link" component="span" inherit>
                fix-notifications branch
              </Text>
            </Text>
            <Text size="xs" mt={4}>
              52 minutes ago
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Pull request" bullet={<IconGitPullRequest size={12} />} lineVariant="dashed">
            <Text c="dimmed" size="sm">
              You&apos;ve submitted a pull request
              <Text variant="link" component="span" inherit>
                Fix incorrect notification message (#187)
              </Text>
            </Text>
            <Text size="xs" mt={4}>
              34 minutes ago
            </Text>
          </Timeline.Item>

          <Timeline.Item title="Code review" bullet={<IconMessageDots size={12} />}>
            <Text c="dimmed" size="sm">
              <Text variant="link" component="span" inherit>
                Robert Gluesticker
              </Text>{" "}
              left a code review on your pull request
            </Text>
            <Text size="xs" mt={4}>
              12 minutes ago
            </Text>
          </Timeline.Item>
        </Timeline>
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
            <SimpleGrid cols={2} w="50%">
              <Stack>
                <Group>
                  <IconUsers size={16} />
                  <Text size="sm">{biddingDetails?.vehicles?.numberOfChairs} passengers</Text>
                </Group>
                <Group>
                  <IconHorse size={16} />
                  <Text size="sm">{biddingDetails?.vehicles?.horsepower} horsepower</Text>
                </Group>
              </Stack>
              <Stack>
                <Group>
                  <IconGauge size={16} />
                  <Text size="sm">{biddingDetails?.vehicles?.maximumSpeed} km/h max speed</Text>
                </Group>
                <Group>
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
        <BiddingForm highestBidding={biddingDetails?.highestBidding} minimumJumpingValue={biddingDetails?.minimumJumpingValue} />
      </Stack>
    </Group>
  );
};

export default BiddingDetailsPage;

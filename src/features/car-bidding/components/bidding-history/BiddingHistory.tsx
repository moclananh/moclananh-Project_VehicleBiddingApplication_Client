import { Avatar, Badge, Group, Text, Timeline } from "@mantine/core";
import { formatDistanceToNow, isValid } from "date-fns";
import { defaultTo, isEmpty, isEqual } from "lodash";
import { useAuth } from "../../../auth/hooks/useAuth";
import { IBidding } from "../../types/sessions.type";

interface BiddingHistoryProps {
  biddingHistory: IBidding[];
}
const HistoryTitle = ({ title, isWinner, currentUserId, userId }: { title?: string; isWinner: boolean; currentUserId?: string; userId?: string }) => {
  const isCurrentUser = isEqual(currentUserId, userId);
  return (
    <Group>
      <Text size="xs">
        {defaultTo(title, "Unknown user")}
        {isCurrentUser && " (You)"}
      </Text>
      {isWinner && (
        <Badge color="green" variant="light">
          Winner
        </Badge>
      )}
    </Group>
  );
};
const BiddingHistory = ({ biddingHistory }: BiddingHistoryProps) => {
  const { user } = useAuth();
  if (isEmpty(biddingHistory)) {
    return (
      <Text c="dimmed" size="sm">
        No Bidding History Found
      </Text>
    );
  }
  return (
    <Timeline active={biddingHistory.length} bulletSize={30} color="white" lineWidth={4}>
      {biddingHistory.map((bidding, index) => (
        <Timeline.Item
          key={index}
          bullet={<Avatar name={defaultTo(bidding.user?.userName, "Unknown user")} size="32" color="initials" radius="xl" />}
          title={<HistoryTitle currentUserId={user?.id} userId={bidding.userId} title={bidding.user?.userName} isWinner={bidding.isWinner} />}
        >
          <Text c="dimmed" size="sm">
            {bidding.userCurrentBidding}$
          </Text>
          <Text size="xs" mt={4}>
            {formatDistanceToNow(isValid(new Date(bidding.biddingAt)) ? new Date(bidding.biddingAt) : new Date(), { addSuffix: true })}
          </Text>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};

export default BiddingHistory;

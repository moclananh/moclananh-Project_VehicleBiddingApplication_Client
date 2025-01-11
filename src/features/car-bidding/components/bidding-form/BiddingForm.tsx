import { Button, Card, Divider, Group, NumberInput, Stack, Text } from "@mantine/core";
import { IconArrowBounce, IconCurrencyDollar, IconHandFingerDown, IconMathMaxMin } from "@tabler/icons-react";
import { defaultTo, toNumber } from "lodash";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../auth/hooks/useAuth";
import { IBidding } from "../../types/sessions.type";
export interface BiddingFormProps {
  highestBidding?: number;
  minimumJumpingValue?: number;
  currentUserBidding?: IBidding;
}
const BiddingForm = ({ highestBidding = 0, minimumJumpingValue = 0, currentUserBidding }: BiddingFormProps) => {
  const { user } = useAuth();
  const [biddingValue, setBiddingValue] = useState<number>(highestBidding + minimumJumpingValue);
  const handleBidding = () => {
    if (biddingValue > defaultTo(user?.budget, 0)) {
      open();
    } else {
      toast.success("Successfully Bidded");
    }
  };
  useEffect(() => {
    setBiddingValue(highestBidding + minimumJumpingValue);
  }, [highestBidding, minimumJumpingValue]);
  return (
    <Card
      withBorder
      radius="md"
      p="md"
      style={{
        gap: "15px",
      }}
    >
      <Group gap="md">
        <Group>
          <IconArrowBounce size={25} />
          <Text size="lg" fs="italic" fw="500">
            Jumping value: ${minimumJumpingValue}
          </Text>
        </Group>
        <Divider orientation="vertical" />
        <Group gap="sm">
          <IconMathMaxMin size={25} />
          <Text size="lg" fs="italic" fw="500">
            Highest Bidding: ${highestBidding}
          </Text>
        </Group>
      </Group>

      <Group gap="sm">
        <Text size="lg" fs="italic" fw="500">
          Enter your bidding here
        </Text>
        <IconHandFingerDown size={25} />
      </Group>
      <NumberInput
        min={highestBidding + minimumJumpingValue}
        error={biddingValue < highestBidding + minimumJumpingValue ? "Bidding value is less than the highest bidding value" : ""}
        step={minimumJumpingValue}
        leftSection={<IconCurrencyDollar size={20} />}
        value={biddingValue}
        prefix="$"
        onChange={(value) => {
          setBiddingValue(toNumber(value));
        }}
      />
      <Group>
        <Stack gap="0">
          <Text fz="lg">Your next bid</Text>
          <Text fz="h2">
            <b>${biddingValue}</b>
          </Text>
        </Stack>
        <Divider orientation="vertical" />
        <Stack gap="0">
          <Text fz="lg">Your max bid</Text>
          <Text fz="h2">
            <b>${currentUserBidding?.userCurrentBidding}</b>
          </Text>
        </Stack>
      </Group>
      <Button onClick={handleBidding} fullWidth>
        Bid
      </Button>
    </Card>
  );
};

export default BiddingForm;

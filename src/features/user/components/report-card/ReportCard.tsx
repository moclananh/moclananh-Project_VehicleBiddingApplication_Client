import { Badge, Card, Group, Image, Stack, Text } from "@mantine/core";
import classes from "./ReportCard.module.css";
import { IReport } from "../../types/report.type";

interface ReportCardProps {
  report?: IReport;
}

export function ReportCard({ report }: ReportCardProps) {
  return (
    <Card withBorder radius="md" className={classes.card}>
      {/* Image Section */}
      <Card.Section className={classes.imageSection}>
        <Image
          h={"100%"}
          w={"100%"}
          src={report?.imageUrl || "/placeholder-image.png"} // Fallback image
          alt={report?.vehicleName || "Vehicle Image"}
        />
      </Card.Section>

      {/* Vehicle and Bidding Details */}
      <Stack mt="md">
        <Text fw={500}>{report?.vehicleName || "Unknown Vehicle"}</Text>
        <Text fz="sm" c="dimmed">VIN: {report?.vin || "N/A"}</Text>
       

        {/* Bidding Details */}
        
        <Text fz="sm">
          Bidding Value: ${report?.userCurrentBidding || 0}
        </Text>

        {/* Status Information */}
        <Group >
          <Badge color={report?.isWinner ? "green" : "red"}>
            {report?.isWinner ? "Winner" : "Defeated"}
          </Badge>
          <Badge color={report?.isClosed ? "gray" : "blue"}>
            {report?.isClosed ? "Closed" : "In Bidding"}
          </Badge>
        </Group>

        {/* Session Timing */}
        <Text fz="sm">
          Start Time: {report?.startTime ? new Date(report.startTime).toLocaleString() : "N/A"}
        </Text>
        <Text fz="sm">
          End Time: {report?.endTime ? new Date(report.endTime).toLocaleString() : "N/A"}
        </Text>
        <Text fz="sm">
          Bidding At: {report?.biddingAt ? new Date(report.biddingAt).toLocaleString() : "N/A"}
        </Text>
      </Stack>
    </Card>
  );
}
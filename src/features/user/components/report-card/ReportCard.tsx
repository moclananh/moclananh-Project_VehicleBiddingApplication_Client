import { Badge, Group, Image, Text } from "@mantine/core";
import { IReport } from "../../types/report.type";

interface ReportCardProps {
  report?: IReport;
}

export function ReportCard({ report }: ReportCardProps) {
  if (!report) return null;

  return (
    <tr style={{ borderBottom: "1px solid #eaeaea" }}>
      <td>
        <Group>
          <Image
            src={report.imageUrl || "https://via.placeholder.com/100"}
            alt={report.vehicleName || "Unknown Vehicle"}
            width={80}
            height={80}
            radius="md"
            fit="cover" // Ensures the image fills the space while maintaining its aspect ratio
          />
          <Text fw={500}>{report.vehicleName || "Unknown Vehicle"}</Text>
        </Group>
      </td>

      <td>
        <Text fz="sm" c="dimmed">
          {report.vin || "N/A"}
        </Text>
      </td>
      <td>
        <Badge color={report.isClosed ? "gray" : "blue"} variant="light">
          {report.isClosed ? "Closed" : "In Bidding"}
        </Badge>
      </td>
      <td>
        <Text fw={500} color="teal">
          ${report.userCurrentBidding || 0}
        </Text>
      </td>
      <td>
        <Badge color={report.isWinner ? "green" : "red"} variant="filled">
          {report.isWinner ? "Winner" : "Defeated"}
        </Badge>
      </td>
      <td>
        <Text fz="sm">
          {report.biddingAt
            ? new Date(report.biddingAt).toLocaleString()
            : "N/A"}
        </Text>
      </td>
    </tr>
  );
}

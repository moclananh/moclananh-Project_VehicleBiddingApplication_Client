import { Avatar, Badge } from "@mantine/core";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, type MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";
import { useReport } from "../features/user/hooks/useReport";
import { IReport } from "../features/user/types/report.type";

const ReportPage = () => {
  // Hooks to manage filter and fetch data

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const {
    data: responseData,
    isLoading,
    isError,
    isFetching,
  } = useReport({
    pageNumber: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });
  const totalItems = responseData?.data.totalItems ?? 0;
  const report = responseData?.data.items ?? [];
  const columns = useMemo<MRT_ColumnDef<IReport>[]>(
    () => [
      {
        accessorKey: "vehicleName",
        header: "Vehicle Name",
      },
      {
        accessorKey: "imageUrl",
        header: "Image",
        Cell: ({ cell }) => <Avatar src={cell.getValue<string>()} alt={cell.getValue<string>()} size={"lg"} radius={"md"} />,
      },
      {
        accessorKey: "vin",
        header: "VIN",
      },
      {
        accessorKey: "isWinner",
        header: "Bidding Result",
        Cell: ({ cell }) => <Badge color={cell.getValue<boolean>() ? "green" : "red"}>{cell.getValue<boolean>() ? "Win" : "Lose"}</Badge>,
      },
      {
        accessorKey: "biddingAt",
        header: "Bidding At",
        Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleString(),
      },
      {
        accessorKey: "isClosed",
        header: "Status",
        Cell: ({ cell }) => (
          <Badge color={cell.getValue<boolean>() ? "gray" : "blue"} variant="outline">
            {cell.getValue<boolean>() ? "Closed" : "In Bidding"}
          </Badge>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    manualPagination: true,
    columns,
    data: report,
    mantineToolbarAlertBannerProps: isError
      ? {
          color: "red",
          children: "Error loading data",
        }
      : undefined,
    state: {
      isLoading,
      pagination,

      showAlertBanner: isError,
      showProgressBars: isFetching,
    },

    onPaginationChange: setPagination,
    rowCount: totalItems,
  });

  return (
    <div>
      <MantineReactTable table={table} />
    </div>
  );
};

export default ReportPage;

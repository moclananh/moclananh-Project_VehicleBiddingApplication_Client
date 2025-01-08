import { Container, Pagination, Stack } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { calculateTotalPage } from "../common/utils";
import { GlobalFilter } from "../constants/ui";
import BiddingCard from "../features/car-bidding/components/bidding-card/BiddingCard";
import { useBiddingSession } from "../features/car-bidding/hooks/useBiddingSession";

const BiddingSessionPage = () => {
  const { data: responseData } = useBiddingSession(GlobalFilter.DEFAULT_SESSION_FILTER);
  const totalItems = responseData?.data.totalItems ?? GlobalFilter.DEFAULT_TOTAL_ITEM;
  const pageSize = responseData?.data.pageSize ?? GlobalFilter.DEFAULT_PAGE_SIZE;
  const totalPages = calculateTotalPage(totalItems, pageSize);
  const sessions = responseData?.data.items ?? [];
  console.log(sessions);
  const pagination = usePagination({
    total: totalPages,
    initialPage: 1,
  });
  return (
    <Container size={"xl"}>
      <Stack align="center">
        {sessions.map((session) => (
          <BiddingCard key={session.id} session={session} />
        ))}
        <Pagination total={totalPages} radius="xl" onChange={pagination.setPage} onNextPage={pagination.next} onPreviousPage={pagination.previous} />
      </Stack>
    </Container>
  );
};

export default BiddingSessionPage;

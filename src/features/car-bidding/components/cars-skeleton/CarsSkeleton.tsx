import { Paper, SimpleGrid, Skeleton } from "@mantine/core";

const CarsSkeleton = () => {
  return (
    <SimpleGrid cols={4}>
      <Paper shadow="xl" withBorder radius="md" p="sm">
        <Skeleton height={"200px"} radius="xl" />
        <Skeleton height={10} mt={15} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} width="70%" radius="xl" />
      </Paper>
      <Paper shadow="xl" withBorder radius="md" p="sm">
        <Skeleton height={"200px"} radius="xl" />
        <Skeleton height={10} mt={15} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} width="70%" radius="xl" />
      </Paper>
      <Paper shadow="xl" withBorder radius="md" p="sm">
        <Skeleton height={"200px"} radius="xl" />
        <Skeleton height={10} mt={15} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} width="70%" radius="xl" />
      </Paper>
      <Paper shadow="xl" withBorder radius="md" p="sm">
        <Skeleton height={"200px"} radius="xl" />
        <Skeleton height={10} mt={15} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} width="70%" radius="xl" />
      </Paper>
      <Paper shadow="xl" withBorder radius="md" p="sm">
        <Skeleton height={"200px"} radius="xl" />
        <Skeleton height={10} mt={15} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} width="70%" radius="xl" />
      </Paper>
      <Paper shadow="xl" withBorder radius="md" p="sm">
        <Skeleton height={"200px"} radius="xl" />
        <Skeleton height={10} mt={15} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} radius="xl" />
        <Skeleton height={10} mt={6} width="70%" radius="xl" />
      </Paper>
    </SimpleGrid>
  );
};

export default CarsSkeleton;

import { Button, Group, Popover, TextInput } from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";

export interface IFilter {
  name: string | null;
  brands: string | null;
  vin: string | null;
  color: string | null;
  status: string | null;
  pageNumber: number | null;
  pageSize: number | null;
}

const VehicleFilter = () => {
  return (
    <Group px="lg">
      <TextInput leftSection={<IconSearch />} placeholder="Search" radius={"lg"} w="300px" />

      <Popover width={300} trapFocus position="bottom-start" withArrow shadow="md">
        <Popover.Target>
          <Button rightSection={<IconFilter />} radius={"lg"}>
            Filter
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <TextInput label="Name" placeholder="Name" size="xs" />
          <TextInput label="Email" placeholder="john@doe.com" size="xs" mt="xs" />
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default VehicleFilter;

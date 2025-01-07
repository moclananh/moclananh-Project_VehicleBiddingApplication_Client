import { Box, Button, Group, Popover, Select, SimpleGrid, TextInput } from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { brandOptions, statusOptions } from "../../../../constants/ui";
import { IVehicleFilter } from "../../types/cars.type";

export interface VehicleFilterProps {
  onSearchChange: (search: string) => void;
  onFilterChange: (filter: Partial<IVehicleFilter>) => void;
  onClearFilter: () => void;
  filter: Partial<IVehicleFilter>;
}

const VehicleFilter = ({ onSearchChange, filter, onFilterChange, onClearFilter }: VehicleFilterProps) => {
  return (
    <Group>
      <TextInput
        leftSection={<IconSearch />}
        value={filter.name ?? ""}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search"
        radius={"lg"}
        w="300px"
      />

      <Popover width={600} trapFocus position="bottom-start" withArrow shadow="md">
        <Popover.Target>
          <Button rightSection={<IconFilter />} radius={"lg"}>
            Filter
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <SimpleGrid cols={2}>
            <Box onMouseDown={(e) => e.stopPropagation()}>
              <Select
                label="Status"
                value={filter.status ?? null}
                clearable
                onChange={(value) => {
                  onFilterChange({ ...filter, status: value });
                }}
                placeholder="Select car status"
                size="md"
                data={statusOptions}
              />

              <Select
                label="Brands"
                value={filter.brands ?? null}
                clearable
                onChange={(value) => onFilterChange({ ...filter, brands: value })}
                data={brandOptions}
                placeholder="Select a brand"
                size="md"
              />
            </Box>
            <Box onMouseDown={(e) => e.stopPropagation()}>
              <TextInput
                label="VIN"
                value={filter.vin ?? ""}
                onChange={(e) => onFilterChange({ ...filter, vin: e.target.value })}
                placeholder="Enter VIN"
                size="md"
              />
              <TextInput
                value={filter.color ?? ""}
                label="Color"
                onChange={(e) => onFilterChange({ ...filter, color: e.target.value })}
                placeholder="Enter Color"
                size="md"
              />
            </Box>
          </SimpleGrid>

          <Button radius="md" fullWidth onClick={() => onClearFilter()} variant="outline" mt="md">
            Clear
          </Button>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default VehicleFilter;

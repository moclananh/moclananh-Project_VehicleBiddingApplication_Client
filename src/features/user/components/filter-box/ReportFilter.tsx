import { Box, Button, Group, Popover, Select, SimpleGrid, TextInput } from "@mantine/core";
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { IconFilter, IconSearch } from "@tabler/icons-react";

export interface IFilter {
  isWinner: boolean | null;
  startTime: Date | null;
  endTime: Date | null;
  isClosed: boolean | null;
  vehicleName: string | null;
  vin: string | null;
  pageNumber: number | null;
  pageSize: number | null;
}

export interface IReportFilter {
  onSearchChange: (search: string) => void;
  onFilterChange: (filter: Partial<IFilter>) => void;
  onClearFilter: () => void;
  filter: Partial<IFilter>;
}

const ReportFilter = ({ onSearchChange, filter, onFilterChange, onClearFilter }: IReportFilter) => {
  return (
    <Group>
      {/* Search Field */}
      <TextInput
        leftSection={<IconSearch />}
        value={filter.vehicleName ?? ""}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by Vehicle Name"
        radius={"lg"}
        w="300px"
      />

      {/* Filter Dropdown */}
      <Popover width={700} trapFocus position="bottom-start" withArrow shadow="md">
        <Popover.Target>
          <Button rightSection={<IconFilter />} radius={"lg"}>
            Filter
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <SimpleGrid cols={2} spacing="md">
            {/* Column 1 */}
            <Box>
              <Select
                label="Winner Status"
                value={filter.isWinner !== undefined && filter.isWinner !== null ? filter.isWinner.toString() : ""}
                onChange={(value: string | null) => {
                  onFilterChange({ isWinner: value === null ? null : value === "true" });
                }}
                placeholder="Select Winner Status"
                size="md"
                data={[
                  { value: "true", label: "Winner" },
                  { value: "false", label: "Not Winner" },
                ]}
                clearable
              />
              <DatePickerInput
                label="Start Time"
                value={filter.startTime || null}
                onChange={(value: Date | null) => onFilterChange({ startTime: value })}
                placeholder="Select Start Date"
                size="md"
              />
            </Box>

            {/* Column 2 */}
            <Box>
              <Select
                label="Closed Status"
                value={filter.isClosed !== undefined && filter.isClosed !== null ? filter.isClosed.toString() : ""}
                onChange={(value: string | null) => {
                  onFilterChange({ isClosed: value === null ? null : value === "true" });
                }}
                placeholder="Select Closed Status"
                size="md"
                data={[
                  { value: "true", label: "Closed" },
                  { value: "false", label: "Open" },
                ]}
                clearable
              />
              <DatePickerInput
                label="End Time"
                value={filter.endTime || null}
                onChange={(value: Date | null) => onFilterChange({ endTime: value })}
                placeholder="Select End Date"
                size="md"
              />
            </Box>

            {/* Column 3 */}
            <Box>
              <TextInput
                label="VIN"
                value={filter.vin ?? ""}
                onChange={(e) => onFilterChange({ vin: e.target.value })}
                placeholder="Enter VIN"
                size="md"
              />
            </Box>
          </SimpleGrid>

          <Button radius="md" fullWidth onClick={() => onClearFilter()} variant="outline" mt="md">
            Clear Filters
          </Button>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default ReportFilter;

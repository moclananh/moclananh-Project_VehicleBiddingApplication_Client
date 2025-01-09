import {
  Box,
  Button,
  Group,
  Popover,
  Select,
  SimpleGrid,
  TextInput,
  Text,
} from "@mantine/core";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import { brandOptions, statusOptions } from "../../../../constants/ui";
import { IUserBiddingFilter } from "../../types/sessions.type";
import { DateInput } from "@mantine/dates";

export interface SessionFilterProps {
  onSearchChange: (search: string) => void;
  onFilterChange: (filter: Partial<IUserBiddingFilter>) => void;
  onClearFilter: () => void;
  filter: Partial<IUserBiddingFilter>;
}

const SessionFilter = ({
  onSearchChange,
  filter,
  onFilterChange,
  onClearFilter,
}: SessionFilterProps) => {
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

      <Popover
        width={600}
        trapFocus
        position="bottom-start"
        withArrow
        shadow="md"
      >
        <Popover.Target>
          <Button rightSection={<IconFilter />} radius={"lg"}>
            Filter
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <SimpleGrid cols={2}>
            <Box onMouseDown={(e) => e.stopPropagation()}>
              <Select
                label="Brand"
                value={filter.brand ?? null}
                clearable
                onChange={(value) =>
                  onFilterChange({ ...filter, brand: value })
                }
                data={brandOptions}
                placeholder="Select a brand"
                size="md"
              />
            </Box>
            <Box onMouseDown={(e) => e.stopPropagation()}>
              <TextInput
                label="VIN"
                value={filter.VIN ?? ""}
                onChange={(e) =>
                  onFilterChange({ ...filter, VIN: e.target.value })
                }
                placeholder="Enter VIN"
                size="md"
              />
            </Box>
            <Box onMouseDown={(e) => e.stopPropagation()}>
              <DateInput
                label="Start Time"
                value={filter.startTime}
                onChange={(value) =>
                  onFilterChange({ ...filter, startTime: value })
                }
                placeholder="Select start time"
                size="md"
              />
            </Box>
            <Box onMouseDown={(e) => e.stopPropagation()}>
              <DateInput
                label="End Time"
                value={filter.endTime}
                onChange={(value) =>
                  onFilterChange({ ...filter, endTime: value })
                }
                placeholder="Select end time"
                size="md"
              />
            </Box>
          </SimpleGrid>

          <Button
            radius="md"
            fullWidth
            onClick={() => onClearFilter()}
            variant="outline"
            mt="md"
          >
            Clear
          </Button>
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};

export default SessionFilter;

import React from "react";
import classes from "./UserCard.module.css";
import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

const UserCard = () => {
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar name="Quoc Viet" radius="xl" color="initials" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Viet Dai Bang
          </Text>

          <Text c="dimmed" size="xs">
            quocviet@gmail.com
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
};

export default UserCard;

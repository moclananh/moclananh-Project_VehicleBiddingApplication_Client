import React from "react";
import classes from "./UserCard.module.css";
import { UnstyledButton, Group, Avatar, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useAuth } from "../../features/auth/hooks/useAuth";

const UserCard = () => {
  const { user } = useAuth();
  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar name={user?.userName} radius="xl" color="initials" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user?.userName}
          </Text>

          <Text c="dimmed" size="xs">
            {user?.email}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
};

export default UserCard;

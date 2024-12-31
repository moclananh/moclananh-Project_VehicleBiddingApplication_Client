import { AppShell, Box, Burger, Button, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCar, IconLogin } from "@tabler/icons-react";
import { Link, Outlet } from "react-router-dom";
export function RootLayout() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell padding={0} header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Group justify="space-between" style={{ flex: 1 }}>
            <Group
              style={{
                cursor: "pointer",
              }}
            >
              <Box
                h="50px"
                w="50px"
                bg={"pale-blue"}
                style={{
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconCar color="white" size={35} />
              </Box>
              <Title order={2}>Car bidding</Title>
            </Group>
            <Group gap="md">
              <Button variant="subtle">Home</Button>
              <Button variant="subtle">Pricing</Button>
              <Button variant="subtle">About</Button>
              <Button variant="subtle">Support</Button>
            </Group>

            <Group ml="xl" gap={20} visibleFrom="sm">
              <Button component={Link} to={"/auth?form=login"} radius="xl" rightSection={<IconLogin />}>
                Get Started
              </Button>
            </Group>
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}></AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

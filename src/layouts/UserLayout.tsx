import { AppShell, Button, Divider, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBasketDollar,
  IconCar,
  IconLogout,
  IconReport,
} from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";
import NavButton from "../components/nav-button/NavButton";
import UserCard from "../components/user-card/UserCard";
import { useAuth } from "../features/auth/hooks/useAuth";
const NAV_LINKS = [
  {
    label: "Cars",
    to: "/dashboard/cars",
    icon: IconCar,
  },
  {
    label: "Session",
    to: "/dashboard/sessions",
    icon: IconBasketDollar,
  },
  {
    label: "Report",
    to: "/dashboard/report",
    icon: IconReport,
  },
];
const UserLayout = () => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { removeUserState } = useAuth();
  const navigate = useNavigate();
  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Navbar>
        <UserCard />
        <Divider />
        <Stack flex={1} pb="sm" p="sm" justify="space-between">
          <Stack>
            {NAV_LINKS.map((link) => (
              <NavButton
                justify="start"
                fontSize="md"
                fullWidth
                to={link.to}
                key={link.label}
                startIcon={<link.icon size={25} stroke={1.5} />}
              >
                {link.label}
              </NavButton>
            ))}
          </Stack>
          <Button
            onClick={() => {
              removeUserState();
              navigate("/");
            }}
            color="red"
            c="white"
            rightSection={<IconLogout />}
            fullWidth
          >
            Logout
          </Button>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main bg="#F5F5F5">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default UserLayout;

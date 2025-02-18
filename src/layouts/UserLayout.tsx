import { AppShell, Button, Divider, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBasketDollar, IconCar, IconLogout, IconReport } from "@tabler/icons-react";
import { Outlet, useNavigate } from "react-router-dom";
import NavButton from "../components/nav-button/NavButton";
import UserCard from "../components/user-card/UserCard";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import SignalRService from "../services/signalr.service";
import { SIGNALR_ENDPOINT } from "../constants/endpoint";
import { useEffect } from "react";
import { BiddingEvents } from "../constants/socket";
const signalRService = new SignalRService(SIGNALR_ENDPOINT);
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
  const queryClient = useQueryClient();
  const [opened] = useDisclosure();
  const { removeUserState } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    signalRService.startConnection().then(() => {
      signalRService.on(BiddingEvents.SessionList, (data) => {
        console.log(data);
        queryClient.invalidateQueries({
          queryKey: ["sessions"],
        });
      });
    });
    return () => {
      signalRService.stopConnection();
    };
  }, []);
  return (
    <AppShell navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }} padding="md">
      <AppShell.Navbar>
        <UserCard />
        <Divider />
        <Stack flex={1} pb="sm" p="sm" justify="space-between">
          <Stack>
            {NAV_LINKS.map((link) => (
              <NavButton justify="start" fontSize="md" fullWidth to={link.to} key={link.label} startIcon={<link.icon size={25} stroke={1.5} />}>
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

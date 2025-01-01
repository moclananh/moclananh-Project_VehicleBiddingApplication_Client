import { RouteObject } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import UserLayout from "./layouts/UserLayout";
import CarsPage from "./pages/CarsPage";
import BiddingSessionPage from "./pages/BiddingSessionPage";

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    path: "/",
    children: [
      {
        element: <LandingPage />,
        path: "",
      },
      {
        element: <AuthPage />,
        path: "auth",
      },
    ],
  },
  {
    path: "/dashboard",
    element: <UserLayout />,
    children: [
      {
        path: "cars",
        element: <CarsPage />,
      },
      {
        path: "sessions",
        element: <BiddingSessionPage />,
      },
      {
        path: "report",
        element: <div>Report</div>,
      },
    ],
  },
];

export default routes;

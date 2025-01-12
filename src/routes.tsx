import { RouteObject } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";
import UserLayout from "./layouts/UserLayout";
import CarsPage from "./pages/CarsPage";
import BiddingSessionPage from "./pages/BiddingSessionPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import ReportPage from "./pages/ReportPage";
import BiddingDetailsPage from "./pages/BiddingDetailsPage";
import AccessDeniedPage from "./pages/errors/AccessDeniedPage";

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
        path: "cars/:carId",
        element: <CarDetailsPage />,
      },
      {
        path: "sessions",
        element: <BiddingSessionPage />,
      },
      {
        path: "sessions/:sessionId",
        element: <BiddingDetailsPage />,
      },
      {
        path: "report",
        element: <ReportPage />,
      },
      {
        path: "admin",
        element: <h1>Admin</h1>,
      },
    ],
  },
  {
    path: "/access-denied",
    element: <AccessDeniedPage />,
  },
];

export default routes;

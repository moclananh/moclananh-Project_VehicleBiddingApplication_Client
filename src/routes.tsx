import { RouteObject } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import AuthPage from "./pages/AuthPage";
import LandingPage from "./pages/LandingPage";

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
];

export default routes;

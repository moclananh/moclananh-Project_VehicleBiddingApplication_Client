import { RouteObject } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import AuthPage from "./pages/AuthPage";

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    path: "/",
    children: [
      {
        element: <>Home</>,
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

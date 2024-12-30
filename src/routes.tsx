import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    element: <>Auth</>,
    path: "/auth",
    children: [
      {
        element: <>Login</>,
        path: "login",
      },
      {
        element: <>Register</>,
        path: "register",
      },
    ],
  },
  {
    element: <>App</>,
    path: "/",
    children: [
      {
        element: <>Home</>,
        path: "home",
      },
    ],
  },
];

export default routes;

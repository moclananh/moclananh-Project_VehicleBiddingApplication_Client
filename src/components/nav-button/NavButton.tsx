import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mantine/core"; // Replace with your Button component library

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ to, children }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }} className={({ isActive }) => (isActive ? "active" : "")}>
      {({ isActive }) => <Button variant={isActive ? "light" : "subtle"}>{children}</Button>}
    </NavLink>
  );
};

export default NavButton;

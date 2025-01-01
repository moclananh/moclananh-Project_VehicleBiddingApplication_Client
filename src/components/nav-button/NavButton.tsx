import React from "react";
import { NavLink } from "react-router-dom";
import { Button, DefaultMantineColor, MantineSize } from "@mantine/core"; // Replace with your Button component library

interface NavButtonProps {
  to: string;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  justify?: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
  fontSize?: MantineSize;
  fontColor?: DefaultMantineColor;
}

const NavButton: React.FC<NavButtonProps> = ({ to, children, startIcon, endIcon, fullWidth, justify, fontSize, fontColor }) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }} className={({ isActive }) => (isActive ? "active" : "")}>
      {({ isActive }) => (
        <Button
          justify={justify}
          fullWidth={fullWidth}
          fz={fontSize}
          c={fontColor}
          leftSection={startIcon}
          rightSection={endIcon}
          variant={isActive ? "light" : "subtle"}
        >
          {children}
        </Button>
      )}
    </NavLink>
  );
};

export default NavButton;

import { createTheme, MantineColorsTuple } from "@mantine/core";

const myColor: MantineColorsTuple = ["#f1f4fe", "#e4e6ed", "#c8cad3", "#a9adb9", "#9094a3", "#7f8496", "#777c91", "#656a7e", "#595e72", "#4a5167"];
export const theme = createTheme({
  primaryColor: "blue-gray",
  autoContrast: true,
  colors: {
    "blue-gray": [...myColor],
  },
});

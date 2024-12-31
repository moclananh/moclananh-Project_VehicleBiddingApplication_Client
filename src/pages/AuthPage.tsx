import { Carousel } from "@mantine/carousel";
import { Box, Container, Image, Paper, Stack } from "@mantine/core";
import { CarImageList } from "../constants/ui";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import LoginForm from "../features/auth/components/LoginForm";
import { useSearchParams } from "react-router-dom";
import RegisterForm from "../features/auth/components/RegisterForm";
const AuthPage = () => {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [searchParams] = useSearchParams();
  const currentForm = searchParams.get("form") || "login";
  return (
    <Container
      size={"xl"}
      h="calc(100vh - var(--app-shell-header-height, 0px) - var(--app-shell-footer-height, 0px))"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper shadow="xl" withBorder radius={"md"} w={"100%"} h="80%" style={{ display: "flex", overflow: "hidden" }}>
        <Box style={{ flexBasis: "50%", display: "flex" }}>
          <Carousel plugins={[autoplay.current]} loop withIndicators height={"100%"} w={"100%"} style={{ flex: 1 }}>
            {CarImageList.map((image, index) => (
              <Carousel.Slide key={index}>
                <Image src={image} style={{ width: "100%", height: "100%" }} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
        <Stack justify="center" p="xl" style={{ flexBasis: "50%" }}>
          {currentForm === "login" ? <LoginForm /> : <RegisterForm />}
        </Stack>
      </Paper>
    </Container>
  );
};

export default AuthPage;

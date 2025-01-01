import React from "react";
import classes from "./HeroSection.module.css";
import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
const HeroSection = () => (
  <div className={classes.hero}>
    <Overlay gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)" opacity={1} zIndex={0} />
    <Container className={classes.container} size="md">
      <Title className={classes.title}>Revolutionize Your Car Bidding Experience</Title>
      <Text className={classes.description} size="xl" mt="xl">
        Discover a smarter way to bid for your dream car. Our platform offers transparency, real-time bidding, and an extensive selection of vehicles
        to ensure you drive home happy.
      </Text>

      <Button component={Link} to={"/auth?form=login"}  size="xl" radius="xl" className={classes.control}>
        Start Bidding Now
      </Button>
    </Container>
  </div>
);

export default HeroSection;

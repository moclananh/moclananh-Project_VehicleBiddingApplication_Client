import { Button, Container, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const AccessDeniedPage = () => {
  return (
    <Container>
      <Stack gap="md" align="center" justify="center" w={"100%"}>
        <Title>Access Denied</Title>
        <Text>You do not have permission to access this page.</Text>
        <Button component={Link} to="/">
          back to home
        </Button>
      </Stack>
    </Container>
  );
};

export default AccessDeniedPage;

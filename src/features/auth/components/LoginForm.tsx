import { Anchor, Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

const LoginForm = () => {
  const [_, setSearchParams] = useSearchParams();
  return (
    <>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor underline="always" size="sm" component="button" onClick={() => setSearchParams({ form: "register" })}>
          Create account
        </Anchor>
      </Text>

      <TextInput label="Email" placeholder="you@mantine.dev" required />
      <PasswordInput label="Password" placeholder="Your password" required mt="md" />

      <Button fullWidth mt="xl">
        Sign in
      </Button>
    </>
  );
};

export default LoginForm;

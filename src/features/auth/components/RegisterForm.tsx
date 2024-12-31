import { Anchor, Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

const RegisterForm = () => {
  const [_, setSearchParams] = useSearchParams();
  return (
    <>
      <Title ta="center">Create your account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?
        <Anchor underline="always" size="sm" component="button" onClick={() => setSearchParams({ form: "login" })}>
          Login
        </Anchor>
      </Text>

      <TextInput label="Username" placeholder="Please enter your username" required />
      <TextInput label="Email" placeholder="you@mantine.dev" required />
      <PasswordInput label="Password" placeholder="Your password" required mt="md" />
      <PasswordInput label="Password" placeholder="Confirm password" required mt="md" />

      <Button fullWidth mt="xl">
        Sign up
      </Button>
    </>
  );
};

export default RegisterForm;

import { Anchor, Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { ILogin, LoginSchema } from "../types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
const LoginForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const { control, handleSubmit } = useForm<ILogin>({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = (data: ILogin) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor underline="always" size="sm" component="button" onClick={() => setSearchParams({ form: "register" })}>
          Create account
        </Anchor>
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => <TextInput {...field} label="Email" placeholder="user@exmaple.com" error={error?.message} />}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <PasswordInput {...field} label="Password" placeholder="Your password" error={error?.message} mt="md" />
        )}
      />

      <Button type="submit" fullWidth mt="xl">
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;

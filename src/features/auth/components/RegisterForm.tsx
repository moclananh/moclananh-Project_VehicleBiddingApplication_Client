import { Anchor, Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { IRegister, RegisterSchema } from "../types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const { control, handleSubmit } = useForm<IRegister>({
    mode: "onSubmit",
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = (data: IRegister) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title ta="center">Create your account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?
        <Anchor underline="always" size="sm" component="button" onClick={() => setSearchParams({ form: "login" })}>
          Login
        </Anchor>
      </Text>

      <Controller
        control={control}
        name="username"
        render={({ field, fieldState: { error } }) => (
          <TextInput {...field} error={error?.message} label="Username" placeholder="Please enter your username" />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <TextInput {...field} error={error?.message} label="Email" placeholder="user@exmaple.com" mt="md" />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <PasswordInput {...field} error={error?.message} label="Password" placeholder="Your password" mt="md" />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState: { error } }) => (
          <PasswordInput {...field} error={error?.message} label="Confirm Password" placeholder="Your password" mt="md" />
        )}
      />

      <Button type="submit" fullWidth mt="xl">
        Sign up
      </Button>
    </form>
  );
};

export default RegisterForm;

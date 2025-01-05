import { Anchor, Button, LoadingOverlay, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { RegisterFormField, RegisterSchema, Role, UserRegister } from "../types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthService } from "../../../services/auth.service";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../libs/error";

const RegisterForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormField>({
    mode: "onSubmit",
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = async (data: RegisterFormField) => {
    const request: UserRegister = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      role: Role.Dealer,
      budget: 0,
    };
    try {
      const response = await AuthService.register(request);
      toast.success(response.message);
    } catch (e) {
      handleAxiosError(e);
    }
  };
  return (
    <form
      style={{
        position: "relative",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoadingOverlay visible={isSubmitting} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <Title ta="center">Create your account</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?
        <Anchor
          underline="always"
          size="sm"
          onClick={() => {
            setSearchParams({ form: "login" });
          }}
        >
          Login
        </Anchor>
      </Text>

      <Controller
        control={control}
        name="userName"
        render={({ field, fieldState: { error } }) => (
          <TextInput withAsterisk {...field} error={error?.message} label="Username" placeholder="Please enter your username" />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <TextInput withAsterisk {...field} error={error?.message} label="Email" placeholder="user@exmaple.com" mt="md" />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <PasswordInput withAsterisk {...field} error={error?.message} label="Password" placeholder="Your password" mt="md" />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState: { error } }) => (
          <PasswordInput withAsterisk {...field} error={error?.message} label="Confirm Password" placeholder="Your password" mt="md" />
        )}
      />

      <Button type="submit" fullWidth mt="xl">
        Sign up
      </Button>
    </form>
  );
};

export default RegisterForm;

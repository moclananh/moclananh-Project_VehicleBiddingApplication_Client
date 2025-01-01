import { zodResolver } from "@hookform/resolvers/zod";
import { Anchor, Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthService } from "../../../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import { ILogin, LoginSchema } from "../types/auth.type";
const LoginForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserState } = useAuth();
  const { control, handleSubmit } = useForm<ILogin>({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = async (data: ILogin) => {
    try {
      const response = await AuthService.login(data);
      setUserState(response.data);
      navigate("/dashboard/cars", {
        replace: true,
      });
      toast.success(response.message);
    } catch (e) {
      const response = e.response.data;
      toast.error(response.detail);
    }
  };
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

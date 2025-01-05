import { zodResolver } from "@hookform/resolvers/zod";
import { Anchor, Button, LoadingOverlay, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthService } from "../../../services/auth.service";
import { useAuth } from "../hooks/useAuth";
import { ILogin, LoginSchema } from "../types/auth.type";
import { handleAxiosError } from "../../../libs/error";
const LoginForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserState } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ILogin>({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = async (data: ILogin) => {
    try {
      const response = await AuthService.login(data);
      console.log(response);
      setUserState(response.data);
      navigate("/dashboard/cars", {
        replace: true,
      });
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
      <Title ta="center">Welcome back!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          underline="always"
          size="sm"
          onClick={() => {
            setSearchParams({ form: "register" });
          }}
        >
          Create account
        </Anchor>
      </Text>

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => (
          <TextInput withAsterisk {...field} label="Email" placeholder="user@exmaple.com" error={error?.message} />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <PasswordInput withAsterisk {...field} label="Password" placeholder="Your password" error={error?.message} mt="md" />
        )}
      />

      <Button type="submit" fullWidth mt="xl">
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;

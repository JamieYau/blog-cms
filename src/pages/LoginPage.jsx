import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import useAuth from "../contexts/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await login(values.username, values.password);
    } catch (error) {
      setError("root", {
        message: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.username}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          placeholder="username"
          {...register("username", {
            required: "username is required",
          })}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          placeholder="password"
          {...register("password", {
            required: "password is required",
            minLength: { value: 8, message: "Minimum length should be 8" },
            maxLength: {
              value: 32,
              message: "Maximum length should not exceed 32",
            },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Submit
      </Button>
      <FormControl isInvalid={errors.root}>
        <FormErrorMessage> {errors.root && errors.root.message}</FormErrorMessage>
      </FormControl>
    </form>
  );
}

import { TextField, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { backendApi } from "../api/Fetch";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type UserSignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const userSignupSchema = yup.object({
  name: yup.string().required("User name is required."),
  email: yup
    .string()
    .required("email is required")
    .matches(/.+@.+/, "input is not valid a email address."),
  password: yup
    .string()
    .required("Password is required.")
    .min(5, "Password should be minimum 5 characters")
    .max(16, "Password should be maximum 16 characters"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Your passwords do not match"),
});

export const SignupForm = () => {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignupForm>({
    resolver: yupResolver(userSignupSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<UserSignupForm> = (data: UserSignupForm) => {
    const callSignupApi = async () => {
      setIsSubmitDisabled(true);
      try {
        const response = await backendApi.post("/register", data);
        if (response.status == 200) {
          router.push("/login");
        }
      } catch (e) {
        console.log(e);
        if (e.response.status === 0 || e.response.status === 500) {
          setFormError(
            "The server is unresponsive/unreachable at the moment. Please try later. Generic message"
          );
        }

        if (e.response.data === "Email already used by another account") {
          setFormError(
            "This email is already registered. Kindly use login instead or signup with a different email"
          );
        }
        setIsSubmitDisabled(false);
      }
    };
    callSignupApi();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ textAlign: "center" }}>Signup to incremental project</h2>
      <p data-test="form-error" style={{ color: "red" }}>
        {formError}
      </p>
      <TextField
        {...register("name")}
        inputProps={{ "data-test": "name" }}
        id="name"
        label="Name"
        variant="outlined"
        fullWidth
      />
      <p data-test="name-error" style={{ color: "red" }}>
        {errors.name?.message}
      </p>

      <TextField
        {...register("email")}
        inputProps={{ "data-test": "email" }}
        id="email"
        label="Email Address"
        variant="outlined"
        fullWidth
      />
      <p data-test="email-error" style={{ color: "red" }}>
        {errors.email?.message}
      </p>

      <TextField
        {...register("password")}
        inputProps={{ "data-test": "password" }}
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
      />
      <p data-test="password-error" style={{ color: "red" }}>
        {errors.password?.message}
      </p>

      <TextField
        {...register("confirmPassword")}
        inputProps={{ "data-test": "confirm-password" }}
        id="confirmPassword"
        label="Confirm Password"
        variant="outlined"
        type="password"
        fullWidth
      />
      <p data-test="confirmPassword-error" style={{ color: "red" }}>
        {errors.confirmPassword?.message}
      </p>

      <Button
        type="submit"
        data-test="submit-sign-up"
        variant="contained"
        fullWidth
        disabled={isSubmitDisabled}
      >
        {isSubmitDisabled ? "Loading" : "Submit"}
        {isSubmitDisabled ? <CircularProgress /> : null}
      </Button>
    </form>
  );
};

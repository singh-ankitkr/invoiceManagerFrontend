import { TextField, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { backendApi } from "../api/Fetch";
import { AuthContext } from "./authContext";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type UserLoginForm = {
  email: string;
  password: string;
};

enum btnText {
  submitText = "Submit",
  loadingText = "Loading",
}

const UserLoginFormSchema = yup
  .object({
    email: yup
      .string()
      .required("Please enter your email.")
      .matches(/.*@.*/, "Use a proper email"),
    password: yup
      .string()
      .required("Please enter your password.")
      .min(5, "Minimum 5 characters for password")
      .max(16, "Maximum 16 characters for password"),
  })
  .required();

const genericErrorMessage =
  "The site is unreachable at the moment, please try again later. A generic error message.";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginForm>({ resolver: yupResolver(UserLoginFormSchema) });

  const ctx = useContext(AuthContext);
  const router = useRouter();

  const [buttonText, setButtonText] = useState<btnText>(btnText.submitText);
  const [formError, setFormError] = useState("");

  const onLoginHandler: SubmitHandler<UserLoginForm> = (
    data: UserLoginForm
  ) => {
    const callLoginApi = async () => {
      setButtonText(btnText.loadingText);
      try {
        const response = await backendApi.post("/login", data);

        console.log("printing response");
        console.log(response.data);
        if (response.status === 200) {
          ctx.authDispatch({
            type: "LOGIN",
            loginData: response.data,
            router: router,
          });
        }
      } catch (e) {
        console.log(e);
        // The case when server is not responding or client is offline.
        if (e.code === "ERR_NETWORK") {
          setFormError(genericErrorMessage);
        }

        if (e.response.status === 403 || e.response.status === 400) {
          setFormError("Invalid Credentials. Retry.");
          setButtonText(btnText.submitText);
        }

        if (e.response.status === 500) {
          setFormError(genericErrorMessage);
          setButtonText(btnText.submitText);
        }
        setButtonText(btnText.submitText);
      }
    };
    callLoginApi();
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "10%" }}>Login Form</h2>

      <form
        onSubmit={handleSubmit(onLoginHandler)}
        style={{
          marginLeft: "25%",
          marginRight: "25%",
          width: "50%",
          textAlign: "center",
        }}
      >
        <p
          data-test="form-error"
          style={{ color: "red" }}
          hidden={formError === ""}
        >
          {formError}
        </p>
        <div>
          <TextField
            {...register("email")}
            inputProps={{ "data-test": "email" }}
            label="email"
            fullWidth
          />
        </div>

        <p data-test="email-error" style={{ color: "red" }}>
          {errors.email?.message}
        </p>

        <br />
        <div>
          <TextField
            {...register("password")}
            inputProps={{ "data-test": "password" }}
            label="password"
            type="password"
            fullWidth
          />
        </div>

        <p data-test="password-error" style={{ color: "red" }}>
          {errors.password?.message}
        </p>
        <br />
        <Button
          type="submit"
          data-test="submit-login"
          variant="contained"
          disabled={buttonText === btnText.loadingText}
          fullWidth
        >
          {buttonText}
          {buttonText === btnText.loadingText ? <CircularProgress /> : null}
        </Button>
      </form>
    </div>
  );
};

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { backendApi } from "../api/Fetch";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const createClientSchema = yup.object({
  email: yup
    .string()
    .required("Client email is required.")
    .matches(/.+@.+/, "Use a proper email"),
  name: yup
    .string()
    .required("Client name is required.")
    .min(3, "Min. length 3"),
  companyName: yup.string().required("Company name is required."),
  companyAddress: yup.string().required("Company Address is required."),
  regNumber: yup.string().required("Registration number is required."),
  iban: yup.string().required("Iban is required."),
  swift: yup.string().required("Swift is required."),
  vatNumber: yup.string().required("Vat number is required."),
});

type createClientType = yup.InferType<typeof createClientSchema>;

const successCreateMessage = "Client successfully added, add another client.";
const successEditMessage =
  "Client successfully updated. You can update further.";

type inputPropsSchema =
  | {
      mode: "create";
    }
  | {
      mode: "edit";
      id: string;
    };

export const CreateEditClient = (props: inputPropsSchema) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<createClientType>({ resolver: yupResolver(createClientSchema) });

  const [isPosting, setIsPosting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const onSubmit: SubmitHandler<createClientType> = (
    data: createClientType
  ) => {
    const clientJSONDetails = {
      email: data.email,
      name: data.name,
      companyDetails: {
        name: data.companyName,
        vatNumber: data.vatNumber,
        regNumber: data.regNumber,
        address: data.companyAddress,
        swift: data.swift,
        iban: data.iban,
      },
    };

    const createClientApi = async () => {
      setIsPosting(true);
      try {
        if (props.mode === "create") {
          const response = await backendApi.post("/clients", clientJSONDetails);
          if (response.status === 200) {
            setIsSuccess(true);
            reset();
          }
        }

        if (props.mode === "edit") {
          const response = await backendApi.put("/clients", {
            id: props.id,
            ...clientJSONDetails,
          });
          if (response.status === 200) {
            setIsSuccess(true);
          }
        }
      } catch (e) {
        setIsError(true);
      }

      setIsPosting(false);
    };

    createClientApi();
  };

  const router = useRouter();

  const initializeClientDetails = async (id: string) => {
    try {
      const response = await backendApi.get(`/clients/${id}`);
      const clientData = response.data["client"];
      setValue("email", clientData.email);
      setValue("name", clientData.name);
      setValue("companyName", clientData.companyDetails.name);
      setValue("vatNumber", clientData.companyDetails.vatNumber);
      setValue("regNumber", clientData.companyDetails.regNumber);
      setValue("companyAddress", clientData.companyDetails.address);
      setValue("iban", clientData.companyDetails.iban);
      setValue("swift", clientData.companyDetails.swift);
    } catch (e) {
      console.log("error is", e);
    }
  };

  useEffect(() => {
    if (props.mode === "create") {
      return;
    }

    initializeClientDetails(props.id);
  }, []);

  const getSuccessMessage = (isSuccess: boolean) => {
    if (isSuccess === false) {
      return props.mode === "create"
        ? successCreateMessage
        : successEditMessage;
    }

    return props.mode === "create"
      ? "Error in Creating client at the moment. Try again later."
      : "Error in updating the client details. Try again later.";
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "50%", marginLeft: "25%" }}
      >
        <h2>{props.mode === "edit" ? "Update" : "Create"} Client</h2>

        {isError && <p style={{ color: "red" }}>{getSuccessMessage(true)}</p>}
        {isSuccess && (
          <p style={{ color: "green" }}>{getSuccessMessage(false)}</p>
        )}

        <TextField
          {...register("email")}
          label="Client Email"
          inputProps={{ "data-test": "client-email" }}
          disabled={isPosting}
          fullWidth
        />
        <p style={{ color: "red" }} data-test="company-email-error">
          {errors.email?.message}
        </p>

        <TextField
          {...register("name")}
          inputProps={{ "data-test": "client-name" }}
          label="Client Name"
          disabled={isPosting}
          fullWidth
        />
        <p data-test="client-name" style={{ color: "red" }}>
          {errors.name?.message}
        </p>

        <TextField
          {...register("companyName")}
          inputProps={{ "data-test": "client-company-name" }}
          label="Company Name"
          disabled={isPosting}
          fullWidth
        />
        <p data-test="client-company-name-error" style={{ color: "red" }}>
          {errors.companyName?.message}
        </p>

        <TextField
          {...register("companyAddress")}
          inputProps={{ "data-test": "client-company-address" }}
          label="Company Address"
          disabled={isPosting}
          fullWidth
        />
        <p data-test="client-company-address-error" style={{ color: "red" }}>
          {errors.companyAddress?.message}
        </p>

        <TextField
          {...register("regNumber")}
          inputProps={{ "data-test": "client-company-reg" }}
          label="Registration Number"
          disabled={isPosting}
          fullWidth
        />
        <p data-test="client-company-reg-error" style={{ color: "red" }}>
          {errors.regNumber?.message}
        </p>

        <TextField
          {...register("iban")}
          inputProps={{ "data-test": "client-company-iban" }}
          label="IBAN"
          disabled={isPosting}
          fullWidth
        />
        <p data-test="client-company-iban-error" style={{ color: "red" }}>
          {errors.iban?.message}
        </p>

        <TextField
          {...register("swift")}
          inputProps={{ "data-test": "client-company-swift" }}
          label="SWIFT"
          disabled={isPosting}
          fullWidth
        />
        <p data-test="client-company-swift-error" style={{ color: "red" }}>
          {errors.swift?.message}
        </p>

        <TextField
          {...register("vatNumber")}
          inputProps={{ "data-test": "client-company-vat" }}
          label="VAT Number"
          disabled={isPosting}
          fullWidth
        />
        <p data-test="client-company-vat-error" style={{ color: "red" }}>
          {errors.vatNumber?.message}
        </p>

        <Button
          variant="contained"
          type="submit"
          disabled={isPosting}
          fullWidth
          data-test="submit-client"
        >
          submit
        </Button>
      </form>
    </>
  );
};

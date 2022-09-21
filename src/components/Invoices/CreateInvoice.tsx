import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { backendApi } from "../api/Fetch";

const createInvoiceItemSchema = yup.object({
  itemDescription: yup
    .string()
    .required("Item description is required.")
    .min(3, "Min length 3 for item description"),
  itemValue: yup
    .number()
    .typeError("Invoice value must be a number")
    .required("Cannot be empty")
    .positive("Must be greater than 0"),
});

const createInvoiceSchema = yup.object({
  invoiceDate: yup
    .number()
    .typeError("Must be a timestamp (number in milliseconds)")
    .required("Invoice Date is required.")
    .integer("Should be a timestamp")
    .positive("Should be a timestamp"),
  invoiceDueDate: yup
    .number()
    .typeError("Must be a timestamp (number in seconds)")
    .required("Invoice Due Date is required.")
    .integer("Should be a timestamp")
    .positive("Should be a timestamp"),
  invoiceNumber: yup
    .string()
    .required("Invoice number is required")
    .min(3, "Min length 3"),
  invoiceProjectCode: yup.string().min(3, "Min length 3"),
  items: yup.array(createInvoiceItemSchema).min(1, "Minimum 1 item in invoice"),
  //   Todo:  use a combobox for the invoiceClient
  invoiceClient: yup.string().required("Client is required"),
  total: yup.number(),
  invoiceClientName: yup.string().required(),
});

export const CreateInvoice = () => {
  const {
    control,
    watch,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createInvoiceSchema),
  });

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [defaultProps, setDefaultProps] = useState({
    options: [],
    getOptionLabel: (option: { id: string; companyName: string }) =>
      option.companyName,
  });

  const [successPosting, setSuccessPosting] = useState(false);
  const [errorPosting, setErrorPosting] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchClientOptions = async () => {
      try {
        const response = await backendApi.get("/clients/names");
        if ("clients" in response.data) {
          setDefaultProps((prevState) => {
            return { ...prevState, options: response.data.clients };
          });
        }
      } catch (e) {}
    };
    fetchClientOptions();
  }, []);

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("data", data);
    setIsSubmitting(true);
    const storeInvoice = async () => {
      try {
        const response = await backendApi.post(
          "/invoices",
          (data = {
            invoice_number: data.invoiceNumber,
            user_id: "123",
            client_id: data.invoiceClient,
            date: data.invoiceDate,
            dueDate: data.invoiceDueDate,
            value: data.total,
            meta: {
              items: data.items,
            },
          })
        );
        setSuccessPosting(true);
        reset();
        setIsSubmitting(false);
      } catch (e) {
        setIsSubmitting(false);
        setErrorPosting(e.response.data);
      }
    };

    storeInvoice();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "50%", marginLeft: "25%" }}
      >
        {successPosting && (
          <p style={{ color: "green" }} data-test="">
            Successfully added invoice. You can add more invoices.
          </p>
        )}
        {!successPosting && errorPosting && (
          <p style={{ color: "red" }} data-test="form-error">
            <span>Error in submitting the invoice. </span>
            {errorPosting}
          </p>
        )}
        <h2>Create Invoice</h2>
        <TextField
          {...register("invoiceDate")}
          inputProps={{ "data-test": "invoice-date" }}
          label="Invoice Date"
          disabled={isSubmitting}
          fullWidth
        />
        {errors.invoiceDate && (
          <p style={{ color: "red" }} data-test="invoice-date-error">
            {errors.invoiceDate.message}
          </p>
        )}
        <br />
        <br />
        <TextField
          {...register("invoiceDueDate")}
          inputProps={{ "data-test": "invoice-due-date" }}
          label="Invoice Due Date"
          disabled={isSubmitting}
          fullWidth
        />
        {errors.invoiceDueDate && (
          <p style={{ color: "red" }} data-test="invoice-due-date-error">
            {errors.invoiceDueDate.message}
          </p>
        )}
        <br />
        <br />
        <TextField
          {...register("invoiceNumber")}
          inputProps={{ "data-test": "invoice-number" }}
          label="Invoice Number"
          disabled={isSubmitting}
          fullWidth
        />
        {errors.invoiceNumber && (
          <p style={{ color: "red" }} data-test="invoice-number-error">
            {errors.invoiceNumber.message}
          </p>
        )}
        <br />
        <br />
        <TextField
          {...register("invoiceProjectCode")}
          inputProps={{ "data-test": "invoice-project-code" }}
          label="Invoice Project Code"
          disabled={isSubmitting}
          fullWidth
        />
        {errors.invoiceProjectCode && (
          <p style={{ color: "red" }} data-test="invoice-project-code-error">
            {errors.invoiceProjectCode.message}
          </p>
        )}
        <br />
        <br />
        <h4>items</h4>
        <Button
          variant="contained"
          onClick={() => {
            append({});
          }}
        >
          Add Item
        </Button>
        <br />
        <br />
        {errors.items && (
          <p style={{ color: "red" }} data-test="invoice-items-error">
            {errors.items?.message}
          </p>
        )}
        {fields.map((field, index) => (
          <div key={field.id}>
            <br />
            <div data-test={`invoice-item-${index}`}>
              <TextField
                {...register(`items.${index}.itemDescription`)}
                inputProps={{ "data-test": "invoice-item-description" }}
                label="item name"
                disabled={isSubmitting}
              />
              <TextField
                {...register(`items.${index}.itemValue`)}
                inputProps={{ "data-test": "invoice-item-value" }}
                label="item value"
                disabled={isSubmitting}
              />
              <Button
                variant="contained"
                onClick={() => {
                  remove(index);
                }}
              >
                remove
              </Button>
            </div>
            {errors.items && typeof errors.items[index] !== "undefined" && (
              <>
                <p
                  style={{ color: "red" }}
                  data-test="invoice-item-description-error"
                >
                  {errors.items[index].itemDescription?.message}
                </p>
                <p
                  style={{ color: "red" }}
                  data-test="invoice-item-value-error"
                >
                  {errors.items[index].itemValue?.message}
                </p>
              </>
            )}

            <br />
          </div>
        ))}
        {watch("items") && (
          <p>
            <span>Total: </span>
            {watch("items").reduce((total, item) => {
              const val = parseInt(item.itemValue);
              if (isNaN(val) === false) {
                total = total + val;
              }
              setValue("total", total);
              return total;
            }, 0)}
          </p>
        )}
        <Autocomplete
          {...defaultProps}
          id="Invoice Client"
          data-test="invoice-company-id"
          renderInput={(params) => (
            <TextField
              {...params}
              {...register("invoiceClientName")}
              label="Invoice Client"
              disabled={isSubmitting}
              variant="standard"
            />
          )}
          onChange={(_, newValue) => {
            setValue("invoiceClient", newValue?.id);
          }}
        />
        <br />
        <br />
        {errors.invoiceClient && (
          <p style={{ color: "red" }} data-test="invoice-client-id-error">
            {errors.invoiceClient?.message}
          </p>
        )}
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          data-test="submit-invoice"
          fullWidth
        >
          submit
        </Button>
      </form>
    </>
  );
};

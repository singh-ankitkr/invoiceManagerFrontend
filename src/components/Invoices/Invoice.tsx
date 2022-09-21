import { useEffect } from "react";
import { backendApi } from "../api/Fetch";

export const Invoice = () => {
  useEffect(() => {
    const fetchInvoice = async () => {
      const data = await backendApi.get("/invoices");
      console.log("printed");
      console.log(data);
    };

    fetchInvoice();
  }, []);
  return <div>Invoices will be printed here!!!</div>;
};

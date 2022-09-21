import { Button } from "@mui/material";
import Link from "next/link";

export const InvoiceTableContainerHeading = () => {
  return (
    <div style={{ display: "flex", margin: "5px", width: "100%" }}>
      <div style={{ fontWeight: "bold" }}>Latest Invoices</div>

      <Button
        variant="contained"
        style={{ marginLeft: "auto", marginRight: "2%" }}
        data-test="add-invoice"
      >
        <Link href="/invoices/new">New Invoice</Link>
      </Button>
      <Button
        variant="contained"
        data-test="view-all-invoices"
        style={{ marginRight: "2%" }}
      >
        <Link href="/">All Invoices</Link>
      </Button>
    </div>
  );
};

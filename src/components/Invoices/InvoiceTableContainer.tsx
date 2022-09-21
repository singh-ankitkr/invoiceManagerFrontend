import { useEffect, useState, FC } from "react";
import { backendApi } from "../api/Fetch";
import { PaginationControls } from "../Menu/PaginationControls";
import { CustomTableContainer } from "../table/CustomTableContainer";
import { InvoiceTableContainerHeading } from "./InvoiceTableContainerHeading";
import { InvoiceMenuButton } from "./InvoiceMenuButton";

const invoiceTableHeaders = [
  "Invoice number",
  "Client",
  "Date",
  "Project",
  "Amount",
  "",
];

type invoiceNumberType = string;
type companyNameType = string;
type dateDisplayType = string;
type invoiceProjectType = string;
type menuButtonType = string | FC;

type invoiceDataType = {
  id: string;
  rowData: [
    invoiceNumberType,
    companyNameType,
    dateDisplayType,
    invoiceProjectType,
    menuButtonType
  ];
};

const limit = 10;

export const InvoiceTableContainer = () => {
  const [offset, setOffset] = useState(0);
  const [invoiceData, setInvoiceData] = useState<invoiceDataType[]>([]);
  const [total, setTotal] = useState(0);

  const parseInvoiceDataToTableRows = (invoiceData) => {
    setTotal(invoiceData.total);
    let invoiceFields = invoiceData.invoices.map((invoice, index: number) => {
      if (index < limit) {
        const date = new Date(invoice.invoice.date);
        console.log("invoice");
        console.log(invoice);

        return {
          id: invoice.invoice.id,
          rowData: [
            invoice.invoice.invoice_number,
            invoice.client.companyDetails.name,
            date.toLocaleDateString(),
            invoice.invoice.project ? invoice.invoice.project : "",
            invoice.invoice.value,
            <InvoiceMenuButton />,
          ],
        };
      }
      return {};
    });

    invoiceFields = invoiceFields.filter(
      (invoiceField) => "id" in invoiceField
    );
    console.log(invoiceFields);

    setInvoiceData(invoiceFields);
  };

  const fetchInvoices = async () => {
    try {
      const response = await backendApi.get("/invoices/", {
        params: {
          offset: offset * limit,
          limit,
        },
      });
      parseInvoiceDataToTableRows(response.data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchInvoices();
  }, [offset]);

  const handleDecrement = () => {
    setOffset((offset) => offset - 1);
  };

  const handleIncrement = () => {
    setOffset((offset) => offset + 1);
  };

  return (
    <div style={{ width: "40%", marginLeft: "5%", marginTop: "5%" }}>
      <InvoiceTableContainerHeading />
      <CustomTableContainer
        tableData={{
          headers: invoiceTableHeaders,
          rows: invoiceData,
        }}
      />

      <PaginationControls
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        previousDisabled={offset === 0}
        nextDisabled={(offset + 1) * limit + 1 > total}
      />
    </div>
  );
};

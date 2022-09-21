import { Button, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { backendApi } from "../api/Fetch";
import { ClientRow } from "./ClientRow";
import BasicMenu from "./ClientRowMenu";

type companyDetailsResponse = {
  name: string;
  vatNumber: string;
  regNumber: string;
  address: string;
};

type singleClientResponse = {
  user_id: string;
  email: string;
  name: string;
  companyDetails: companyDetailsResponse;
  id: string;
  totalBilled: number;
  invoicesCount: number;
};

type multipleClientResponse = {
  clients: [singleClientResponse];
  total: number;
};

const limit = 10;
const fetchErrorMessage =
  "Unable to connect to the server currently, please try again later.";

export const ClientTable = () => {
  const [clients, setClients] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);

  const [fetchError, setFetchError] = useState(false);

  const clientTableHeading = {
    name: "Name",
    company: "Company Name",
    totalBilled: "Total Billed",
    invoicesCount: "Invoices",
    actions: "",
  };

  const getClients = async (offset: number, limit: number) => {
    try {
      setIsLoading(true);
      const response = await backendApi.get("/clients", {
        params: {
          offset: offset * limit,
          limit: limit,
          sort: "dsc",
          sortBy: "totalBilled",
        },
      });
      setClients(response.data);
      setTotal(response.data.total ? response.data.total : 0);
    } catch (e) {
      setFetchError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getClients(offset, limit);
  }, [offset]);

  const decrementOffset = () => {
    setOffset((prevOffset) => prevOffset - 1);
  };

  const incrementOffset = () => {
    setOffset((prevOffset) => prevOffset + 1);
  };

  const mapClients = (clients: multipleClientResponse) => {
    const mappedRowDetails = clients.clients.map((client) => {
      return (
        <ClientRow
          key={client.id}
          rowDetails={{
            id: client.id,
            name: client.name,
            company: client.companyDetails.name,
            totalBilled: client.totalBilled,
            invoicesCount: client.invoicesCount,
            actions: <BasicMenu id={client.id} />,
          }}
        />
      );
    });
    return mappedRowDetails;
  };

  return (
    <div>
      {fetchError && (
        <p data-test="clients-fetch-error" style={{ color: "red" }}>
          {fetchErrorMessage}
        </p>
      )}
      <h4>
        <ClientRow rowDetails={clientTableHeading} />
      </h4>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={118}
          data-test="loading-overlay"
        />
      ) : (
        <div>
          {total > 0 ? (
            <div data-test="clients-table">{mapClients(clients)}</div>
          ) : (
            <div
              data-test="empty-placeholder"
              style={{ height: "100px", backgroundColor: "gray" }}
            >{`You have not added any clients yet.`}</div>
          )}
        </div>
      )}
      <Button onClick={decrementOffset} disabled={offset === 0}>
        {"< Previous"}
      </Button>
      <Button
        onClick={incrementOffset}
        disabled={(offset + 1) * limit + 1 > total}
      >
        {"Next >"}
      </Button>
    </div>
  );
};

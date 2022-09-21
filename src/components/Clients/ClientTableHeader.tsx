import { Button } from "@mui/material";
import Link from "next/link";

export const ClientTableHeader = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "60% 20% 20%" }}>
      <div>Latest Clients</div>
      <Button>
        <Link data-test="add-client" href="/clients/new">
          new client
        </Link>
      </Button>
      <Button>
        <Link data-test="view-all-clients" href="/clients">
          all clients
        </Link>
      </Button>
    </div>
  );
};

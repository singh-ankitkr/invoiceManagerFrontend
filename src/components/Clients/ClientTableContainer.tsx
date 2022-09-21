import { ClientTable } from "./ClientTable";
import { ClientTableHeader } from "./ClientTableHeader";

export const ClientTableContainer = () => {
  return (
    <div style={{ width: "40%", margin: "5%" }}>
      <ClientTableHeader />
      <ClientTable />
    </div>
  );
};

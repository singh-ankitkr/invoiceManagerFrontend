import { useEffect } from "react";
import { backendApi } from "../api/Fetch";

export const Clients = () => {
  useEffect(() => {
    const fetchClients = async () => {
      const data = await backendApi.get("/clients");
      console.log("printing clients response now");
      console.log(data);
    };

    fetchClients();
  }, []);

  return <p>Clients have been fetched</p>;
};

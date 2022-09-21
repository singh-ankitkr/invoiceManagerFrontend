import type { NextPage } from "next";
import { CreateEditClient } from "../../src/components/Clients/CreateEditClient";

const NewClient: NextPage = () => {
  return <CreateEditClient mode="create" />;
};

export default NewClient;

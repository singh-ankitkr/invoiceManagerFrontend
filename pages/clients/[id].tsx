import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CreateEditClient } from "../../src/components/Clients/CreateEditClient";

const EditClient = () => {
  const router = useRouter();

  const clientId = router.query.id;

  return (
    <>{router.isReady && <CreateEditClient mode="edit" id={clientId} />}</>
  );
};

export default EditClient;

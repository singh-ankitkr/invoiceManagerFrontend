import type { NextPage } from "next";
import Head from "next/head";
import { ClientTableContainer } from "../src/components/Clients/ClientTableContainer";
import { InvoiceTableContainer } from "../src/components/Invoices/InvoiceTableContainer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ClientTableContainer />
        <InvoiceTableContainer />
      </div>
    </>
  );
};

export default Home;
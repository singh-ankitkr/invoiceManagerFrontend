import { NextPage } from "next";
import Head from "next/head";
import { SignupFormContainer } from "../src/components/user/SignupFormContainer";

const Signup: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Signup - Incremental project</title>
      </Head>
      <SignupFormContainer />
    </div>
  );
};

export default Signup;

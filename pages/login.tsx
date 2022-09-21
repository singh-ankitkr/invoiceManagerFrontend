import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { LoginFormContainer } from "../src/components/user/LoginFormContainer";

export type UserLoginForm = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Incremental Project</title>
      </Head>
      <LoginFormContainer />

      <div style={{ textAlign: "center" }}>
        <p> If you don't have an account yet</p>
        <div style={{ color: "blue" }}>
          <Link href={"/signup"}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

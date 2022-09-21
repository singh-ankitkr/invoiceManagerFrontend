import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthChecker } from "../src/components/user/AuthChecker";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthChecker>
      <Component {...pageProps} />
    </AuthChecker>
  );
}

export default MyApp;

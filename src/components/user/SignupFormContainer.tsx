import Link from "next/link";
import { SignupForm } from "./SignupForm";

export const SignupFormContainer = () => {
  return (
    <div
      style={{
        marginLeft: "25%",
        width: "50%",
        marginRight: "25%",
        marginTop: "10%",
      }}
    >
      <SignupForm />

      <div style={{ textAlign: "center", color: "blue", paddingTop: "10px" }}>
        <Link href={"/login"}>Already signed up? Proceed to login</Link>
      </div>
    </div>
  );
};

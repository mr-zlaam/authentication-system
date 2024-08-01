import {} from "react";
import { SignUp } from "./components/SignUp";

function SignUpPage() {
  return (
    <>
      <section className="h-screen grid place-items-center ">
        <div className="w-fit">
          <SignUp />
        </div>
      </section>
    </>
  );
}

export default SignUpPage;

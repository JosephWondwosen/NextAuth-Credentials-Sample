import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import AuthForm from "@/components/AuthForm";
import User from "@/models/User";
import Spinner from "@/components/Spinner";

function signin() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated") {
    router.replace("/");
  }

  const submitHandler = async ({ username, password }: User) => {
    //TODO: perform validation
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(false);
    if (!result?.error) {
      router.replace("/");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <AuthForm
        submitHandler={submitHandler}
        authType="Signin"
        isSubmitting={loading}
      />
    </div>
  );
}

export default signin;

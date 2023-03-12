import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import AuthForm from "@/components/AuthForm";
import User from "@/models/User";
import authService from "@/services/auth";
import Spinner from "@/components/Spinner";

function signup() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "authenticated") {
    router.replace("/");
  }

  const submitHandler = async (user: User) => {
    //TODO: perform validation
    try {
      setLoading(true);
      const result = await authService.signup(user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      //TODO: handle error properly
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <AuthForm
        submitHandler={submitHandler}
        authType="Signup"
        isSubmitting={loading}
      />
    </div>
  );
}

export default signup;

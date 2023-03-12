import React, { FormEvent, useRef } from "react";
import { useRouter } from "next/router";

import {
  LockClosedIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

import Button from "./Button";
import Input from "./Input";
import User from "@/models/User";

interface AuthFormProps {
  submitHandler: (obj: User) => void;
  authType: string;
  isSubmitting: boolean;
}

function LoginForm({ authType, isSubmitting, ...restProps }: AuthFormProps) {
  const router = useRouter();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    restProps.submitHandler({
      username: username.current?.value!,
      password: password.current?.value!,
    });
  };

  return (
    <div className="relative flex w-full max-w-md flex-col items-center justify-start space-y-4 rounded-lg bg-white p-3 shadow-lg">
      <div className="absolute -top-6 right-0 left-0 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-slate-900 bg-white">
        <LockClosedIcon className="h-6 w-6 text-slate-700" />
      </div>
      <h1 className="text-lg font-bold text-slate-700">{authType}</h1>
      <form
        onSubmit={submitHandler}
        className="flex w-full flex-col items-center space-y-6 p-5"
      >
        <div className="flex w-full flex-col space-y-1">
          <label htmlFor="username" className="text-sm text-slate-700">
            Username
          </label>
          <Input
            ref={username}
            id="username"
            type="email"
            name="username"
            size="large"
            fullwidth
            placeholder="Enter your username"
          />
        </div>
        <div className="flex w-full flex-col space-y-1">
          <label htmlFor="password" className="text-sm text-slate-700">
            Password
          </label>
          <Input
            ref={password}
            id="password"
            type="password"
            name="password"
            size="large"
            fullwidth
            placeholder="Enter your password"
          />
        </div>
        <div className="flex w-full justify-between items-center">
          {authType === "Signup" && (
            <p
              onClick={() => router.push("/signin")}
              className="italic text-sm cursor-pointer text-slate-500 hover:text-slate-700 transition duration-150"
            >
              Signin
            </p>
          )}
          {authType === "Signin" && (
            <p
              onClick={() => router.push("/signup")}
              className="italic text-sm cursor-pointer text-slate-500 hover:text-slate-700 transition duration-150"
            >
              Signup
            </p>
          )}
          <Button
            disabled={isSubmitting}
            type="submit"
            size="large"
            Icon={ArrowRightOnRectangleIcon}
          >
            {authType}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "unauthenticated") {
    router.replace("/signin");
  }

  const logoutHandler = () => {
    signOut();
  };

  return (
    <div className="flex flex-col space-y-3 min-h-screen items-center justify-center bg-slate-900">
      <p className="text-white font-bold text-lg">{`Welcome ${session?.user?.email}`}</p>
      <Button size="large" type="button" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
}

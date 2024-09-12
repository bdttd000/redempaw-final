"use client";

import { useRouter } from "next/navigation";
import Preloader from "../components/shared/preloader/Preloader";
import { Header, Footer } from "../components/shared/layout";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home({ children }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return <Preloader />;
  }

  return (
    <>
      <Header />
      <main className="h-screen-minus-layout">{children}</main>
      <Footer />
    </>
  );
}

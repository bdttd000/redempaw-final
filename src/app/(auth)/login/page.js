"use client";

import Form from "@/components/auth/login/Form";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Preloader from "@/app/components/shared/preloader/Preloader";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center md:flex-row p-5 gap-8">
      <div className="md:flex-1 flex flex-col justify-center items-center">
        <Image
          priority
          src={logo}
          className="logo-filter mb-8 w-4/5 md:w-4/5 h-auto lg:w-3/5"
          alt="Logo"
        />
        <div className="text-5xl lg:text-7xl xl:text-6xl 2xl:text-8xl">
          REDEM<span className="text-secondary">PAW</span>
        </div>
      </div>
      <Form />
    </div>
  );
}

import React, { useState } from "react";
import Cookies from "js-cookie";
import { Typography, Box } from "@mui/material";
// pages
import Main_page from "./All-pages/Main-page";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Index() {
  const [loginCookie, setLoginCookie] = useState<string | undefined>(undefined);
  const [registerCookie, setRegisterCookie] = useState<string | undefined>(
    undefined
  );
  const Pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoginCookie(Cookies.get("User-Data"));
    setRegisterCookie(Cookies.get("New-User"));

    if (Pathname === "/") {
      router.push("/All-pages/Home");
    }
  }, []);

  return <Main_page />;
}

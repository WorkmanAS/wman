import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useRouter } from "next/router";

type LayoutProps = {
  children: React.ReactNode;
  footerVariant?: "default" | "home";
};

export const Layout = ({ children, footerVariant = "default" }: LayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    const isHome = router.pathname === "/";
    if (typeof window !== "undefined") {
      document.body.classList.toggle("homepage", isHome);
    }
  }, [router.pathname]);

  return (
    <Box>
      <Header />
      <main>{children}</main>
      <Footer variant={footerVariant} />
    </Box>
  );
};

export default Layout;

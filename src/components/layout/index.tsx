import { Box, CssBaseline, styled } from "@mui/material";
import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

type LayoutProps = {
  children: React.ReactNode;
  footerVariant?: "default" | "home";
};

export const Layout: React.FC<LayoutProps> = ({
  children,
footerVariant = "default",
}) => {
  return (
    <>
      <CssBaseline />

      <Header />
      <Offset />

      <Box>
        {children}
        </Box>

      <Footer variant={footerVariant} />
    </>
  );
};

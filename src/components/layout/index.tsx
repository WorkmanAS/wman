import { Box, CssBaseline, styled } from "@mui/material";
import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <CssBaseline />

      <Header />
      <Offset />

      <Box>{children}</Box>

      <Footer />
    </>
  );
};

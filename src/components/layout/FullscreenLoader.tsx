import { Box } from "@mui/material";
import React from "react";
import Image from "next/image";

interface FullscreenLoaderProps {}

export const FullscreenLoader: React.FC<FullscreenLoaderProps> = ({}) => {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent={"center"}
      sx={{
        "& span": { overflow: "unset !important" },
        background: "#46464645",
      }}
    >
      <Image
        className="favicon-loader"
        src="/assets/favicon.png"
        width={60}
        height={60}
	alt=""
      />
    </Box>
  );
};

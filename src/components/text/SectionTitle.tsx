import { Typography } from "@mui/material";
import React from "react";

interface SectionTitleProps {
  title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <Typography textTransform={"uppercase"} fontSize="36px">
      {title}
    </Typography>
  );
};

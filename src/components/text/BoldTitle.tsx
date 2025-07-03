import { Typography } from "@mui/material";
import React from "react";

interface BoldTitleProps {
  title: string;
  value: string;
  color?: string;
}

export const BoldTitle: React.FC<BoldTitleProps> = ({
  title,
  value,
  color,
}) => {
  return (
    <Typography {...(color && { color })}>
      <span style={{ fontWeight: "bold" }}> {title}:</span> {value}
    </Typography>
  );
};

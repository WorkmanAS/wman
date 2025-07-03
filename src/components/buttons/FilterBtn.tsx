import { Button } from "@mui/material";
import React from "react";

interface FilterBtnProps {
  title: string;
  onClick: () => void;
  active?: boolean;
}

export const FilterBtn: React.FC<FilterBtnProps> = ({
  title,
  onClick,
  active,
}) => {
  return (
    <Button
      color={active ? "primary" : "secondary"}
      variant="contained"
      onClick={onClick}
      sx={{
        padding: "10px 20px",
        ...(!active && {
          background: "#E9E9E9",
          fontWeight: 400,
        }),
        marginRight: "21px",
        boxShadow: "unset",
      }}
    >
      {title}
    </Button>
  );
};

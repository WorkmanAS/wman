import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { colors } from "../../styles/colors";

export const TypographyLink = styled(Typography)(({}) => ({
  cursor: "pointer",
  transition: "color 0.5s",
  position: "relative",
  "&:after": {
    height: "1px",
    width: "0",
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    background: colors.red,
    transition: "0.5s",
  },
  "&:hover": {
    color: colors.red,
    "&:after": {
      width: "100%",
    },
  },
  "&.active": {
    color: colors.red,
    "&:after": {
      height: "1px",
      width: "100%",
      content: "''",
      position: "absolute",
      bottom: 0,
      left: 0,
      background: colors.red,
      transition: "0.5s",
    },
  },
}));

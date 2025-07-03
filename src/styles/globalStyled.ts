import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { colors } from "./colors";

export const MaxWidthContainer = styled(Box, {
  // shouldForwardProp: (prop) => prop !== "autoMargin",
  //@ts-ignore
})(({}) => ({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  margin: "auto",
  // ...(autoMargin ? { margin: "auto" } : {}),
  transition: "0.5s",
  maxWidth: 1200,
  boxSizing: "border-box",
  // padding: "0 45px",
  // [theme.breakpoints.down("tablet")]: {
  //   padding: "0 15px",
  // },
}));

export const Overlay = styled(
  Box,
  {}
)(({}) => ({
  width: "100%",
  height: "100%",
  overflow: "hidden",
  position: "absolute",
  top: 0,
  left: 0,
}));

// export const Container = styled(Box, {
//   shouldForwardProp: (prop) => prop !== "autoMargin",
//   //@ts-ignore
// })(({ theme, autoMargin }) => ({
//   width: "100%",
//   overflow: "hidden",
//   position: "relative",
//   ...(autoMargin ? { margin: "auto" } : {}),
//   transition: "0.5s",
//   maxWidth: 1172,
//   boxSizing: "border-box",
//   padding: "0 45px",
//   [theme.breakpoints.down("tablet")]: {
//     padding: "0 15px",
//   },
// }));

// export const BlueMenuItem = styled(Box, {
//   shouldForwardProp: (prop) => prop !== "isActive",
//   // @ts-ignore
// })(({ isActive }) => ({
//   height: "70px",
//   padding: "26px 30px",
//   boxSizing: "border-box",
//   position: "relative",
//   cursor: "pointer",
//   transition: "0.3s",
//   background: isActive ? colors.C3 : colors.C2,
//   color: isActive ? `${colors.C2} !important` : colors.C1,
//   "&::after": {
//     content: "''",
//     width: "100%",
//     height: "1px",
//     background: colors.C6,
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     opacity: 0.3,
//   },
//   "&:hover": {
//     background: colors.C3,
//     color: `${colors.C2} !important`,
//   },
// }));

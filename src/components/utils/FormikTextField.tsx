import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { TextField } from "formik-mui";

export const FormikTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root": {
    color: "black",
  },
  "& input::placeholder": {
    color: "rgba(139, 137, 137, 1)",
    opacity: 1,
  },
}));

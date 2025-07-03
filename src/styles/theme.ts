import { createTheme } from "@mui/material/styles";
import { breakingPoints } from "./breakingPoints";
import { colors } from "./colors";

/*
The z-index values

  mobile stepper: 1000
  speed dial: 1050
  app bar: 1100
  drawer: 1200
  modal: 1300
  snackbar: 1400
  tooltip: 1500
*/

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: colors.red,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.white,
      contrastText: colors.black,
    },
    // error: {
    //   main: colors.red["500"],
    // },
    text: {
      // disabled: colors.C4,
      secondary: colors.white,
      primary: colors.black,
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: breakingPoints.sm,
      laptop: breakingPoints.md,
      desktop: breakingPoints.lg,
      xs: 0,
      sm: breakingPoints.sm,
      md: breakingPoints.md,
      lg: breakingPoints.lg,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          textTransform: "unset",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        container: {
          background: "rgba(34, 14, 14, 0.81)",
          backdropFilter: "blur(4px)",
        },
        paper: {
          overflow: "visible",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "50px",
        },
      },
    },
    // MuiFormHelperText: {
    //   styleOverrides: {
    //     root: {
    //       color: colors.C7,
    //     },
    //   },
    // },
    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       color: "#959595",
    //     },
    //   },
    // },
    MuiIconButton: {
      defaultProps: {
        disableFocusRipple: true,
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          "&:hover": {
            background: "unset",
          },
        },
      },
    },

    MuiInput: {
      // styleOverrides: {
      //   input: {
      //     "&::placeholder": {
      //       color: colors.C1,
      //       opacity: 1,
      //     },
      //   },
      //   root: {
      //     "&::after": {
      //       border: "unset !important",
      //     },
      //     "&::before": {
      //       border: "unset !important",
      //     },
      //   },
      // },
    },
  },
});

export default theme;

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    // xs: false; // removes the `xs` breakpoint
    // sm: false;
    // md: false;
    // lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

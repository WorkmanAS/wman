import { useMediaQuery, useTheme } from "@mui/material";

interface Props {
  laptop?: number;
  tablet?: number;
}

export const useClientSize = (props?: Props) => {
  const theme = useTheme();

  const isDesktop = useMediaQuery(
    theme.breakpoints.up(props?.laptop ?? "laptop")
  );
  const isTablet = useMediaQuery(theme.breakpoints.up("tablet")) && !isDesktop;
  const isMobile =
    useMediaQuery(theme.breakpoints.up("mobile")) && !isTablet && !isDesktop;

  return {
    isDesktop,
    isTablet,
    isMobile,
  };
};

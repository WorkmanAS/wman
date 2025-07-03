import {
  AppBar,
  Box,
  Toolbar,
  Link,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useClientSize, useOpen } from "../../hooks";
import NextLink from "next/link";
import Image from "next/image";
import { NAVIGATION } from "../../lib/constants";
import TextContent from "../../content/layout";
import { NextLinkComposed } from "../navigation";
import { TypographyLink } from "../text";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import HamburgerIcon from "../../lib/icons/hamburger.svg";
import Divider from "../../lib/icons/line.svg";
import { colors } from "../../styles/colors";
import { Close } from "@mui/icons-material";

export const Header: React.FC = ({}) => {
  const { isDesktop } = useClientSize();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const currentPath = router.pathname;
      const paths = Object.values(NAVIGATION);
      if (paths.includes(currentPath)) {
        setActiveSection(currentPath);
      }
    }
  }, [router]);

  return (
    <Box flexGrow={1}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Box
            maxWidth="1200px"
            margin="auto"
            justifyContent="space-between"
            alignItems="center"
            display="flex"
            width="100%"
          >
            <Box flexGrow={1}>
              <NextLink href="/" passHref>
                <Link>
                  <Image
                    src="/assets/logo.svg"
                    alt="Workman"
                    width={160}
                    height={47}
                  />
                </Link>
              </NextLink>
            </Box>

            {!isDesktop ? (
              <MobileMenu />
            ) : (
              // Use React.ElementType for component typing
              <NavBox component={"ul" as React.ElementType} sx={{ listStyleType: "none" }}>
                {Object.entries(NAVIGATION).map(([key, route]) => (
                  <Box component={"li" as React.ElementType} key={key}>
                    <NavLink
                      title={TextContent[key as keyof typeof TextContent]}
                      to={route}
                      active={activeSection === route}
                    />
                  </Box>
                ))}
              </NavBox>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

interface NavLinkProps {
  title: string;
  to: string;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ title, to, active }) => {
  return (
    <NextLinkComposed to={to}>
      <TypographyLink {...(active && { className: "active" })} fontSize="18px">
        {title}
      </TypographyLink>
    </NextLinkComposed>
  );
};

interface MobileMenuProps {}

export const MobileMenu: React.FC<MobileMenuProps> = ({}) => {
  const { handleClose, handleOpen, open } = useOpen();

  return (
    <>
      <IconButton onClick={handleOpen}>
        <HamburgerIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogContent style={{ background: "#220E0E" }}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", right: "20px", top: "20px" }}
          >
            <Close htmlColor={colors.white} />
          </IconButton>
          <Box
            component="ul"
            sx={{
              listStyleType: "none",
              margin: "unset",
              padding: "unset",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "70%",
              "& li": {
                textAlign: "center",
              },
            }}
          >
            {Object.entries(NAVIGATION).map(([key, route]) => (
              <Box component="li" key={key}>
                <NextLinkComposed to={route} onClick={handleClose}>
                  <Typography variant="h5" color={colors.white}>
                    {TextContent[key as keyof typeof TextContent]}
                  </Typography>
                </NextLinkComposed>
              </Box>
            ))}
          </Box>

          <Box marginTop="30px" display="flex" justifyContent="center">
            <Divider />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Fixing NavBox typing with React.ElementType for component
const NavBox = styled(Box)<{ component: React.ElementType }>(({ theme }) => ({
  display: "flex",
  listStyleType: "none",
  "& li:not(:last-child)": {
    marginRight: "50px",
  },
}));

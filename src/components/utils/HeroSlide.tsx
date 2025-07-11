import { Box, Typography } from "@mui/material";
import React from "react";
import { MaxWidthContainer, Overlay } from "../../styles/globalStyled";
import Image from "next/image";
import { useClientSize } from "../../hooks";
import { NextLinkComposed } from "../navigation";
import { ArrowBackIos } from "@mui/icons-material";
import { MapComponent } from "./MapComponent";

interface HeroSlideProps {
  image?: string;
  alt: string;
  content: JSX.Element;
  hideTitleOverlay?: boolean;
  dense?: boolean;
  minHeight?: string;
  backButton?: {
    pathname: string;
    title: string;
  };
}

export const HeroSlide: React.FC<HeroSlideProps> = ({
  image,
  alt,
  content,
  dense,
  backButton,
  minHeight,
  hideTitleOverlay,
}) => {
  const { isDesktop, isMobile, isTablet } = useClientSize();

  return (
    <Box
      position="relative"
      minHeight={minHeight}
      padding={dense ? "60px 0" : isDesktop ? "150px 0 124px" : "60px 0"}
    >
      <Overlay>
        {image ? (
          <Image
            src={image}
            blurDataURL={image}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt={alt}
          />
        ) : (
          <MapComponent />
        )}
      </Overlay>
      <Overlay sx={{ background: "rgba(34, 14, 14, 0.61)" }} />

      {isDesktop ? (
        <Box position="relative" padding={dense ? "40px" : "80px 0"}>
          <Overlay
            sx={{
              background: hideTitleOverlay
                ? "transparent"
                : "rgba(32, 1, 0, 0.4)",
              maxWidth: "90%",
              minWidth: "516px",
            }}
          />
          <MaxWidthContainer padding="0 16px">
            <Box
            sx={{
              width: "90%",
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 24px",
            }}
            >
              {content}
              </Box>
          </MaxWidthContainer>
        </Box>
      ) : (
        <Box
          position="relative"
          textAlign="center"
          padding="0 17px"
          maxWidth="400px"
          margin="auto"
        >
          {content}
        </Box>
      )}

      {backButton && (
        // <MaxWidthContainer
        //   position="unset"
        //   padding={isMobile ? "20px 16px" : "20px 16px"}
        //   {...(isMobile && { textAlign: "center" })}
        // >
        <NextLinkComposed to={backButton.pathname}>
          <Box
            display="flex"
            alignItems="center"
            position="absolute"
            bottom={40}
            width="100%"
            margin="auto"
            maxWidth={!isDesktop ? "unset" : 1200}
            left={!isDesktop ? 0 : 16}
            right={0}
            {...(!isDesktop && {
              sx: {
                textAlign: "center",
                bottom: "20px",
                justifyContent: "center",
                left: 0,
              },
            })}
          >
            <ArrowBackIos htmlColor="white" sx={{ marginRight: "15px" }} />
            <Typography fontSize="16px" color="white" fontWeight={"bold"}>
              {backButton.title}
            </Typography>
          </Box>
        </NextLinkComposed>
        // </MaxWidthContainer>
      )}
    </Box>
  );
};

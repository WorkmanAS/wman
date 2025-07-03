import { Box, Grid, Typography, List, ListItem } from "@mui/material";
import React from "react";
import { useClientSize } from "../../hooks";
import { MaxWidthContainer, Overlay } from "../../styles/globalStyled";
import Image from "next/image";
import { colors } from "../../styles/colors";
import TextContent from "../../content/layout";
import { styled } from "@mui/material/styles";
import { NextLinkComposed } from "../navigation";
import { LocalPhone, LocationOn, Email } from "@mui/icons-material"; // Import Email icon

export const Footer: React.FC = ({}) => {
  const { isDesktop, isMobile } = useClientSize();

  const contactsMarkup = (
    <>
      <Box
        display="flex"
        alignItems={"center"}
        {...(!isDesktop && { flexDirection: "column" })}
      >
        <LocalPhone htmlColor={colors.white} />
        <Box width="9px" {...(!isDesktop && { height: "9px" })} />
        <a href="callto:+4745141345">
          <Typography fontSize="16px" color={colors.white}>
            +47 45 14 13 45
          </Typography>
        </a>
      </Box>

      <Box height="15px" /> {/* Reduced line height */}

      <Box
        display="flex"
        alignItems={"center"} // Ensures vertical alignment of email icon and text
        {...(!isDesktop && { justifyContent: "center" })}
      >
        {/* Add email icon */}
        <Email htmlColor={colors.white} /> {/* Email icon added here */}
        <Box width="9px" {...(!isDesktop && { height: "9px" })} />
        <a href="mailto:post@wman.no">
          <Typography
            fontSize="16px"
            color={colors.white}
            sx={{ textDecoration: "underline" }}
            {...(!isDesktop && { textAlign: "center" })}
          >
            post@wman.no
          </Typography>
        </a>
      </Box>

      <Box height="15px" /> {/* Reduced line height */}

      <Box
        display="flex"
        alignItems={isDesktop ? "start" : "center"}
        {...(!isDesktop && { flexDirection: "column" })}
      >
        <LocationOn htmlColor={colors.white} />
        <Box width="9px" {...(!isDesktop && { height: "9px" })} />
        <Box>
          <Typography
            fontSize="16px"
            color={colors.white}
            {...(!isDesktop && { textAlign: "center" })}
          >
            Inngang 3 Hasleveien 28
            <br />
            0571 Oslo
          </Typography>
        </Box>
      </Box>

      <Box height="15px" /> {/* Reduced line height */}

      <Box display="flex" alignItems={"center"}>
        {isDesktop && (
          <>
            <LocalPhone
              htmlColor={colors.white}
              sx={{ visibility: "hidden" }}
            />
            <Box width="9px" />
          </>
        )}

        <Typography
          fontSize="16px"
          color={colors.white}
          {...(!isDesktop && { textAlign: "center" })}
        >
          Org. nr: 997 306 503
        </Typography>
      </Box>
    </>
  );

  const authorMark = (
    <Typography
      color={colors.white}
      sx={{
        position: "absolute",
        bottom: "10px", // Adjusted bottom position upward to remove extra space
        textAlign: isDesktop ? "unset" : "center",
        width: isDesktop ? "unset" : "100%",
      }}
    >
      © WORKMAN AS | {new Date().getFullYear()}
    </Typography>
  );

  return (
    <Box position="relative">
      <Overlay>
        <Image
          src="/assets/footer2.JPG"
          blurDataURL="/assets/footer2.JPG"
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          alt="workman as"
        />
      </Overlay>
      <Overlay sx={{ background: "#220E0E", opacity: 0.8 }} />
      <MaxWidthContainer
        padding={isDesktop ? "40px 16px 60px" : "20px 20px"} // Reduced bottom padding to make page shorter
        position={"relative"}
        {...(!isDesktop && {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "300px !important",
        })}
      >
        <Grid container {...(!isDesktop && { spacing: 4 })}>
          <Grid
            item
            md={4}
            sm={12}
            xs={12}
            {...(!isDesktop && {
              sx: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              },
            })}
          >
            <Image
              src="/assets/logo-white.png"
              placeholder="blur"
              blurDataURL="/assets/logo-white.png"
              alt="workman as"
              width="189px"
              height="41px"
            />

            {isDesktop && (
              <>
                <Box height="40px" />
                {contactsMarkup}
              </>
            )}
          </Grid>
          <Grid
            item
            md={4}
            sm={12}
            xs={12}
            {...(!isDesktop && {
              sx: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              },
            })}
          >
            <Typography fontSize="24px" color={colors.white} fontWeight="bold">
              {TextContent.SITEMAP}
            </Typography>
            <Box height="10px" />

            {/* Use List and ListItem for lists instead of UlBox */}
            <Grid container spacing={2}>
              <Grid item md={6} sm={6} xs={6}>
                <List sx={{ padding: 0 }}>
                  <ListItem sx={{ padding: 0 }}>
                    <NextLinkComposed to="/">
                      <Typography fontSize="16px" color={colors.white}>
                        {TextContent.MAIN_PAGE}
                      </Typography>
                    </NextLinkComposed>
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <NextLinkComposed to="/tjenester">
                      <Typography fontSize="16px" color={colors.white}>
                        {TextContent.SERVICES}
                      </Typography>
                    </NextLinkComposed>
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <NextLinkComposed to="/prosjekter">
                      <Typography fontSize="16px" color={colors.white}>
                        {TextContent.PROJECTS}
                      </Typography>
                    </NextLinkComposed>
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={6} sm={6} xs={6}>
                <List sx={{ padding: 0 }}>
                  <ListItem sx={{ padding: 0 }}>
                    <NextLinkComposed to="/om-oss">
                      <Typography fontSize="16px" color={colors.white}>
                        {TextContent.ABOUT}
                      </Typography>
                    </NextLinkComposed>
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <NextLinkComposed to="/apenhetsloven">
                      <Typography fontSize="16px" color={colors.white}>
                        {TextContent.APENHETSLOVEN}
                      </Typography>
                    </NextLinkComposed>
                  </ListItem>
                  <ListItem sx={{ padding: 0 }}>
                    <NextLinkComposed to="/kontakt">
                      <Typography fontSize="16px" color={colors.white}>
                        {TextContent.CONTACT}
                      </Typography>
                    </NextLinkComposed>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={4}
            sm={12}
            xs={12}
            textAlign={isDesktop ? "right" : "center"}
          >
            <Box>
              <Typography
                fontSize="24px"
                color={colors.white}
                fontWeight="bold"
              >
                {TextContent.OPENING_HOURS}
              </Typography>
              <Box height="10px" />
              <Typography fontSize="16px" color={colors.white}>
                {TextContent.MONDAY_FRIDAY}: 07.00 - 15.30
              </Typography>
              <Typography fontSize="16px" color={colors.white}>
                {TextContent.SATURDAY_SUNDAY}: {TextContent.CLOSED}
              </Typography>
            </Box>
          </Grid>

          {/* Section for logos with even spacing */}
          {!isDesktop && (
            <Grid
              item
              sm={12}
              xs={12}
              textAlign={isDesktop ? "right" : "center"}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between" // Ensures even spacing between logos
                gap="15px"
                sx={{
                  flexWrap: "wrap",
                  maxWidth: "100%", // To ensure responsiveness
                }}
              >
                <Box position="relative" width="90px" minHeight="80px">
                  <Image
                    objectFit="contain"
                    width="100%"
                    src="/assets/gaselle.png"
                    alt="gaselle-bedrift"
                    layout="fill"
                  />
                </Box>
                <Box position="relative" width="90px" minHeight="80px">
                  <Image
                    objectFit="contain"
                    layout="fill"
                    src="/assets/sg.png"
                    alt="sg"
                  />
                </Box>
                <Box position="relative" width="90px" minHeight="80px">
                  <Image
                    objectFit="contain"
                    layout="fill"
                    src="/assets/startbank.jpeg"
                    alt="startbank"
                  />
                </Box>
                <Box position="relative" width="160px" minHeight="80px">
                  <Image
                    objectFit="contain"
                    layout="fill"
                    src="/assets/ccc-white5.png"
                    alt="construction-city"
                  />
                </Box>
                <Box position="relative" width="160px" minHeight="80px">
                  <Image
                    objectFit="contain"
                    layout="fill"
                    src="/assets/mindelina_white2.png"
                    alt="mindelina"
                  />
                </Box>
		<Box position="relative" width="80px" minHeight="80px">
		 <Image
		  objectFit="contain"
		  layout="fill"
		  src="/assets/larebedrift.png"
		  alt="larebedrift"
		  />
		</Box>
              </Box>
            </Grid>
          )}
        </Grid>

        {isDesktop && (
          <Box
            display="flex"
            alignItems="stretch"
            justifyContent="space-between" // Ensures even spacing on desktop
            gap="15px"
            position="absolute"
            bottom="20px"
            right={0}
          >
		<Box position="relative" width="90px" minHeight="80px">
		 <Image
		  objectFit="contain"
		  layout="fill"
		  src="/assets/larebedrift.png"
		  alt="laerebedrift"
		 />
		</Box>
            <Box position="relative" width="90px" minHeight="80px">
              <Image
                objectFit="contain"
                width="100%"
                src="/assets/gaselle.png"
                alt="gaselle-bedrift"
                layout="fill"
              />
            </Box>
            <Box position="relative" width="90px" minHeight="80px">
              <Image
                objectFit="contain"
                layout="fill"
                src="/assets/sg.png"
                alt="sg"
              />
            </Box>
            <Box position="relative" width="90px" minHeight="80px">
              <Image
                objectFit="contain"
                layout="fill"
                src="/assets/startbank.jpeg"
                alt="startbank"
              />
            </Box>
            <Box position="relative" width="160px" minHeight="80px">
              <Image
                objectFit="contain"
                layout="fill"
                src="/assets/ccc-white5.png"
                alt="construction-city"
              />
            </Box>
            <Box position="relative" width="160px" minHeight="80px">
              <Image
                objectFit="contain"
                layout="fill"
                src="/assets/mindelina_white2.png"
                alt="mindelina"
              />
            </Box>
          </Box>
        )}

        {isDesktop && authorMark}

        {!isDesktop && <Box margin="80px 0 40px">{contactsMarkup}</Box>} {/* Reduced margin to remove extra space */}
      </MaxWidthContainer>

      {!isDesktop && authorMark}
    </Box>
  );
};

// Removed UlBox and used List/ListItem instead for better compatibility.

import { Box, Button, Typography, Grid, List, ListItem } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NewsBar from "../src/components/sections/NewsBar";
import {
  HeroSlide,
  NextLinkComposed,
} from "../src/components";
import TextContent from "../src/content/home";
import { useClientSize } from "../src/hooks";
import { colors } from "../src/styles/colors";
import { Overlay } from "../src/styles/globalStyled";
import { LocalPhone, LocationOn, Email } from "@mui/icons-material";
import { Header } from "../src/components/layout/Header";
import { MaxWidthContainer } from "../src/styles/globalStyled";


const Home: NextPage = () => {
  const { isMobile, isDesktop } = useClientSize();

  const contactsMarkup = (
    <>
      <Box
      display="flex"
      alignItems="center"
      flexDirection="row"
      gap="9px"
      justifyContent={isDesktop ? "flex-start" : "center"}>
        <LocalPhone htmlColor={colors.white} />
        <a href="tel:+4745141345" style={{ textDecoration: "none" }}>
          <Typography fontSize="16px" color={colors.white}>+47 45 14 13 45</Typography>
        </a>
      </Box>
      <Box height="15px" />
      <Box display="flex" alignItems="center" justifyContent={!isDesktop ? "center" : "start"}>
        <Email htmlColor={colors.white} />
        <Box width="9px" height={!isDesktop ? "9px" : 0} />
        <a href="mailto:post@wman.no">
          <Typography fontSize="16px" color={colors.white} sx={{ textDecoration: "underline" }}>
            post@wman.no
          </Typography>
        </a>
      </Box>
      <Box height="15px" />
      <Box
      display="flex"
      alignItems="center"
      flexDirection="row"
      justifyContent={isDesktop ? "flex=start" : "center"}
      >
        <LocationOn htmlColor={colors.white} />
        <Box width="9px" height={!isDesktop ? "9px" : 0} />
        <Typography fontSize="16px" color={colors.white} textAlign={!isDesktop ? "center" : "left"}>
          Inngang 3 Hasleveien 28<br />0571 Oslo
        </Typography>
      </Box>
      <Box height="15px" />
      <Box
      display="flex"
      alignItems="center"
      justifyContent={isDesktop ? "flex-start" : "center"}
      width="100%"
      >
        {isDesktop && <LocalPhone htmlColor={colors.white} sx={{ visibility: "hidden" }} />}
        {isDesktop && <Box width="9px" />}
        <Typography fontSize="16px" color={colors.white} textAlign={!isDesktop ? "center" : "left"}>
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
        bottom: "10px",
        textAlign: isDesktop ? "unset" : "center",
        width: isDesktop ? "unset" : "100%",
      }}
    >
      © WORKMAN AS | {new Date().getFullYear()}
    </Typography>
  );

  // ✅ This return MUST be inside the Home function
  return (
    <Box
      position="relative"
      zIndex={0}
      overflow="hidden"
      sx={{
        backgroundImage: 'url("/assets/hero1.JPG")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        paddingTop: { xs: "80px", md: "100px" },
      }}
    >
      <Overlay sx={{ background: "rgba(34, 14, 14, 0.61)", position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }} />

      <Head>
        <title>{TextContent.pageTitle}</title>
        <meta name="description" content="Workman AS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, position: "relative", zIndex: 1 }}>
        <Box sx={{ flex: "1 1 auto", minWidth: 0 }}>
          <HeroSlide
            alt="workman - oppbygging, utleie"
            content={
              <Box maxWidth="700px">
                <Typography fontWeight="bold" lineHeight="1.2" fontSize="34px" color={colors.white}>Workman.</Typography>
                <Typography fontWeight="400" fontSize="28px" color={colors.white}>Utfordrer mulighetene:</Typography>
                <Typography fontSize="28px" color={colors.white}>•Bygg smart</Typography>
                <Typography fontSize="28px" color={colors.white}>•Bygg bærekraftig</Typography>
                <Typography fontSize="28px" color={colors.white}>•Bygg med oss</Typography>
                <Box height="10px" />
                <Typography fontSize="16px" color={colors.white}>{TextContent.herotext}</Typography>
                <Box height="60px" />
                <Button sx={{ minWidth: "200px" }} variant="contained" component={NextLinkComposed} to={"/om-oss"}>
                  Les mer
                </Button>
              </Box>
            }
          />
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "360px" },
            padding: "20px",
            backgroundColor: "rgba(32, 1, 0, 0.51)",
            color: colors.white,
            marginTop: { xs: 4, md: 0 },
            marginLeft: { md: "20px" },
            marginBottom: "24px",
          }}
        >
          <NextLinkComposed to="/nyheter">
          <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            cursor: "pointer",
            color: colors.white,
            "&:hover": {
              textDecoration: "none",
              opacity: 0.85,
            },
          }}
          >
            Siste Nytt
            </Typography>
            </NextLinkComposed>
          <NewsBar />
        </Box>
      </Box>

      {/* 🔻 Footer Section */}
      <Box
        position="relative"
        sx={{
          backgroundColor: "rgba(32, 1, 0, 0.51)",
          padding: isDesktop ? "60px 32px 100px" : "40px 16px 60px",
          zIndex: 1,
          color: colors.white,
        }}
      >

        <MaxWidthContainer>
        <Grid
        container
        spacing={4}
        direction={isMobile ? "column" : "row"}
        alignItems={isMobile ? "center" : "flex-start"}
        textAlign={isMobile ? "center" : "left"}
        >
          {/* Column 1 */}
          <Grid item xs={12} md={4}>
            <Box
            display="flex"
            justifyContent={{ xs: "center", md: "flex-start" }}>
            <Image
              src="/assets/logo-white.png"
              alt="workman as"
              width={189}
              height={41}
            />
            </Box>
            <Box height="30px" />
            {contactsMarkup}
          </Grid>

{/* Column 2 */}
<Grid item xs={12} md={4}>
  <Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  textAlign="center"
  >
    <Typography
    fontSize="24px"
    fontWeight="bold"
    gutterBottom
    >
      Sidekart
    </Typography>
    <Box
  display="flex"
  justifyContent="center"
  width="100%"
>
  <Box
    display="flex"
    flexDirection="row"
    sx={{
      flexWrap: "nowrap",
      justifyContent: "center",
      gap: 4, // optional spacing between columns
      '@media (max-width:600px)': {
        flexWrap: "nowrap",
      },
    }}
  >
    {/* Left link list column */}
    <Box minWidth="100px">
      <List sx={{ padding: 0 }}>
        <ListItem sx={{ padding: 0, justifyContent: "left" }}>
          <NextLinkComposed to="/">
            <Typography fontSize="16px" color={colors.white}>Forside</Typography>
          </NextLinkComposed>
        </ListItem>
        <ListItem sx={{ padding: 0, justifyContent: "left" }}>
          <NextLinkComposed to="/tjenester">
            <Typography fontSize="16px" color={colors.white}>Tjenester</Typography>
          </NextLinkComposed>
        </ListItem>
        <ListItem sx={{ padding: 0, justifyContent: "left" }}>
          <NextLinkComposed to="/prosjekter">
            <Typography fontSize="16px" color={colors.white}>Prosjekter</Typography>
          </NextLinkComposed>
        </ListItem>
      </List>
    </Box>

    {/* Right link list column */}
    <Box minWidth="100px">
      <List sx={{ padding: 0 }}>
        <ListItem sx={{ padding: 0, justifyContent: "left" }}>
          <NextLinkComposed to="/om-oss">
            <Typography fontSize="16px" color={colors.white}>Om oss</Typography>
          </NextLinkComposed>
        </ListItem>
        <ListItem sx={{ padding: 0, justifyContent: "left" }}>
          <NextLinkComposed to="/apenhetsloven">
            <Typography fontSize="16px" color={colors.white}>Åpenhetsloven</Typography>
          </NextLinkComposed>
        </ListItem>
        <ListItem sx={{ padding: 0, justifyContent: "left" }}>
          <NextLinkComposed to="/kontakt">
            <Typography fontSize="16px" color={colors.white}>Kontakt</Typography>
          </NextLinkComposed>
        </ListItem>
      </List>
    </Box>
  </Box>
</Box>


  </Box>
</Grid>


          {/* Column 3 */}
          <Grid item xs={12} md={4} textAlign={isDesktop ? "right" : "center"}>
            <Typography fontSize="24px" fontWeight="bold" gutterBottom>
              Åpningstider
            </Typography>
            <Typography fontSize="16px">
              Mandag – fredag: 07.00 - 15.30
            </Typography>
            <Typography fontSize="16px">
              Lørdag – søndag: Stengt
            </Typography>
          </Grid>
        </Grid>

        <Box height={isMobile ? "40px" : 0} />

        {/* Logos row */}
        <Box
          mt={0}
          display="flex"
          flexWrap="wrap"
          justifyContent={isDesktop ? "flex-end" : "center"}
          alignItems="center"
          gap="0px"
        >
          {[
            { name: "larebedrift.png", width: 80 },
            { name: "gaselle.png", width: 90 },
            { name: "sg.png", width: 90 },
            { name: "startbank.jpeg", width: 90 },
            { name: "ccc-white5.png", width: 160 },
            { name: "mindelina_white2.png", width: 160 },
          ].map(({ name, width }) => (
            <Box
              key={name}
              position="relative"
              width={`${width}px`}
              minHeight="80px"
            >
              <Image
                layout="fill"
                objectFit="contain"
                src={`/assets/${name}`}
                alt={name}
              />
            </Box>
          ))}
        </Box>

        <Box
        mt={isMobile ? 2 : 3}
        textAlign="center"
        position={isMobile ? "static" : "relative"}
        >
          {authorMark}
        </Box>
        </MaxWidthContainer>
      </Box>
    </Box>
  );
};

export default Home;

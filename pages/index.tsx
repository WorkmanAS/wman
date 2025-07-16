import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import NewsBar from "../src/components/sections/NewsBar";
import {
  CallUsBack,
  HeroSlide,
  Layout,
  NextLinkComposed,
  ProjectCard,
  SectionTitle,
  ShortServiceCard,
} from "../src/components";
import TextContent from "../src/content/home";
import { projects, services } from "../src/data";
import { useClientSize } from "../src/hooks";
import { colors } from "../src/styles/colors";
import { MaxWidthContainer, Overlay } from "../src/styles/globalStyled";
import { NextPageWithLayout } from "./_app";


const Home: NextPageWithLayout = () => {
  const { isMobile } = useClientSize();

  return (
    <Box
    position="relative"
    overflow="hidden"
    sx={{
      backgroundImage: 'url("/assets/hero1.JPG")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    }}
    >
            <Overlay
            sx={{
              background: "rgba(34, 14, 14, 0.61)",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
              }}
              />

      <Head>
        <title>{TextContent.pageTitle}</title>
        <meta name="description" content="Workman AS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
<Box
sx={{
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  position: "realtive",
  zIndex: 1,
}}
>

  <Box
  sx={{
    flex: "1 1 auto",
    minWidth: 0,
  }}
  >
<HeroSlide
  alt="workman - oppbygging, utleie"
  content={
        <Box maxWidth="700px">
          <Typography fontWeight="bold" lineHeight={"1.2"} fontSize="34px" color={colors.white}>
            Workman.
          </Typography>
          <Typography fontWeight="400" lineHeight={"1.2"} fontSize="28px" color={colors.white}>
            Utfordrer mulighetene:
          </Typography>
          <Typography fontWeight="400" lineHeight={"1.2"} fontSize="28px" color={colors.white}>
            •Bygg smart
          </Typography>
          <Typography fontWeight="400" lineHeight={"1.2"} fontSize="28px" color={colors.white}>
            •Bygg bærekraftig
          </Typography>
          <Typography fontWeight="400" lineHeight={"1.2"} fontSize="28px" color={colors.white}>
            •Bygg med oss
          </Typography>
          <Box height="10px" />
          <Typography fontSize="16px" color={colors.white}>
            {TextContent.herotext}
          </Typography>
          <Box height="60px" />
          <Button
            sx={{ minWidth: "200px" }}
            variant="contained"
            component={NextLinkComposed}
            to={"/om-oss"}
          >
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
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: "12px",
    color: colors.white,
    marginTop: { xs: 4, md: 0 },
    marginLeft: { md: "20px" },
  }}
>
  <Typography variant="h5" fontWeight="bold" gutterBottom>
    Siste Nytt
  </Typography>
  <NewsBar />
</Box>
</Box>


      {/* <CallUsBack /> */}

      {/* <MaxWidthContainer
        padding={isMobile ? "50px 16px" : "100px 16px"}
        {...(isMobile && { textAlign: "center" })}
      >
        <SectionTitle title={"Utvalgte prosjekter"} />

        <Box height="60px" />
        <Grid container spacing={4}>
          {projects
            .filter((p) => p.isFavorite)
            .map((project) => (
              <Grid item md={3} sm={6} xs={12} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
        </Grid>

        <Box height={isMobile ? "50px" : "100px"} />

        <Box textAlign={"center"}>
          <Button
            sx={{ minWidth: "200px" }}
            variant="contained"
            component={NextLinkComposed}
            to={"/prosjekter"}
          >
            Alle prosjekter
          </Button>
        </Box>
      </MaxWidthContainer> */}
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
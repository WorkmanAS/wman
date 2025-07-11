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
import { MaxWidthContainer } from "../src/styles/globalStyled";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const { isMobile } = useClientSize();

  return (
    <Box position="relative" overflow="hidden">
      <Head>
        <title>{TextContent.pageTitle}</title>
        <meta name="description" content="Workman AS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

<HeroSlide
  image={"/assets/hero1.JPG"}
  alt="workman - oppbygging, utleie"
  content={
    <Grid container spacing={4} alignItems="flex-start">
      {/* Left column: intro text */}
      <Grid item xs={12} md={8}>
        <Box>
          <Typography fontWeight="bold" lineHeight={"1.2"} fontSize="34px" color={colors.white}>
            Workman.
          </Typography>
          <Typography fontWeight="400" lineHeight={"1.2"} fontSize="34px" color={colors.white}>
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
      </Grid>

      {/* Right column: NewsBar */}
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            color: colors.white,
            borderRadius: "12px",
            padding: "20px",
            maxWidth: "600px",
            marginLeft: "auto",
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Siste Nytt
          </Typography>
          <NewsBar />
        </Box>
      </Grid>
    </Grid>
  }
/>


      {/* This is the new white line */}
      <Box
        sx={{
          height: "10px",  // Minimal height
          backgroundColor: "brown",
          borderRadius: "1px",  // Rounded corners (can remove if not needed)
          margin: "0 auto",  // Centers the line horizontally
          padding: "0",  // Removes extra padding
          width: "80%",  // Adjusts width for responsiveness
        }}
      />
      <Box
      sx={{
        height: "10px",
        backgroundColor: "brown",
        borderRadius: "1px",
        margin: "0 auto",
        padding: "0",
        width: "80%",
        }}
      />

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
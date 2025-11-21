import { Box, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";
import {
  HeroSlide,
  Layout,
  MyBreadCrumbs,
  ServiceCard,
} from "../../src/components";
import TextContent from "../../src/content/home";
import { extraService, services } from "../../src/data/services";
import { useClientSize } from "../../src/hooks";
import { colors } from "../../src/styles/colors";
import { MaxWidthContainer } from "../../src/styles/globalStyled";
import { NextPageWithLayout } from "../_app";

const Services: NextPageWithLayout = () => {
  const { isMobile } = useClientSize();

  return (
    <Box position="relative" overflow="hidden">
      <Head>
        <title>{TextContent.pageServicesTitle}</title>
        <meta name="description" content="Workman AS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSlide
        dense
        image={"/assets/Construction_city.jpg"}
        alt="workman - oppbygging, utleie"
        minHeight="300px"
        hideTitleOverlay
        content={
          <Box>
            <Typography fontWeight="bold" fontSize="34px" color={colors.white}>
              Tjenester
            </Typography>
            {/* <Box height="10px" />
            <Typography fontSize="16px" color={colors.white}>
              {TextContent.herotextServices}
            </Typography> */}
          </Box>
        }
      />

      <MaxWidthContainer
        padding={isMobile ? "20px 16px" : "20px 16px"}
        {...(isMobile && { textAlign: "center" })}
      >
        <MyBreadCrumbs path={[{ title: "Tjenester", href: "/tjenester" }]} />
        <Box height={"25px"} />
      </MaxWidthContainer>

      <MaxWidthContainer
        padding={isMobile ? "0px 0px" : "0px 16px"}
        {...(isMobile && { textAlign: "center" })}
      >
        <Grid container spacing={4}>
          <Grid item md={6} sm={6} xs={12}>
            <Box>
              <ServiceCard service={services[0]} />
            </Box>

            <Box height="30px" />
            <Box>
              <ServiceCard service={services[2]} />
            </Box>
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <ServiceCard service={services[1]} />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <ServiceCard service={services[3]} />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <ServiceCard service={extraService} />
          </Grid>
        </Grid>
      </MaxWidthContainer>

      <Box height={"70px"} />
    </Box>
  );
};

Services.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Services;

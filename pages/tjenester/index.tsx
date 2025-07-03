import { Box, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement, useState } from "react";
import {
  HeroSlide,
  Layout,
  MyBreadCrumbs,
  ProjectCard,
  ProjectFilters,
  SectionTitle,
  ServiceCard,
  TeamMember,
} from "../../src/components";
import TextContent from "../../src/content/home";
import { extraService, projects, services } from "../../src/data";
import { teamMembers } from "../../src/data/teamMembers";
import { useClientSize } from "../../src/hooks";
import { ServiceType } from "../../src/lib/types";
import { colors } from "../../src/styles/colors";
import { MaxWidthContainer } from "../../src/styles/globalStyled";
import { NextPageWithLayout } from "../_app";

const Services: NextPageWithLayout = () => {
  const { isDesktop, isMobile } = useClientSize();
  const [activeFilter, setActiveFilter] = useState<ServiceType | "Alle">(
    "Alle"
  );

  const currentProjects = projects.filter((p) =>
    activeFilter === "Alle" ? p : p.type === activeFilter
  );

  return (
    <Box position="relative" overflow="hidden">
      <Head>
        <title>{TextContent.pageServicesTitle}</title>
        <meta name="description" content="Workman AS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSlide
        dense
        image={"/assets/projects-hero.jpeg"}
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

      {/* 
      <MaxWidthContainer
        padding={isMobile ? "20px 16px" : "20px 16px"}
        {...(isMobile && { textAlign: "center" })}
      >
        <SectionTitle title={"Kontaktpersoner"} />
        <Box height="30px" />

        <Grid container spacing={4}>
          {teamMembers.map((member) => (
            <Grid
              display="flex"
              justifyContent={"center"}
              item
              md={3}
              sm={4}
              xs={12}
              key={member.id}
            >
              <TeamMember member={member} />
            </Grid>
          ))}
        </Grid>
      </MaxWidthContainer>

      <Box height={isMobile ? "30px" : "70px"} />

      <MaxWidthContainer
        padding={isMobile ? "20px 16px" : "20px 16px"}
        {...(isMobile && { textAlign: "center" })}
      >
        <SectionTitle title={"Referanser"} />
        <Typography fontSize="16px">
          {TextContent.referancesSubtitle}
        </Typography>
        <Box height="30px" />

        <Box>
          <ProjectFilters
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          <Box height="50px" />

          <Grid container spacing={4}>
            {currentProjects.map((project) => (
              <Grid item md={3} xs={12} sm={4} key={project.id}>
                <ProjectCard project={project} />
              </Grid>
            ))}
          </Grid>

          <Box height="100px" />
        </Box>
      </MaxWidthContainer> */}
    </Box>
  );
};

Services.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Services;

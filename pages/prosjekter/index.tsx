import { Box, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement, useState } from "react";
import {
  HeroSlide,
  Layout,
  MyBreadCrumbs,
  ProjectCard,
  ProjectFilters,
} from "../../src/components";
import TextContent from "../../src/content/home";
import { projects } from "../../src/data";
import { useClientSize } from "../../src/hooks";
import { ServiceType } from "../../src/lib/types";
import { colors } from "../../src/styles/colors";
import { MaxWidthContainer } from "../../src/styles/globalStyled";
import { NextPageWithLayout } from "../_app";

const Projects: NextPageWithLayout = () => {
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
        <title>{TextContent.pageProjectsTitle}</title>
        <meta name="description" content="Workman AS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSlide
        dense
        image={"/assets/pr.jpg"}
        alt="workman - oppbygging, utleie"
        content={
          <Box>
            <Typography fontWeight="bold" fontSize="34px" color={colors.white}>
              Prosjekter
            </Typography>
            {/* <Box height="10px" />
            <Typography fontSize="16px" color={colors.white}>
              {TextContent.herotextProjects}
            </Typography> */}
          </Box>
        }
      />

      <MaxWidthContainer
        padding={isMobile ? "20px 16px" : "20px 16px"}
        {...(isMobile && { textAlign: "center" })}
      >
        <MyBreadCrumbs path={[{ title: "Prosjekter", href: "/prosjekter" }]} />
        <Box height={isDesktop ? "50px" : "25px"} />

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
      </MaxWidthContainer>
    </Box>
  );
};

Projects.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Projects;

import { Box, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import {
  HeroSlide,
  Layout,
  MyBreadCrumbs,
  ProjectCard,
  ProjectFilters,
} from "../../src/components";
import TextContent from "../../src/content/home";
import { useClientSize } from "../../src/hooks";
import { IProject, ServiceType } from "../../src/lib/types";
import { colors } from "../../src/styles/colors";
import { MaxWidthContainer } from "../../src/styles/globalStyled";
import { NextPageWithLayout } from "../_app";

type ApiProject = {
  id: string;
  title: string;
  shortDescription?: string;
  description?: string;
  address?: string;
  customer?: string;
  type: "Bygginredning" | "Entreprenør" | "Renovering" | "Serviceoppdrag";
  slug: string;
  cover?: string;
  middlePic?: string;
  afterPicDiscription?: string;
  pictures: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
  published: boolean;
};

const apiTypeToServiceType: Record<ApiProject["type"], ServiceType> = {
  Bygginredning: ServiceType.BYGGINREDNING,
  Entreprenør: ServiceType.ENTREPRENØR,
  Renovering: ServiceType.RENOVERING,
  Serviceoppdrag: ServiceType.SERVICEOPPDRAG,
};

function mapApiToProject(p: ApiProject): IProject {
  return {
    id: p.id,
    type: apiTypeToServiceType[p.type],
    title: p.title,
    isFavorite: false,
    homeDescription: p.shortDescription || p.customer || "",
    address: p.address || "",
    description: p.description || "",
    shortDescription: p.shortDescription || "",
    afterPicDiscription: p.afterPicDiscription || "",
    customer: p.customer || "",
    hero: p.cover || p.middlePic || p.pictures[0] || "/assets/projects-hero.jpg",
    middlePic: p.middlePic || p.cover || p.pictures[0] || "",
    pictures: p.pictures || [],
  };
}


const Projects: NextPageWithLayout = () => {
  const { isDesktop, isMobile } = useClientSize();
  const [activeFilter, setActiveFilter] = useState<ServiceType | "Alle">("Alle");
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/projects");
        const data: ApiProject[] = await res.json();
        const mapped = data
        .filter((p) => p.published !== false)
        .map(mapApiToProject);
        setProjects(mapped);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [])

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

          {loading && <Typography>Loading...</Typography>}
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

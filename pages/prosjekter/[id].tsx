import { Box, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  BoldTitle,
  HeroSlide,
  Layout,
  MyBreadCrumbs,
  ProjectCard,
  ProjectFilters,
} from "../../src/components";
import { FullscreenLoader } from "../../src/components/layout/FullscreenLoader";
import TextContent from "../../src/content/home";
import { useClientSize } from "../../src/hooks";
import { IProject, ServiceType } from "../../src/lib/types";
import { colors } from "../../src/styles/colors";
import { MaxWidthContainer, Overlay } from "../../src/styles/globalStyled";
import { NextPageWithLayout } from "../_app";
import Image from "next/image";

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


const Project: NextPageWithLayout = () => {
  const { isDesktop, isMobile } = useClientSize();
  const router = useRouter();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const id = router.query.id;
    if (!id || typeof id !== "string") return;

    async function load() {
      try {
        const res = await fetch(`/api/projects?id=${id}`);
        if (!res.ok) {
          router.replace("/404");
          return;
        }
        const data: ApiProject = await res.json();
        setProject(mapApiToProject(data));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  if (loading || !project) return <FullscreenLoader />;

  return (
    <Layout>
      <Box position="relative" overflow="hidden">
        <Head>
          <title>{TextContent.pageProjectTitle}</title>
          <meta name="description" content="Workman AS" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <HeroSlide
          image={"/assets/projects-hero.jpg"}
          alt="workman - oppbygging, utleie"
          backButton={{
            pathname: "/prosjekter",
            title: "Tilbake til prosjekter",
          }}
          content={
            <Box>
              <Typography
                fontWeight="bold"
                fontSize="34px"
                color={colors.white}
              >
                {project.title}
              </Typography>
              <Box height="10px" />
              <Typography fontSize="16px" color={colors.white}>
                {project.shortDescription}
              </Typography>
            </Box>
          }
        />

        <MaxWidthContainer
          padding={isMobile ? "20px 16px" : "20px 16px"}
          {...(isMobile && { textAlign: "center" })}
        >
          <MyBreadCrumbs
            path={[
              { title: "Prosjekter", href: "/prosjekter" },
              { title: project.title },
            ]}
          />
          <Box height={"25px"} />

          <BoldTitle title="Sted" value={project.address} />
          <BoldTitle title="Kunde" value={project.customer} />
          <BoldTitle title="Tjeneste" value={TextContent[project.type]} />

          <Box height={"25px"} />

          <div dangerouslySetInnerHTML={{ __html: project.description }} />

          {project.middlePic && (
            <Box marginY={4} height="300px" width="100%" position="relative">
              <Image
                src={project.middlePic}
                blurDataURL={project.middlePic}
                placeholder="blur"
                objectFit="cover"
                layout="fill"
		alt="Projekt intern bilde"
              />
            </Box>
          )}

          {project.afterPicDiscription && (
            <div
              dangerouslySetInnerHTML={{ __html: project.afterPicDiscription }}
            />
          )}

          <Grid container spacing={2} marginY={4}>
            {project.pictures.map((pic) => (
              <Grid item md={3} sm={4} xs={12} key={pic}>
                <Box height="420px" position="relative">
                  <Image
                    src={pic}
                    blurDataURL={pic}
                    placeholder="blur"
                    objectFit="cover"
                    layout="fill"
		    alt="map"
                  />

                  <Overlay
                    sx={{
                      background:
                        "linear-gradient(359.33deg, rgba(0, 0, 0, 0.62) -7.77%, rgba(0, 0, 0, 0) 118.03%);",
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* 
       

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
       */}
        </MaxWidthContainer>
      </Box>
    </Layout>
  );
};

export default Project;

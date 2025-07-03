import { Box, Button, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import {
  CallUsBack,
  HeroSlide,
  Layout,
  MyBreadCrumbs,
  NextLinkComposed,
  ProjectCard,
  RequestForm,
  SectionTitle,
  ShortServiceCard,
  TeamMember,
} from "../src/components";
import TextContent from "../src/content/home";
import { projects, services } from "../src/data";
import { useClientSize } from "../src/hooks";
import { colors } from "../src/styles/colors";
import { MaxWidthContainer, Overlay } from "../src/styles/globalStyled";
import { NextPageWithLayout } from "./_app";
import SalesIcon from "../src/icons/turnover1.svg";
import TurnoverIcon from "../src/icons/turnover.svg";
import EmployeesIcon from "../src/icons/employees.svg";
import { teamMembers } from "../src/data/teamMembers";
import { MapComponent } from "../src/components/utils/MapComponent";

const ContactUs: NextPageWithLayout = () => {
  const { isDesktop, isTablet, isMobile } = useClientSize();

  const contacts = (
    <Box
      position="relative"
      padding={isDesktop ? "50px" : "50px 20px 50px 20px"}
    >
      <Typography
        fontSize="36px"
        color="white"
        {...(!isDesktop && { textAlign: "center" })}
      >
        Workman AS
      </Typography>
      <Box height="30px" />
      <Grid container>
        <Grid item md={3} sm={5} xs={6}>
          <Typography color="white" fontSize="16px" fontWeight="bold">
            Telefon:
          </Typography>
        </Grid>
        <Grid item md={9} sm={7} xs={6}>
          <a href={`callto:+4745141345`}>
            <Typography color="white" fontSize="16px" fontWeight={400}>
              +47 45 14 13 45
            </Typography>
          </a>
        </Grid>

        <Grid item md={3} sm={5} xs={6}>
          <Typography color="white" fontSize="16px" fontWeight="bold">
            Epost:
          </Typography>
          <br />
        </Grid>
        <Grid item md={9} sm={7} xs={6}>
          <a href={`malto:post@wman.no`}>
            <Typography color="white" fontSize="16px" fontWeight={400}>
              post@wman.no
            </Typography>
          </a>
        </Grid>

        <Grid item md={3} sm={5} xs={6}>
          <Typography color="white" fontSize="16px" fontWeight="bold">
            Org. nr:
          </Typography>
          <br />
        </Grid>
        <Grid item md={9} sm={7} xs={6}>
          <Typography color="white" fontSize="16px" fontWeight={400}>
            997 306 503
          </Typography>
        </Grid>

        <Grid item md={3} sm={5} xs={6}>
          <Typography color="white" fontSize="16px" fontWeight="bold">
            Adresse:
          </Typography>
          <br />
        </Grid>
        <Grid item md={9} sm={7} xs={6}>
          <Typography color="white" fontSize="16px" fontWeight={400}>
            Inngang 3 Hasleveien 28
          </Typography>
          <Typography color="white" fontSize="16px" fontWeight={400}>
            0571 Oslo
          </Typography>
          <br />
        </Grid>

        <Grid item md={3} sm={5} xs={6}>
          <Typography color="white" fontSize="16px" fontWeight="bold">
            Åpningstider:
          </Typography>
        </Grid>
        <Grid item md={9} sm={7} xs={6}>
          <Typography color="white" fontSize="16px" fontWeight={400}>
            Mandag - fredag
          </Typography>
          <Typography color="white" fontSize="16px" fontWeight={400}>
            07.00 - 15.30
          </Typography>
          <br />
          <Typography color="white" fontSize="16px" fontWeight={400}>
            Lørdag - søndag
          </Typography>
          <Typography color="white" fontSize="16px" fontWeight={400}>
            Stengt
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box position="relative" overflow="hidden">
      <Head>
        <title>{TextContent.aboutUspageTitle}</title>
        <meta name="description" content="Workman AS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSlide
        image={"/assets/ctx-hero.jpg"}
        alt="workman - oppbygging, utleie"
        content={
          <Box>
            <Typography fontWeight="bold" fontSize="34px" color={colors.white}>
              Kontakt
            </Typography>
          </Box>
        }
      />

      <MaxWidthContainer
        padding={isMobile ? "20px 16px" : "20px 16px"}
        {...(isMobile && { textAlign: "center" })}
      >
        <MyBreadCrumbs path={[{ title: "Kontakt oss", href: "/kontakt" }]} />
        <Box height={"25px"} />
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

      <Box width="100%" position="relative" margin="60px 0">
        {isDesktop && (
          <Box position="absolute" width="100%" height="100%">
            <Box position="relative" width="100%" height="100%">
              <Overlay sx={{ background: "rgba(34, 14, 14, 0.5)" }}>
                <MapComponent />
              </Overlay>
            </Box>
          </Box>
        )}

        {isDesktop ? (
          <MaxWidthContainer
            padding={"0"}
            {...(isMobile && { textAlign: "center" })}
          >
            <Box position="relative" width="700px">
              <Overlay sx={{ background: "#220E0E" }}></Overlay>
              <Overlay sx={{ opacity: 0.1 }}>
                <Image
                  src={"/assets/contact-us.jpg"}
                  blurDataURL={"/assets/contact-us.jpg"}
                  placeholder="blur"
                  objectFit="cover"
                  layout="fill"
		  alt="kontakt us"
                />
              </Overlay>
              {contacts}
            </Box>
          </MaxWidthContainer>
        ) : (
          <Box>
            <Box position="relative" width="100%">
              <Overlay sx={{ background: "#220E0E" }}></Overlay>
              <Overlay sx={{ opacity: 0.1 }}>
                <Image
                  src={"/assets/contact-us.jpg"}
                  blurDataURL={"/assets/contact-us.jpg"}
                  placeholder="blur"
                  objectFit="cover"
                  layout="fill"
		  alt="kontakt oss"
                />
              </Overlay>
              <Box maxWidth="65%" margin="auto">
                {contacts}
              </Box>
            </Box>
            <Box position="relative" height="500px" width="100%">
              <MapComponent />
            </Box>
          </Box>
        )}
      </Box>

      <MaxWidthContainer padding={isMobile ? "20px 16px" : "20px 16px"}>
        <SectionTitle title="Forespørsel" />
        <Box height="30px" />
        <RequestForm />

        <Box height="50px" />
      </MaxWidthContainer>
    </Box>
  );
};

ContactUs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ContactUs;

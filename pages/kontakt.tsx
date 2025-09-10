// pages/kontakt.tsx
import { Box, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";
import {
  HeroSlide,
  Layout,
  MyBreadCrumbs,
  RequestForm,
  SectionTitle,
  TeamMember,
} from "../src/components";
import TextContent from "../src/content/home";
import { useClientSize } from "../src/hooks";
import { colors } from "../src/styles/colors";
import { MaxWidthContainer, Overlay } from "../src/styles/globalStyled";
import { NextPageWithLayout } from "./_app";
import fs from "fs/promises";
import path from "path";

type Employee = {
  id: number;
  name: string;
  title: string;
  phone?: string;
  email?: string;
  image?: string;
  order?: number;
};

type Props = {
  employees: Employee[];
};

const ContactUs: NextPageWithLayout<Props> = ({ employees }) => {
  const { isDesktop, isMobile } = useClientSize();

  const normalizedMembers = employees.map((e) => {
    const src =
    e.image && e.image.trim().length > 0
    ? e.image
    : "/assets/team_png/magomed.png";

    return {
      id: e.id,
      name: e.name,
      position: e.title,
      phone: e.phone,
      email: e.email,

      pic: src,

      title: e.title,
    };
  });

  const contacts = (
    <Box position="relative" padding={isDesktop ? "50px" : "50px 20px 50px 20px"}>
      <Typography fontSize="36px" color="white" {...(!isDesktop && { textAlign: "center" })}>
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
          <a href="tel:+4745141345">
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
          <a href="mailto:post@wman.no">
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

      <MaxWidthContainer padding={isMobile ? "20px 16px" : "20px 16px"} {...(isMobile && { textAlign: "center" })}>
        <MyBreadCrumbs path={[{ title: "Kontakt oss", href: "/kontakt" }]} />
        <Box height={"25px"} />
        <SectionTitle title={"Kontaktpersoner"} />
        <Box height="30px" />

        <Grid container spacing={4}>
          {normalizedMembers.map((member) => (
            <Grid display="flex" justifyContent="center" item md={3} sm={4} xs={12} key={member.id}>
              <TeamMember member={member as any} />
            </Grid>
          ))}
        </Grid>
      </MaxWidthContainer>

      <Box width="100%" position="relative" margin="60px 0">
        {isDesktop ? (
          <MaxWidthContainer padding={"0"} {...(isMobile && { textAlign: "center" })}>
            <Box position="relative" width="700px">
              <Overlay sx={{ background: "#220E0E" }} />
              <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: 'url("/assets/contact-us.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.1,
              }}
              />

              {contacts}
            </Box>
          </MaxWidthContainer>
        ) : (
          <Box>
            <Box position="relative" width="100%">
              <Overlay sx={{ background: "#220E0E" }} />
              <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: 'url("/assets/contact-us.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.1,
              }}
              />

              <Box maxWidth="65%" margin="auto">
                {contacts}
              </Box>
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

// --- Server-side data (reads the same JSON the admin UI writes) ---
export async function getStaticProps() {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const file = await fs.readFile(path.join(dataDir, "employees.json"), "utf8");
    const raw: Employee[] = JSON.parse(file);

    const employees = raw.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    return { props: { employees }, revalidate: 60 }; // ISR: refresh up to once per minute
  } catch {
    // Fail-safe: page still builds, just with an empty list
    return { props: { employees: [] }, revalidate: 60 };
  }
}

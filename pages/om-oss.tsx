import { Box, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { HeroSlide, Layout, MyBreadCrumbs } from "../src/components";
import TextContent from "../src/content/home";
import { useClientSize } from "../src/hooks";
import { colors } from "../src/styles/colors";
import { MaxWidthContainer, Overlay } from "../src/styles/globalStyled";
import { NextPageWithLayout } from "./_app";

const AboutUs: NextPageWithLayout = () => {
  const { isDesktop, isTablet, isMobile } = useClientSize();

  return (
    <Box position="relative" overflow="hidden">
      <Head>
        <title>{TextContent.aboutUspageTitle}</title>
        <meta name="description" content="Workman AS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSlide
        image={"/assets/contact-hero.jpeg"}
        alt="workman - oppbygging, utleie"
        content={
          <Box>
            <Typography fontWeight="bold" fontSize="34px" color={colors.white}>
              Om oss
            </Typography>
            <Box height="10px" />
            <Typography fontSize="16px" color={colors.white}>
              Workman AS er en byggentreprenør basert i Oslo med bred kompetanse
              innen byggeteknikk og prosjektgjennomføring etter NS 8405 og NS
              8407. Vi påtar oss oppdrag innen nybygg, rehabilitering, service
              og bygginnredning.
            </Typography>
          </Box>
        }
      />

      <MaxWidthContainer
        padding={isMobile ? "20px 16px" : "20px 16px"}
        {...(isMobile && { textAlign: "center" })}
      >
        <MyBreadCrumbs path={[{ title: "Om oss", href: "/om-oss" }]} />
        <Box height={"25px"} />

        <Box>
          <Box>
            <Typography
              fontSize="16px"
              textAlign="justify"
              {...(!isDesktop && { textAlign: "center" })}
            >
              Workman AS ble etablert i 2011 som et entreprenørselskap innen
              bygg- og anleggsbransjen. Siden den gang har vi utviklet oss til å
              bli en solid aktør som profesjonell byggentreprenør med over 90
              ansatte. Våre virksomhetsområder omfatter nybygg, rehabilitering,
              service og bygginnredning.
              <br />
              <br />
              Vi søker alltid å utfordre mulighetene og legger stor vekt på
              kompetanse og kvalitet, samtidig som vi alltid imøtekommer våre
              kunders behov. Våre oppdrag gjennomføres etter gjeldende
              forskrifter og ferdigstilles til avtalte tider.
              <Box
                position="relative"
                height={isMobile ? "200px" : isTablet ? "250px" : "300px"}
                marginY={isMobile ? 1 : 2}
              >
                <Image
                  src={"/assets/car5.jpg"}
                  blurDataURL={"/assets/car5.jpg"}
                  placeholder="blur"
                  alt={"workman as"}
                  layout={"fill"}
                  objectFit={"contain"}
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                />
              </Box>
              HMS (helse, miljø og sikkerhet) er svært viktig for oss, og vi
              legger stor vekt på å sikre en trygg og sikker arbeidsplass for
              alle medarbeidere slik at de kan komme trygt hjem fra jobb hver
              dag. Gjennom kontinuerlig forbedring og opplæring har vi som mål å
              oppnå null skader og ulykker.
              <br />
              <br />
              Workman AS omfattes av åpenhetsloven som skal fremme virksomheters
              respekt for grunnleggende menneskerettigheter og anstendige
              arbeidsforhold. Nærmere informasjon om redegjørelser fra Workman
              AS og annen{" "}
              <Link href={"/apenhetsloven"}>
                <a style={{ textDecoration: "underline", color: "red" }}>
                  informasjon om åpenhetsloven finner du her
                </a>
              </Link>
              .
              <br />
              <br />
              Vi har implementert systemer, rutiner og prosedyrer som hjelper
              oss med å tilrettelegge og planlegge for sikker og effektiv
              produksjon. Dette, kombinert med sunne holdninger og sterke
              verdier, gjør oss til en av bransjens ledende aktører når det
              gjelder sikkerhet.
              <br />
              <br />
              Ved utgangen av 2023 ble det besluttet at Workman vil flytte til
              Construction City etter at forretningsbygningen er ferdigstilt i
              2025. Øyeblikket når alle topprepresentanter innen byggebransjen i
              Norge samles på ett sted for å utveksle erfaringer og forme vår
              felles fremtid, er en mulighet vi ikke kunne la gå fra oss. Men vi
              gikk enda lenger og ble medlemmer i CCC - Construction City
              Cluster, for å være en del av de beste, lære av de beste og
              selvfølgelig bidra med vår kompetanse og erfaring til utviklingen
              av byggebransjen.
            </Typography>
          </Box>
        </Box>

        <Box height="25px" />
        <Box display="flex" gap="15px" justifyContent={"center"}>
        <Box position="relative" width="100px" height="100px">
            <Image
              objectFit="contain"
              src="/assets/larebedrift-black.png"
              alt="larebedrift"
              layout="fill"
            />
          </Box>
  	<Box position="relative" width="100px" height="100px">
            <Image
              objectFit="contain"
              src="/assets/gaselle.png"
              alt="gaselle-bedrift"
              layout="fill"
            />
          </Box>
          <Box position="relative" width="100px" height="100px">
            <Image
              objectFit="contain"
              layout="fill"
              src="/assets/sg.png"
              alt="sg"
            />
          </Box>
          <Box position="relative" width="100px" height="100px">
            <Image
              objectFit="contain"
              layout="fill"
              src="/assets/startbank.jpeg"
              alt="startbank"
            />
          </Box>
		  <Box position="relative" width="140px" height="100px">
            <Image
              objectFit="contain"
              layout="fill"
              src="/assets/files/ccc-cut.png"
              alt="construction-city"
            />
          </Box>
          <Box position="relative" width="160px" height="100px">
            <Image
              objectFit="contain"
              layout="fill"
              src="/assets/files/mindelina-cut.png"
              alt="mindelina"
            />
          </Box>
        </Box>

        {/* <Box height="70px" /> */}
      </MaxWidthContainer>

      {/* <Box width="100%" position="relative">
        <Overlay sx={{ background: "#220E0E" }} />

        <MaxWidthContainer
          padding={isMobile ? "20px 16px" : "0"}
          {...(isMobile && { textAlign: "center" })}
        >
          <Grid container>
            <Grid item md={7} sm={12} xs={12} position="relative">
              <Overlay
                sx={{
                  background:
                    "linear-gradient(89.56deg, #220E0E 83.31%, rgba(34, 14, 14, 0.63) 138.53%);",
                }}
              />

              <Box position="relative" padding="50px 40px 50px 16px">
                <Typography
                  fontSize="36px"
                  color="white"
                  {...(!isDesktop && { textAlign: "center" })}
                >
                  VÅR HISTORIE
                </Typography>
                <Box height="30px" />
                <Typography
                  color="white"
                  fontSize="16px"
                  textAlign="justify"
                  {...(!isDesktop && { textAlign: "center" })}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
              </Box>
            </Grid>
            <Grid item md={5} sm={12} xs={12} position="relative">
              {!isDesktop && (
                <Box position="relative" width="100%" height="300px">
                  <Image
                    src={"/assets/truck.jpg"}
                    blurDataURL={"/assets/truck.jpg"}
                    placeholder="blur"
                    objectFit="cover"
                    layout="fill"
                  />
                  <Overlay
                    sx={{ background: "rgba(34, 14, 14, 0.5)" }}
                  ></Overlay>
                </Box>
              )}
            </Grid>
          </Grid>
        </MaxWidthContainer>

        {isDesktop && (
          <Box
            sx={{
              position: "absolute",
              width: "40%",
              height: "100%",
              top: 0,
              right: 0,
            }}
          >
            <Box position="relative" width="100%" height="100%">
              <Image
                src={"/assets/truck.jpg"}
                blurDataURL={"/assets/truck.jpg"}
                placeholder="blur"
                objectFit="cover"
                layout="fill"
              />
              <Overlay sx={{ background: "rgba(34, 14, 14, 0.5)" }}></Overlay>
            </Box>
          </Box>
        )}
      </Box> */}

      {/* <MaxWidthContainer
        padding={isMobile ? "20px 16px" : "70px 0"}
        {...(isMobile && { textAlign: "center" })}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            item
            md={4}
            sm={12}
            xs={12}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            sx={{
              ...(isDesktop
                ? {
                    borderRight: "1px solid #888",
                  }
                : {
                    borderBottom: "1px solid #888",
                    paddingBottom: "30px",
                    marginBottom: "30px",
                  }),
            }}
          >
            <Box position="relative" width="50px" height="50px">
              <Image
                src={"/assets/icons/turnover1.svg"}
                blurDataURL={"/assets/icons/turnover1.svg"}
                placeholder="blur"
                objectFit="cover"
                layout="fill"
              />
            </Box>
            <Box marginTop="30px" textAlign="center">
              <Typography fontSize="36px">92 MNOK</Typography>
              <Typography fontSize="21px">Omsetning 2021</Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={4}
            sm={12}
            xs={12}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            sx={{
              ...(isDesktop
                ? {
                    borderRight: "1px solid #888",
                  }
                : {
                    borderBottom: "1px solid #888",
                    paddingBottom: "30px",
                    marginBottom: "30px",
                  }),
            }}
          >
            <Box position="relative" width="50px" height="50px">
              <Image
                src={"/assets/icons/turnover.svg"}
                blurDataURL={"/assets/icons/turnover.svg"}
                placeholder="blur"
                objectFit="cover"
                layout="fill"
              />
            </Box>
            <Box marginTop="30px" textAlign="center">
              <Typography fontSize="36px">4,3 MNOK</Typography>
              <Typography fontSize="21px">
                Foreløpig resultat før skatt
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            md={4}
            sm={12}
            xs={12}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
          >
            <Box position="relative" width="50px" height="50px">
              <Image
                src={"/assets/icons/employees.svg"}
                blurDataURL={"/assets/icons/employees.svg"}
                placeholder="blur"
                objectFit="cover"
                layout="fill"
              />
            </Box>

            <Box marginTop="30px" textAlign="center">
              <Typography fontSize="36px">114</Typography>
              <Typography fontSize="21px">Ansatte i Norge</Typography>
            </Box>
          </Grid>
        </Grid>
      </MaxWidthContainer> */}

      <Box width="100%" position="relative" margin="60px 0">
        <Box position="absolute" width="100%" height="100%">
          <Box position="relative" width="100%" height="100%">
            <Image
              src={"/assets/files/sponsor.JPG"}
              blurDataURL={"/assets/files/sponsor.JPG"}
              placeholder="blur"
              objectFit="cover"
              layout="fill"
	      alt="sponsor banner"
            />
            <Overlay sx={{ background: "rgba(34, 14, 14, 0.5)" }} />
          </Box>
        </Box>

        <MaxWidthContainer
          padding={isMobile ? "20px 16px" : "0"}
          {...(isMobile && { textAlign: "center" })}
        >
          <Grid container>
            <Grid item md={7} position="relative">
              <Overlay
                sx={{
                  background: "#ffffffe6",
                }}
              />

              <Box
                position="relative"
                padding={
                  isDesktop ? "50px 40px 50px 16px" : "50px 16px 50px 16px"
                }
              >
                <Typography
                  fontSize="36px"
                  color="black"
                  {...(!isDesktop && { textAlign: "center" })}
                >
                  SPONSOR
                </Typography>
                <Box height="30px" />
                <Typography
                  color="black"
                  fontSize="16px"
                  textAlign="justify"
                  {...(!isDesktop && { textAlign: "center" })}
                >
                  Workman AS skal være en aktiv bidragsyter til lokalsamfunnet.
                  Gjennom vårt sponsorfond ønsker vi å støtte lag,
                  organisasjoner og aktiviteter som er med på å sikre sunne
                  aktiviteter og gode oppvekstsvilkår for barn og unge i Oslo.
                </Typography>
                <br />
                <Typography
                  color="black"
                  fontSize="16px"
                  textAlign="justify"
                  {...(!isDesktop && { textAlign: "center" })}
                >
                  Sponsorfondet skal hvert år dele ut til sammen 100 000 kr og
                  opptil 15 000 per aktivitet.
                </Typography>
                <br />
                <Typography color="black" fontSize="16px" textAlign="justify">
                  En kortfattet søknad med beskrivelse og hvorfor dere mener vi
                  skal gi støtte til deres aktivitet sendes til{" "}
                  <a href={`mailto:post@wman.no`}>post@wman.no</a>.
                </Typography>
              </Box>
            </Grid>
            <Grid item md={5} position="relative"></Grid>
          </Grid>
        </MaxWidthContainer>
      </Box>
    </Box>
  );
};

AboutUs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AboutUs;

import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement } from "react";
import { HeroSlide, Layout, MyBreadCrumbs } from "../../src/components";
import TextContent from "../../src/content/home";
import { useClientSize } from "../../src/hooks";
import { colors } from "../../src/styles/colors";
import { MaxWidthContainer } from "../../src/styles/globalStyled";
import { NextPageWithLayout } from "../_app";

const Apenhetsloven: NextPageWithLayout = () => {
  const { isDesktop, isMobile } = useClientSize();

  return (
    <Box position="relative" overflow="hidden">
      <Head>
        <title>{TextContent.apenhetslovenTitle}</title>
        <meta name="description" content="Workman AS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSlide
        dense
        image={"/assets/apenhetsloven-hero.jpeg"}
        alt="workman - oppbygging, utleie"
        minHeight="300px"
        hideTitleOverlay
        content={
          <Box>
            <Typography fontWeight="bold" fontSize="34px" color={colors.white}>
              Åpenhetsloven
            </Typography>
          </Box>
        }
      />

      <MaxWidthContainer
        padding={isMobile ? "20px 16px" : "20px 16px"}
        {...(isMobile && { textAlign: "center" })}
      >
        <MyBreadCrumbs
          path={[{ title: "Åpenhetsloven", href: "/apenhetsloven" }]}
        />
        <Box height={"25px"} />

        <Box>
          <Box>
            <Typography
              fontSize="16px"
              textAlign="justify"
              {...(!isDesktop && { textAlign: "center" })}
            >
              Åpenhetsloven trådte i kraft 1. juli 2022. Denne loven gjelder for
              større virksomheter og har til formål å fremme virksomheters
              respekt for grunnleggende menneskerettigheter og anstendige
              arbeidsforhold, og sikre allmennheten tilgang til informasjon.
              <br />
              <br />
              Workman AS er omfattet av åpenhetsloven og forpliktet til å
              overholde lovens forpliktelser. Workman har siden etableringen i
              2011 vært opptatt av å respektere grunnleggende
              menneskerettigheter og anstendige arbeidsforhold. Workman AS
              arbeider også for at våre leverandører skal ivareta disse
              rettighetene.
              <br />
              <br />
              Bedrifter som omfattes av åpenhetsloven, er pålagt å gjennomføre
              aktsomhetsvurderinger i egen virksomhet og leverandørkjede.
              Resultatet av aktsomhetsvurderingene skal sammenfattes og
              publiseres i en offentlig tilgjengelig rapport på selskapets
              nettside.
              <br />
              <br />•{" "}
              <a
                href="/assets/04_Redegjørelse_for_2023_om_aktsomhetsvurderinger_etter_åpenhetsloven.pdf"
                download
                className="my-link"
              >
                Redegjørelse fra Workman AS for 2023
              </a>{" "}
              er tilgjengelig som PDF.
              <br />
              <br />•{" "}
              <a
                href="/assets/docs/Redegjørelse fra Workman for 2024.pdf"
                download
                className="my-link"
              >
                Redegjørelse fra Workman AS for 2024
              </a>{" "}
              er tilgjengelig som PDF.
		<br />
		<br />•{" "}
		<a
		 href="/assets/docs/Redegjørelse fra Workman for 2025.pdf"
		 download
		 className="my-link"
		>
		 Redegjørelse fra Workman AS for 2025
		</a>{" "}
		er tilgjengelig som PDF.
              <br />
              <br />
              Åpenhetsloven gir enhver rett til å kreve informasjon om hvordan
              virksomheten håndterer negative konsekvenser for grunnleggende
              menneskerettigheter og anstendige arbeidsforhold. Krav om
              informasjon må fremsettes skriftlig. Workman AS kan avslå
              informasjonskrav i følgende tilfeller:
              <br />
              1. Kravet gir ikke tilstrekkelig grunnlag for å identifisere hva
              kravet gjelder. <br />
              2. Kravet er åpenbart urimelig. <br />
              3. Den etterspurte informasjonen gjelder opplysninger om noens
              personlige forhold. <br />
              4. Den etterspurte informasjonen gjelder opplysninger om tekniske
              innretninger og fremgangsmåter eller andre drifts- eller
              forretningsforhold som det vil være konkurransemessig betydning å
              hemmeligholde av hensyn til de opplysningene angår.
              <br />
              <br />
              Informasjonsforespørsler til Workman kan sendes per e-post til{" "}
              <a className="my-link" href="mailto:post@wman.no">
                post@wman.no
              </a>
              .
              <br />
              <br />
              Dersom man mener at Workman AS ikke oppfyller dets
              informasjonsplikter etter åpenhetsloven, kan man sende inn{" "}
              <a
                className="my-link"
                href="https://skjema.onacos.no/forbrukertilsynet/skjema/FO0033/skjema/FO0033/Klage_p_brudd_p_penhetsloven"
                target="_blank"
                rel="noreferrer"
              >
                klage på brudd på åpenhetsloven
              </a>
              .
              <br />
              <br />
              Vi håper derimot du først klager direkte til Workman AS på e-post
              til{" "}
              <a className="my-link" href="mailto:post@wman.no">
                post@wman.no
              </a>{" "}
              slik at ev. feil eller uklarheter kan avklares raskest mulig.
              <br />
              <br />
            </Typography>
          </Box>
        </Box>
      </MaxWidthContainer>

      <MaxWidthContainer
        padding={isMobile ? "0px 0px" : "0px 16px"}
        {...(isMobile && { textAlign: "center" })}
      ></MaxWidthContainer>

      <Box height={"70px"} />
    </Box>
  );
};

Apenhetsloven.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Apenhetsloven;

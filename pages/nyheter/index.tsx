import { Box, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import {
  HeroSlide,
  Layout,
  MyBreadCrumbs,
} from "../../src/components";
import TextContent from "../../src/content/home";
import { useClientSize } from "../../src/hooks";
import { colors } from "../../src/styles/colors";
import { MaxWidthContainer } from "../../src/styles/globalStyled";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  image?: string;
}

const NewsPage = () => {
  const { isDesktop, isMobile } = useClientSize();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Failed to load news:", err));
  }, []);

  return (
    <Box position="relative" overflow="hidden">
      <Head>
        <title>Nyheter – Workman AS</title>
        <meta name="description" content="Siste nytt fra Workman AS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSlide
        dense
        image={"/assets/projects-hero.jpeg"}
        alt="workman - nyheter"
        minHeight="300px"
        hideTitleOverlay
        content={
          <Box>
            <Typography fontWeight="bold" fontSize="34px" color={colors.white}>
              Nyheter
            </Typography>
          </Box>
        }
      />

      <MaxWidthContainer
        padding={isMobile ? "20px 16px" : "20px 16px"}
        {...(isMobile && { textAlign: "center" })}
      >
        <MyBreadCrumbs path={[{ title: "Nyheter", href: "/nyheter" }]} />
        <Box height={isDesktop ? "50px" : "25px"} />
      </MaxWidthContainer>

      <MaxWidthContainer padding={isMobile ? "0px 16px" : "0px 16px"}>
        <Grid container spacing={6}>
          {news.length === 0 ? (
            <Grid item xs={12}>
              <Typography fontSize="18px">Ingen nyheter tilgjengelig.</Typography>
            </Grid>
          ) : (
            news.map((item) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString("no-NO", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });

              return (
                <Grid item md={6} sm={12} xs={12} key={item.id}>
                  <Box>
                    {item.image && (
                      <Box
                        sx={{
                          width: "100%",
                          overflow: "hidden",
                          borderRadius: "8px",
                          mb: 2,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          style={{ width: "100%", height: "auto", display: "block" }}
                        />
                      </Box>
                    )}
                    <Typography
                      fontSize="20px"
                      fontWeight="bold"
                      color={colors.black}
                      gutterBottom
                    >
                      {formattedDate}: {item.title}
                    </Typography>
                    <Typography fontSize="16px" color={colors.black}>
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              );
            })
          )}
        </Grid>
        <Box height="100px" />
      </MaxWidthContainer>
    </Box>
  );
};

NewsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewsPage;

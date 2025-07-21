import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { colors } from "../../styles/colors";
import Image from "next/image";
import { Overlay } from "../../styles/globalStyled";

interface NewsItem {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  image?: string;
}

const NewsBar = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Failed to load news:", err));
  }, []);

  return (
    <Box
      sx={{
        padding: "0px",
        color: colors.white,
        maxWidth: "400px",
      }}
    >
      <ul style={{ paddingLeft: "1em", margin: 0 }}>
        {news.length === 0 ? (
          <li>
            <Typography variant="body2" sx={{ color: colors.white }}>
              Ingen nyheter tilgjengelig.
            </Typography>
          </li>
        ) : (
          news.map((item) => {
            const formattedDate = new Date(item.createdAt).toLocaleDateString("no-NO", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            });

            return (
              <li key={item.id} style={{ marginBottom: "1.5em" }}>
                <Typography
                sx={{
                  color: colors.white,
                  fontSize: "16px",
                  fontWeight: "bold",
                  lineHeight: 1.4,
                }}
                >
                  {formattedDate}: {item.title}
                </Typography>
                <Typography
                sx={{
                  color: colors.white,
                  fontSize: "16px",
                  fontWeight: "normal",
                  lineHeight: 1.4,
                  marginTop: "4px",
                }}
                >
                  {item.description}
                </Typography>
                {item.image && (
                  <Box sx={{ marginTop: "8px", borderRadius: "4px", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: "auto", borderRadius: "4px", display: "block" }}
                    />
                    </Box>
                )}
              </li>
            );
          })
        )}
      </ul>
    </Box>
  );
};

export default NewsBar;

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useMemo } from "react";
import Text from "../../content/home";
import { useClientSize } from "../../hooks";
import { IProject } from "../../lib/types";
import { Overlay } from "../../styles/globalStyled";
import { NextLinkComposed } from "../navigation";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";

interface ProjectCardProps {
  project: IProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { isMobile } = useClientSize();
  const [open, setOpen] = React.useState(false);

  const mapPicsTpSlides = useMemo(() => {
    const arr: SlideImage[] = project.pictures.map((p) => ({
      src: p,
      imageFit: "contain",
      alt: p,
    }));

    return arr;
  }, [project.pictures]);

  return (
    <>
      <Box
        textAlign="center"
        sx={{
          "& .pic": {
            transition: "all 0.5s",
          },
          "& .overlay": {
            transition: "all 0.5s",
            cursor: "pointer !important",
          },
          "& .btn": {
            opacity: 0,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
            width: "60%",
            height: "35px",
            transition: "all 0.5s",
          },
          "&:hover": {
            "& .pic": {
              transform: "scale(1.2)",
            },
            //   "& .overlay": {
            //     background: "rgba(55, 12, 12, 0.8)",
            //   },
            //   "& .btn": {
            //     opacity: 1,
            //   },
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Box position="relative" height="420px">
          <Overlay>
            <Image
              src={project.hero}
              blurDataURL={project.hero}
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt={project.title}
              className="pic"
            />
          </Overlay>
          <Overlay
            className="overlay"
            sx={{
              background:
                "linear-gradient(359.33deg, rgba(55, 12, 12, 0.62) -7.77%, rgba(0, 0, 0, 0) 118.03%)",
            }}
          />

          {/* <Button variant="contained" className="btn">
          Les mer
        </Button> */}

          <Typography
            color="white"
            fontWeight={"bold"}
            position="absolute"
            bottom="24px"
            left={0}
            right={0}
            margin="auto"
          >
            {Text[project.type]}
          </Typography>
        </Box>
        <Box height={isMobile ? "10px" : "20px"} />
        <Typography fontSize="18px" fontWeight="bold">
          {project.title}
        </Typography>
        <Box height={isMobile ? "10px" : "20px"} />
        <Typography
          fontSize="16px"
          fontWeight="400"
          color={"rgba(139, 137, 137, 1)"}
        >
          {project.homeDescription}
        </Typography>
      </Box>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={mapPicsTpSlides}
      />
    </>
    // <NextLinkComposed to={`/prosjekter/${project.id}`}>

    // </NextLinkComposed>
  );
};

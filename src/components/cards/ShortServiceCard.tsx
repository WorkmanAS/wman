import { Box, Typography } from "@mui/material";
import React from "react";
import { IService } from "../../lib/types";
import { Overlay } from "../../styles/globalStyled";
import Image from "next/image";
import { useClientSize } from "../../hooks";

interface ShortServiceCardProps {
  service: IService;
}

export const ShortServiceCard: React.FC<ShortServiceCardProps> = ({
  service,
}) => {
  const { isMobile } = useClientSize();

  return (
    <Box textAlign="center">
      <Box position="relative" height="180px">
        <Overlay>
          <Image
            src={service.homeImage}
            blurDataURL={service.homeImage}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt={service.homeAlt}
          />
        </Overlay>
        <Overlay sx={{ background: "rgba(55, 12, 12, 0.3)" }} />
      </Box>
      <Box height={isMobile ? "10px" : "20px"} />
      <Typography fontSize="18px" fontWeight="bold">
        {service.title}
      </Typography>
      <Box height={isMobile ? "10px" : "20px"} />
      <Typography
        fontSize="16px"
        fontWeight="400"
        color={"rgba(139, 137, 137, 1)"}
      >
        {service.homeDescription}
      </Typography>
    </Box>
  );
};

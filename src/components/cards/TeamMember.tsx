import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ITeamMember } from "../../lib/types";
import Image from "next/image";
import { Overlay } from "../../styles/globalStyled";
import { useClientSize } from "../../hooks";

interface TeamMemberProps {
  member: ITeamMember;
}

export const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  const { isMobile } = useClientSize();
  const imageHeight = 350;

  return (
    <Box
      textAlign={"center"}
      height="100%"
      position="relative"
      width="100%"
      {...(isMobile && { maxWidth: "300px" })}
    >
      <Box
        position="relative"
        height={`${imageHeight}px`}
        display="flex"
        alignItems={"flex-end"}
        justifyContent="center"
        padding="0 0 25px 0"
      >
        <Overlay>
          <Image
            src={member.pic}
            blurDataURL={member.pic}
            placeholder="blur"
            layout="fill"
            objectFit="cover"
            alt={member.pic}
          />
        </Overlay>
        <Overlay
          sx={{
            background:
              "linear-gradient(359.33deg, rgba(0, 0, 0, 0.62) -7.77%, rgba(0, 0, 0, 0) 118.03%)",
          }}
        />
        <Typography
          position="relative"
          color="white"
          fontWeight={"bold"}
          fontSize="18px"
        >
          {member.name}
        </Typography>
      </Box>

      <Box
        padding="25px"
        display="flex"
        flexDirection={"column"}
        justifyContent="space-between"
        height={`calc(100% - ${imageHeight}px)`}
        position="relative"
      >
        <Typography position="relative" fontWeight={400} fontSize="18px">
          {member.position}
        </Typography>
        <Divider
          sx={{
            height: "1px",
            width: "100%",
            background: "#C4C4C4",
            margin: "10px 0",
          }}
        />
        <Box>
          <a href={`callto:${member.phone}`}>
            <Typography position="relative" fontWeight={400} fontSize="18px">
              {member.phone}
            </Typography>
          </a>
          <a href={`mailto:${member.email}`}>
            <Typography
              position="relative"
              fontWeight={400}
              color="rgba(139, 137, 137, 1)"
              fontSize="18px"
            >
              {member.email}
            </Typography>
          </a>
        </Box>
      </Box>
    </Box>
  );
};

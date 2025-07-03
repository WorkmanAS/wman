import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IService } from "../../lib/types";
import { Overlay } from "../../styles/globalStyled";
import Image from "next/image";
import { useClientSize } from "../../hooks";
import { RequestForm } from "../utils";
import { CloseOutlined } from "@mui/icons-material";

interface ServiceCardProps {
  service: IService;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { isMobile } = useClientSize();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Box textAlign={isMobile ? "center" : "left"} height="100%">
        <Box position="relative" height="220px">
          <Overlay>
            <Image
              src={service.image}
              blurDataURL={service.image}
              placeholder="blur"
              layout="fill"
              objectFit="cover"
              alt={service.alt}
            />
          </Overlay>
          <Overlay sx={{ background: "rgba(34, 14, 14, 0.61)" }} />
        </Box>
        <Box
          display="flex"
          flexDirection={"column"}
          justifyContent="space-between"
          height="calc(100% - 220px)"
          sx={{
            border: "1px solid #E4E4E4",
            background: "#F7F7F7",
            padding: "33px",
          }}
        >
          <Box marginBottom="30px">
            <Typography fontSize="33px" fontWeight={400}>
              {service.title}
            </Typography>
            <Box height={isMobile ? "10px" : "20px"} />
            <Typography fontSize="16px" fontWeight="400" color={"black"}>
              {service.description}
            </Typography>
          </Box>

          <Button
            onClick={handleOpen}
            variant="contained"
            color="primary"
            sx={{ maxWidth: isMobile ? "unset" : "300px" }}
            fullWidth={isMobile}
          >
            Send forespørsel
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="laptop">
        <IconButton
          sx={{
            position: "absolute",
            top: "-50px",
            right: "-10px",
          }}
          onClick={handleClose}
        >
          <CloseOutlined fontSize="large" htmlColor="white" />
        </IconButton>

        <DialogContent sx={{ position: "relative" }}>
          <Typography fontSize="33px" fontWeight={400} marginBottom="50px">
            Forespørsel
          </Typography>
          <RequestForm
            handleClose={handleClose}
            open={open}
            service={service.title}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

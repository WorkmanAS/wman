import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  List,
  ListItem
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useClientSize } from "../../hooks";
import TextContent from "../../content/home";
import Image from "next/image";
import { MaxWidthContainer, Overlay } from "../../styles/globalStyled";
import { colors } from "../../styles/colors";
import { string } from "yup";
import ReactCountryFlag from "react-country-flag";
import { ArrowBack } from "@mui/icons-material";

export const CallUsBack: React.FC = () => {
  const { isDesktop } = useClientSize();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState<{ country: string; code: string }>(
    { country: "NO", code: "+47" }
  );

  useEffect(() => {
    setSendError(false);
  }, [phone, name, phoneCode]);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };
  const handlPhoneChange = (e: any) => {
    setPhone(e.target.value);
  };
  const handleCountryChange = (e: any) => {
    setPhoneCode(
      e.target.value === "NO"
        ? { country: "NO", code: "+47" }
        : { country: "SE", code: "+46" }
    );
  };

  const handleSend = async () => {
    setLoading(true);
    setSendError(false);
    try {
      await fetch("/api/hello", {
        method: "POST",
        body: JSON.stringify({ phone: phoneCode.code + phone, name }),
      });
      setSuccess(true);
    } catch (error) {
      setSendError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="relative" padding={!isDesktop ? "60px 0" : "120px 0"}>
      <Overlay>
        <Image
          src={"/assets/callus.jpeg"}
          blurDataURL={"/assets/callus.jpeg"}
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          alt={"call-us-back"}
        />
      </Overlay>
      <Overlay sx={{ background: "rgb(34 14 14 / 71%)" }} />

      <MaxWidthContainer padding="0 16px">
        <Box
          sx={{ maxWidth: "750px", margin: "unset" }}
          {...(!isDesktop && { textAlign: "center" })}
        >
          <Typography color={colors.white} fontWeight="bold" fontSize="27px">
            {TextContent.callUsBackTitle}
          </Typography>
          <Box height="30px" />
          <Typography color={colors.white} fontSize="16px">
            {TextContent.callUsBackSubitle}
          </Typography>
          <Box height="30px" />
          <Typography color={colors.white} fontWeight="bold" fontSize="27px">
            {TextContent.doYouHaveQuestions}
          </Typography>
          <Box height="20px" />

          {sendError && (
            <Typography color="error" fontWeight="bold">
              Noe gikk galt. Prøv igjen seinere
            </Typography>
          )}

          {success ? (
            <Box
              display="flex"
              alignItems="center"
              {...(!isDesktop && { flexDirection: "column" })}
            >
              <IconButton color="secondary" onClick={() => setSuccess(false)}>
                <ArrowBack />
              </IconButton>
              <Typography color="white" fontSize="21px">
                Tusen takk. Vi tar kontakt med deg innen kort tid.
              </Typography>
            </Box>
          ) : (
            <Box
              display="flex"
              alignItems="baseline"
              {...(!isDesktop && { flexDirection: "column" })}
            >
              <TextField
                fullWidth
                disabled={loading}
                value={name}
                onChange={handleNameChange}
                label="Navnet ditt"
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": {
                    color: colors.white,
                    "&.Mui-disabled": {
                      color: colors.white,
                      WebkitTextFillColor: colors.white,
                    },
                  },
                  "& .MuiFilledInput-root::before": {
                    borderBottom: "1px solid rgb(255 255 255 / 42%) !important",
                  },
                }}
              />

              <Box width="35px" {...(!isDesktop && { height: "20px" })} />

              <TextField
                fullWidth
                disabled={loading}
                value={phone}
                onChange={handlPhoneChange}
                label="Telefon"
                variant="filled"
                sx={{
                  "& .MuiFilledInput-input": {
                    color: colors.white,
                    "&.Mui-disabled": {
                      color: colors.white,
                      WebkitTextFillColor: colors.white,
                    },
                  },
                  "& .MuiFilledInput-root::before": {
                    borderBottom: "1px solid rgb(255 255 255 / 42%) !important",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Box
                      display="flex"
                      alignItems="baseline"
                      marginRight="10px"
                    >
                      <Select
                        value={phoneCode.country}
                        onChange={handleCountryChange}
                        disabled={loading}
                      >
                        <MenuItem value="NO">
                          <ReactCountryFlag countryCode="NO" svg />
                        </MenuItem>
                        <MenuItem value="SE">
                          <ReactCountryFlag countryCode="SE" svg />
                        </MenuItem>
                      </Select>

                      <Typography color={colors.white}>
                        {phoneCode.code}
                      </Typography>
                    </Box>
                  ),
                }}
              />

              <Box width="35px" {...(!isDesktop && { height: "20px" })} />

              <Button
                onClick={handleSend}
                sx={{ minWidth: "200px" }}
                variant="contained"
                {...(!isDesktop && { fullWidth: true })}
              >
                Send
                {loading && (
                  <CircularProgress
                    size={"14px"}
                    color="secondary"
                    sx={{ marginLeft: "10px" }}
                  />
                )}
              </Button>
            </Box>
          )}
        </Box>
      </MaxWidthContainer>
    </Box>
  );
};

import {
    Box,
    Button,
    Grid, MenuItem,
    Typography
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Select } from "formik-mui";
import React, { useState } from "react";
import * as Yup from "yup";
import { useClientSize } from "../../hooks";
import { IRequest } from "../../lib/types";
import { toBase64 } from "../../utils";
import { FormikTextField } from "./FormikTextField";

interface RequestFormProps {
  service?: string;
  handleClose?: () => void;
  open?: boolean;
}

const PHONE_REGEX =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const RequestForm: React.FC<RequestFormProps> = ({
  service,
  handleClose,
  open,
}) => {
  const { isMobile, isDesktop } = useClientSize();
  const [enableValidation, setEnableValidation] = useState(false);
  const [sizeError, setSizeError] = useState("");
  const [serverError, setServerError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState<any | null>(null);

  const initialValues: IRequest = {
    subject: "",
    email: "",
    name: "",
    service: service ?? "",
    phone: "",
    company: "",
    message: "",
  };

  const validationSchema = Yup.object({
    subject: Yup.string().required("Obligatorisk"),
    email: Yup.string().email("Ugyldig epost").required("Obligatorisk"),
    name: Yup.string().required("Obligatorisk"),
    phone: Yup.string().matches(PHONE_REGEX, "Obligatorisk"),
  });

  const handleUpload = async (e: any) => {
    setSizeError("");
    const file = e.currentTarget.files[0];

    if (file && handleUpload) {
      const fileIsValidSize = file.size / 1024 / 1024 < 4;
      if (!fileIsValidSize) {
        setSizeError("Filen kan ikke være større enn 4 MB");
      } else {
        setFile(file);
      }
    }
  };

  const handleSubmit = async (values: any) => {
    setServerError(false);

    let convertedFile: any | null = null;
    if (file) {
      try {
        convertedFile = await toBase64(file);
      } catch (error) {
        setServerError(true);
      }
    }

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          ...(convertedFile && {
            file: { content: convertedFile, name: file.name },
          }),
        }),
      });

      if (res.status !== 200) {
        setServerError(true);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setServerError(true);
    }
  };

  const successMarkup = (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        {...(!isDesktop && { flexDirection: "column" })}
      >
        <Typography fontSize="21px">
          Tusen takk. Vi tar kontakt med deg innen kort tid.
        </Typography>
      </Box>

      {handleClose && (
        <Button
          variant="contained"
          sx={{ minWidth: "300px", marginTop: "30px" }}
          onClick={handleClose}
        >
          Lukk
        </Button>
      )}
    </Box>
  );

  return (
    <Box>
      {success ? (
        successMarkup
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          validateOnBlur={enableValidation}
          validateOnChange={enableValidation}
          onSubmit={async (values, { setErrors, setSubmitting }) => {
            setServerError(false);
            try {
              await handleSubmit(values);
            } catch (error) {
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <>
                <Grid container spacing={4}>
                  <Grid item md={6} sm={6} xs={12}>
                    <Field
                      component={FormikTextField}
                      label={"Emne"}
                      name="subject"
                      fullWidth
                      placeholder={"Hva gjelder dette?"}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    sm={6}
                    xs={12}
                    sx={{
                      "& .MuiFormControl-root": {
                        width: "100%",
                      },
                    }}
                  >
                    <Field
                      component={Select}
                      name="service"
                      fullWidth
                      displayEmpty
                    >
                      <MenuItem disabled value="">
                        {"Velg tjeneste"}
                      </MenuItem>

                      <MenuItem value="Entreprenør">{"Entreprenør"}</MenuItem>

                      <MenuItem value="Renovering">{"Renovering"}</MenuItem>

                      <MenuItem value="Serviceoppdrag">
                        {"Serviceoppdrag"}
                      </MenuItem>

                      <MenuItem value="Bygginredning">
                        {"Bygginredning"}
                      </MenuItem>
                    </Field>
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <Field
                      component={FormikTextField}
                      label={"Epost"}
                      name="email"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder={"Din epost"}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <Field
                      component={FormikTextField}
                      label={"Telefon"}
                      name="phone"
                      fullWidth
                      placeholder={"Din telefon"}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <Field
                      component={FormikTextField}
                      label={"Navn"}
                      name="name"
                      fullWidth
                      placeholder={"Fornavn og etternavn"}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={6} sm={6} xs={12}>
                    <Field
                      component={FormikTextField}
                      label={"Firmanavn"}
                      name="company"
                      fullWidth
                      placeholder={"Ditt firma"}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item md={12} sm={12} xs={12}>
                    <Field
                      component={FormikTextField}
                      label={"Beskriv hva du trenger"}
                      name="message"
                      fullWidth
                      multiline
                      rows={4}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    display="flex"
                    alignItems={isDesktop ? "center" : "start"}
                    {...(!isDesktop && { flexDirection: "column" })}
                  >
                    <input
                      id={"uploaded-file"}
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleUpload}
                      disabled={isSubmitting}
                    />

                    <Typography marginRight={"20px"}>Vedlegg</Typography>

                    <label htmlFor={"uploaded-file"} style={{ width: "100%" }}>
                      <Box
                        display="flex"
                        alignItems="stretch"
                        width="100%"
                        sx={{}}
                      >
                        <Box
                          sx={{
                            flex: 1,
                            border: "1px solid #C4C4C4 ",
                            padding: "15px",
                          }}
                        >
                          <Typography
                            sx={{ cursor: "default" }}
                            color="rgba(139, 137, 137, 1)"
                          >
                            {file?.name ?? "Ingen fil opplastet"}
                          </Typography>
                        </Box>

                        <Box>
                          <Button
                            variant="contained"
                            sx={{
                              minWidth: isMobile ? "unset" : "200px",
                              height: "100%",
                            }}
                            component="span"
                          >
                            Velg fil
                          </Button>
                        </Box>
                      </Box>
                    </label>
                  </Grid>

                  {sizeError && (
                    <Grid item md={12} sm={12} xs={12}>
                      <Typography color="error">{sizeError}</Typography>
                    </Grid>
                  )}

                  {serverError && (
                    <Grid item md={12} sm={12} xs={12}>
                      <Typography color="error">
                        Noe gikk galt. Prøv igjen seinere
                      </Typography>
                    </Grid>
                  )}
                </Grid>

                <Box height="30px" />
                <Button
                  disabled={isSubmitting}
                  onClick={() => {
                    setEnableValidation(true);
                    submitForm();
                  }}
                  variant="contained"
                  sx={{
                    margin: "auto",
                    display: "block",
                    minWidth: "200px",
                  }}
                >
                  Send forespørsel
                </Button>
              </>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};

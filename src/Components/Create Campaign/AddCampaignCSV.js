import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { Download } from "@mui/icons-material";

const defaultTheme = createTheme();

export default function AddCampaignData({
  model,
  loading,
  campaignName,
  handleAttachment,
  handleSubmit,
  handleUpload
}) {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              boxShadow: "5",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="my-2"
          >
            
            <Box
              component="form"
              encType="multipart/form-data"
              noValidate
              sx={{ mt: 1 }}
            >
            

              <Typography className="ms-1">
                Campaign Name : {campaignName}
              </Typography>
              <Typography className="my-2 ms-1">
                Model Name : {model}
              </Typography>

              <input
                type="file"
                name="csvFile"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0 file:text-sm file:font-semibold
                         file:bg-violet-50 file:text-blue-800 hover:file:bg-blue-100"
                accept=".csv"
                onChange={(e) => {
                  handleAttachment(e);
                }}
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="outlined"
                loading={loading}
                disabled={loading}
                endIcon={<></>}
                loadingPosition="end"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Load Data
              </LoadingButton>

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                disabled={loading}
                endIcon={<></>}
                loadingPosition="end"
                // className="my-4"
                onClick={(e) => {
                  handleUpload(e);
                }}
              >
                Upload Data
              </LoadingButton>
              <Link passHref href={"../../api/download"}>
                <Typography className="mt-3 block w-full text-sm text-slate-500 mx-auto">
                  Download Sample CSV <Download />
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

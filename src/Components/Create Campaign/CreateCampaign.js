import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Campaign, Download, Memory } from "@mui/icons-material";
import { IconButton, MenuItem, Select } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
const defaultTheme = createTheme();

export default function AddCampaign({
  campaignName,
  model,
  loading,
  modelName,
  handleCampaignChange,
  handleModelChange,
  handleSubmit,
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
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#1565c0" }}>
              <Campaign />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create New Campaign
            </Typography>
            <Box
              component="form"
              encType="multipart/form-data"
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                value={campaignName}
                name="campaign"
                label="Campaign Name"
                type="text"
                id="campaign"
                onChange={(e) => {
                  handleCampaignChange(e);
                }}
              />
              
                
                <Select
                  labelId=""
                  fullWidth                   
                  name="modelname"
                  value={model}
                  onChange={(e) => {
                    handleModelChange(e);
                  }}
                >
                  {modelName.map((item, index) => (
                    <MenuItem key={index} value={item["modelname"]}>
                      {item["modelname"]}
                    </MenuItem>
                  ))}
                </Select>
                

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                endIcon={<Campaign />}
                loadingPosition="end"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Create Campaign
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

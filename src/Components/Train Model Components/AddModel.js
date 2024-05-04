import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Memory, Send } from "@mui/icons-material";
import { useState } from "react";
import { useRef } from "react";
import AxiosInstance from "@/configs/axiosConfig";
import { MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const defaultTheme = createTheme();

export default function AddModel({
  model,
  loading,
  epoch,
  modelName,
  handleAttachment,
  handleEpochChange,
  handleModelChange,
  handleSubmit,
}) {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" >
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
              <Memory />
            </Avatar>
            <Typography component="h1" variant="h5">
              Train Model
            </Typography>
            <Box
              component="form"
              encType="multipart/form-data"
              noValidate
              sx={{ mt: 1 }}
            >
              <Select
                sx={{ width: "23em" }}
                labelId=""
                className="container"
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

              <TextField
                margin="normal"
                required
                fullWidth
                value={epoch}
                name="epoch"
                label="Epoch Number"
                type="number"
                id="epoch"
                onChange={(e) => {
                  handleEpochChange(e);
                }}
              />

              <input
                type="file"
                name="audiofile"
                multiple={true}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0 file:text-sm file:font-semibold
                         file:bg-violet-50 file:text-blue-800 hover:file:bg-blue-100"
                accept=".wav, .mp4, .mp3"
                onChange={(e) => {
                  handleAttachment(e);
                }}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                endIcon={<Send/>}
                loadingPosition="end"                
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Add Model
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

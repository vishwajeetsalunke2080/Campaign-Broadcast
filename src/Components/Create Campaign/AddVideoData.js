import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  ArchiveRounded,
  AttachFile,
  FilePresent,
  Memory,
  Send,
  VideoCameraBack,
} from "@mui/icons-material";
import { useState } from "react";
import { useRef } from "react";
import AxiosInstance from "@/configs/axiosConfig";
import { InputAdornment, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { LoadingButton } from "@mui/lab";

const defaultTheme = createTheme();

export default function AddVideoData({
  model,
  loading,
  campaignName,
  fromTime,
  toTime,
  handleFromTime,
  handleToTime,
  handleAttachment,
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="my-2"
          >
            {/* <Avatar sx={{ m: 1, bgcolor: "#1565c0" }}>
              <VideoCameraBack />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Video Data
            </Typography> */}
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

              <TextField label="From Time" value={fromTime} fullWidth required onChange={(e)=>{handleFromTime(e)}}/>

              <TextField label="To Time" value={toTime} className="my-2" fullWidth required onChange={(e)=>{handleToTime(e)}}/>

              <input
                type="file"
                name="videoClip"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0 file:text-sm file:font-semibold
                         file:bg-violet-50 file:text-blue-800 hover:file:bg-blue-100"
                accept="video/*"
                onChange={(e) => {
                  handleAttachment(e);
                }}
              />
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                endIcon={<></>}
                loadingPosition="end"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Add Video Data
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

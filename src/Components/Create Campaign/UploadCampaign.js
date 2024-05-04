import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddCampaignData from "./AddCampaignCSV";
import AddVideoData from "./AddVideoData";
import Link from "next/link";
import { Download } from "@mui/icons-material";
import Spinner from "../Spinner";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({
  model,
  campaign,
  loading,
  fromTime, 
  toTime,
  handleFromTime,
  handleToTime,
  handleCSVSubmit,
  handleUploadCSV,
  handleCSVAttachmemt,
  handleVideoAttachmemt,
  handleVideoSubmit,
}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    {loading ? ((<Spinner/>)):((null))}
    <Box sx={{ width: "100%" }} className="border shadow-lg mt-4">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Add Campaign Tabs"
        >
          <Tab label="Add CSV" {...a11yProps(0)} sx={{ fontWeight: "bold" }} />
          <Tab
            label="Add Video Data"
            {...a11yProps(1)}
            sx={{ fontWeight: "bold" }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AddCampaignData
          campaignName={campaign}
          model={model}
          loading={loading}          
          handleAttachment={handleCSVAttachmemt}
          handleSubmit={handleCSVSubmit}
          handleUpload={handleUploadCSV}
        />
        
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddVideoData
          campaignName={campaign}
          model={model}
          loading={loading}
          fromTime={fromTime}
          toTime={toTime}
          handleFromTime={handleFromTime}
          handleToTime={handleToTime}
          handleAttachment={handleVideoAttachmemt}
          handleSubmit={handleVideoSubmit}
        />
      </CustomTabPanel>      
    </Box>
    </>
  );
}

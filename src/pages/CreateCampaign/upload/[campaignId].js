import CSVTable from "@/Components/Create Campaign/CSVTable";
import UploadCampaign from "@/Components/Create Campaign/UploadCampaign";
import Navbar from "@/Components/Nav Components/Navbar";
import {
  callAddCsvData,
  callAddVideoData,
  callGetCampaignData,
  setResult,
} from "@/auth/action";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/Components/Spinner";

const Upload = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const headers = [
    { key: "mobile", label: "Mobile" },
    { key: "text", label: "Text" },
    { key: "audioPath", label: "Audio File" },
    { key: "videopath", label: "Video File" },
  ];

  const csv_headers = [
    { key: "Mobile", label: "Mobile" },
    { key: "Text", label: "Text" },
    { key: "Status", label: "Status" },
  ];

  const { campaignId, modelName, campaign } = router.query;
  const [Csv_data, setCsv_data] = useState([]);
  const [fileUpload, setfileUpload] = useState(false);
  const [pageSize] = useState(1000);
  const [offset] = useState(0);
  const [OldData, setOldData] = useState([]);
  const [File, setFile] = useState(null);  
  const [CurrentItem, SetCurrentItem] = useState(0);

  const { response, loading } = useSelector((state) => state.auth);

  const [CSVFormData, setCSVFormData] = useState({
    campaignId: campaignId,
    csv_data: null,
  });

  const [VideoFormData, setVideoFormData] = useState({
    campaignId: campaignId,
    fromTime: "",
    toTime: "",
    attachment: null,
  });

  const handleCSVAttachment = (e) => {
    if (e.target.files.length != 0) {
      setFile(e.target.files[0]);
      setfileUpload(true);
    }
  };

  const handleCSVSubmit = (e) => {
    e.preventDefault();
    (File);
    if (fileUpload) {
      loadCsvData();
    }
  };

  const handleUploadCsv = (e) => {
    e.preventDefault();
    if(Csv_data != null)
    {       
      const data = Csv_data[CurrentItem]
      dispatch(callAddCsvData({campaignId:campaignId, data:data}));
    }
  };

  const handleVideoAttachment = (e) => {
    setVideoFormData({ ...VideoFormData, attachment: e.target.files[0] });
  };

  const handleVideoSubmit = async (event) => {
    event.preventDefault();
    dispatch(callAddVideoData(VideoFormData));
  };

  const handleFromTime = (e) => {
    setVideoFormData({ ...VideoFormData, fromTime: e.target.value });
  };

  const handleToTime = (e) => {
    setVideoFormData({ ...VideoFormData, toTime: e.target.value });
  };

  useEffect(() => {
    if (campaignId != undefined) {      
      setCSVFormData({ ...CSVFormData, campaignId: campaignId });
      setVideoFormData({ ...CSVFormData, campaignId: campaignId });
    }
  }, [campaignId]);

  const loadCsvData = () => {
    Papa.parse(File, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rows = [];
        results.data.map((d) => {
          if (
            d.Mobile != "" &&
            d.Mobile != null &&
            d.Text != "" &&
            d.Text != null
          ) {
            const tmp = {
              Mobile: d.Mobile,
              Text: d.Text,
              Status: "Not Uploaded",
            };
            rows.push(tmp);
          }
        });
        setCsv_data(rows);
        if (rows.length == 0) {
          toast.warning("No Data Found in File", { position: "bottom-center" });
        }
      },
    });
  };

  useEffect(() => {
    if(response && CurrentItem <= Csv_data.length-1)
    {
      if(response == 1)
      {
        Csv_data[CurrentItem].Status = "Uploaded ✅"
      }
      else
      {
        Csv_data[CurrentItem].Status = "Failed ❌"
      }      
      if(Csv_data.length > CurrentItem)
      {
        SetCurrentItem(CurrentItem+1)
      }
      dispatch(callAddCsvData({campaignId:campaignId, data:Csv_data[CurrentItem]}))
    }
    else{
      toast.info(response)
    }
  }, [response]);

  return (
    <div className="cover">
      <ToastContainer />
      <Navbar
        children={
          <div className="grid grid-cols-3 grid-row-2">
            <div className="col-span-1 me-[3em]">              
              <UploadCampaign
                campaign={campaign}
                loading={loading}
                model={modelName}
                fromTime={VideoFormData.fromTime}
                toTime={VideoFormData.toTime}
                handleCSVAttachmemt={handleCSVAttachment}
                handleFromTime={handleFromTime}
                handleToTime={handleToTime}
                handleCSVSubmit={handleCSVSubmit}
                handleUploadCSV={handleUploadCsv}
                handleVideoAttachmemt={handleVideoAttachment}
                handleVideoSubmit={handleVideoSubmit}
              />
            </div>
            <div className="row-1 col-span-2 mt-[1em] overflow-auto max-h-[50em]">              
              <CSVTable data={Csv_data} headers={csv_headers} />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Upload;

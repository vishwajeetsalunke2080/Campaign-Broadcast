import CheckLogin from "@/Components/Auth Components/CheckLogin";
import AddCampaign from "@/Components/Create Campaign/CreateCampaign";
import ViewCampaigns from "@/Components/Create Campaign/ViewCampaigns";
import CustomTable from "@/Components/Create Campaign/CampaignTable";
import Navbar from "@/Components/Nav Components/Navbar";
import { callCreateCampaign } from "@/auth/action";
import AxiosInstance from "@/configs/axiosConfig";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/Components/Spinner";

const CreateCampaign = () => {
  const [modelName, setModelName] = useState([]);
  const dispatch = useDispatch();

  const [FormData, setFormData] = useState({
    model: "",
    campaignName: ""    
  });

  const [data, setdata] = useState([]);
  
  useEffect(() => {
    AxiosInstance.get("campaigns").then((res) => {
      if (res.status == 200) 
        {
          setdata(res.data.data); 
          setFormData({ ...FormData, model: res.data.data[0]["modelname"] });      
        }
    });
  }, []);

  const handleModelChange = (e) => {
    setFormData({ ...FormData, model: e.target.value });
  };

  const handleCampaignChange = (e) => {
    setFormData({ ...FormData, campaignName: e.target.value });
  };

  useEffect(() => {    
    AxiosInstance.get("models").then((res) => {
      setModelName(res.data.data);      
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(callCreateCampaign(FormData));
    setFormData({ campaignName: "", model: "" });
  };

  const { loading, response } = useSelector((state) => state.auth);
  useEffect(() => {
    if(response!= null){
      toast.success(response)
      setInterval(() => {
        window.location.reload()
      }, 2000); 
    }
  }, [loading]);

  const headers = [
    { key: "id", label: "ID" },
    { key: "modelname", label: "Model Name" },
    { key: "campaignname", label: "Campaign Name" },
    { key: "video", label: "Video File" },
    { key: "action", label: "" },
  ];

  return (
    <>
      <CheckLogin />
      <Navbar
        children={
          <div className="grid grid-cols-3">
            <div className="col-span-1">
            {loading ? ((<Spinner/>)) : ((null))}
              <AddCampaign                
                campaignName={FormData.campaignName}
                modelName={modelName}
                model={FormData.model}
                loading={loading}
                handleCampaignChange={handleCampaignChange}
                handleModelChange={handleModelChange}
                handleSubmit={handleSubmit}
              />
            </div>
            <div className="col-span-2 mt-[3.5em]">
              <CustomTable data={data} headers={headers} pageSize={5} />
            </div>
            <ToastContainer/>
          </div>
        }
      />
    </>
  );
};

export default CreateCampaign;

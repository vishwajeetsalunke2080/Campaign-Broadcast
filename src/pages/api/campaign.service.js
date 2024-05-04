import AxiosInstance from "@/configs/axiosConfig";
import axios from "axios";
import { useRouter } from "next/router";


export const CreateCampaign = async (info) => {
  try {
    const obj = info.payload;    
    const data = new FormData();

    data.append("modelName", obj.model);
    data.append("campaignName", obj.campaignName);

    const url = "campaigns/add";

    const res = await AxiosInstance.post(url, data);    
    return res;
  } 
  catch (ex) 
  {
    return ex;
  }
};

export const addVideoData = async (info) => {
  try {
    const obj = info.payload;    
    const url = `campaigns/addVideo?campaignId=${obj.campaignId}`;
    const data = new FormData();

    data.append("files", obj.attachment);
    data.append("fromTime", obj.fromTime);
    data.append("toTime", obj.toTime);

    const res = await AxiosInstance.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });    
    return res;
  } catch (ex) {
    return ex;
  }
};


export const addCsvData = async (info) => {
  try {
    const obj = info.payload;
    const url = "campaigns/addData";
    const data = JSON.stringify({
      campaignId: obj.campaignId,
      mobile: obj.data.Mobile,
      text: obj.data.Text,
    });

    const res = await AxiosInstance.post(url, data);

    return res;
  } catch (ex) {
    return ex;
  }
};

export const GetCampaignInfo = async (info) => {
  try {
    const obj = info.payload;    
    const url = `campaigns/getData?campaignId=${obj.campaignId}&offset=${obj.offset}&pageSize=${obj.pageSize}`;    
    const res = await AxiosInstance.get(url);    
    return res;
  
} catch (ex) {
    return ex;
  }
};




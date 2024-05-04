import AxiosInstance from "@/configs/axiosConfig";
import axios from "axios";
import { useRouter } from "next/router";

export const CreateModel = async (info) => {
  try {
    const obj = info.payload;

    const data = new FormData();

    for (let i = 0; i < obj.attachment.length; i++) {
      data.append("files", obj.attachment[i]);
    }

    data.append("epochNo", obj.epoch);

    const url = `models/train?modelName=${obj.model}`;

    const res = await AxiosInstance.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (e) {
    return e;
  }
};

export const GetModelInfo = async (info) => {
  try {
    const res = await AxiosInstance.get("models");
    return res;
  } catch (error) {}
};

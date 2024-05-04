import CheckLogin from "@/Components/Auth Components/CheckLogin";
import Table from "@/Components/Train Model Components/TrainModel_Table";
import Navbar from "@/Components/Nav Components/Navbar";
import AddModel from "@/Components/Train Model Components/AddModel";

import { callCreateModel, callGetModelInfo } from "@/auth/action";
import AxiosInstance from "@/configs/axiosConfig";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/Components/Spinner";

const TrainModel = () => {
  const [modelName, setModelName] = useState([]);
  const dispatch = useDispatch();
  const { loading, response } = useSelector((state) => state.auth);

  const [FormData, setFormData] = useState({
    model: "",
    epoch: null,
    attachment: null,
  });

  const handleModelChange = (e) => {
    setFormData({ ...FormData, model: e.target.value });
  };

  const handleEpochChange = (e) => {
    setFormData({ ...FormData, epoch: e.target.value });
  };

  const handleAttachment = (e) => {
    setFormData({ ...FormData, attachment: e.target.files });
  };

  useEffect(() => {
    dispatch(callGetModelInfo());
  }, []);

  useEffect(() => {
    if (response != null) {      
      if (modelName.length == 0) {
        setModelName(response);
        setFormData({ ...FormData, model: response[0]["modelname"] });
      }
      toast.info(response)
    }
  }, [response]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(callCreateModel(FormData));
    setFormData({ epoch: "", attachment: null, model: "" });
  };

  // useEffect(() => {
  //   if (response == 1) {
  //     toast.success("Model Added Successfully");
  //   } else if (response != null) {
  //     toast.error(response);
  //   }
  // }, [loading]);

  const headers = [
    { key: "id", label: "ID" },
    { key: "modelname", label: "Model Name" },
    { key: "Action", label: "" },
  ];

  return (
    <>
      <CheckLogin />
      <Navbar
        children={
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              {loading ? <Spinner /> : null}
              <AddModel
                attachment={FormData.attachment}
                epoch={FormData.epoch}
                modelName={modelName}
                model={FormData.model}
                loading={loading}
                handleEpochChange={handleEpochChange}
                handleModelChange={handleModelChange}
                handleAttachment={handleAttachment}
                handleSubmit={handleSubmit}
              />

              <ToastContainer />
            </div>
            <div className="col-span-2 mt-[3.5em]">
              <Table data={modelName} headers={headers} pageSize={5} />
            </div>
          </div>
        }
      />
    </>
  );
};

export default TrainModel;

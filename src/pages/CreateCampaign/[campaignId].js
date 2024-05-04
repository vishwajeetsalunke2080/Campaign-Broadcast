import CustomTable from "@/Components/Create Campaign/OldCampaignDetailsTable";

import Navbar from "@/Components/Nav Components/Navbar";
import { callGetCampaignData } from "@/auth/action";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UploadCampaignData = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { campaignId } = router.query;
  const [OldData, setOldData] = useState([]);
  const { response } = useSelector((state) => state.auth);

  const [pageDet, setPageDet] = useState({
    totalPages: 1,
    records:null,
    currentPage: 1,
    limit: 1000,
    offset: 0,
  });

  useEffect(() => {
    if (response != null) {      
      setOldData(response.data.data);
      const totalPages = Math.ceil(response.data.total / 1000);      
      setPageDet({ ...pageDet, totalPages: totalPages, records:response.data.total });
    }
  }, [response]);

  useEffect(() => {
    if (campaignId != undefined) {      
      getData();
      const totalPages = Math.ceil(response.data.total / 1000);      
      setPageDet({ ...pageDet, totalPages: totalPages, records:response.data.total });
    }
  }, [pageDet.currentPage]);

  useEffect(() => {    
    if (campaignId != undefined) {
      getData();
    }
  }, [campaignId]);

  const handlePageChange = (e,page) => {        
    
      if(page > pageDet.currentPage && page <= pageDet.totalPages )
        {      
          const offset = pageDet["offset"] + pageDet["limit"];
          setPageDet({ ...pageDet, currentPage: page, offset: offset });
        }
        else if(page < pageDet.currentPage && page <= pageDet.totalPages)
        {
          const offset = pageDet["offset"] - pageDet["limit"];
          setPageDet({ ...pageDet, currentPage: page, offset: offset });
        }
        
  };

  const getData = () => {
    dispatch(
      callGetCampaignData({
        campaignId: campaignId,
        offset: pageDet["offset"],
        pageSize: pageDet["limit"],
      })
    );
  };

  const headers = [
    { key: "mobile", label: "Mobile" },
    { key: "text", label: "Text" },
    { key: "audioPath", label: "Audio File" },
    { key: "videopath", label: "Video File" },
  ];

  const csv_headers = [
    { key: "mobile", label: "Mobile" },
    { key: "text", label: "Text" },
    { key: "status", label: "Status" },
  ];

  return (
    <>
      <Navbar
        children={
          <div className="grid grid-cols-3 grid-row-2">
            <div className="col-span-3 row-1 mt-[1em] overflow-auto max-h-[48em]">
              <CustomTable
                data={OldData}
                headers={headers}
                pageData={pageDet}
                handlePageChange={handlePageChange}
              />
            </div>
              <div className="flex justify-end col-span-3"><Pagination page={pageDet.currentPage} count={pageDet.totalPages} shape="rounded" onChange={(e,page)=>handlePageChange(e,page)} /></div>
          </div>
        }
      />
    </>
  );
};

export default UploadCampaignData;

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomTable = ({ data, headers, pageData, handlePageChange }) => {  
  
  const [sortConfig, setSortConfig] = useState(null);
  let sortedData = []

  {data == undefined ? ((toast.warning("No Data Found"))):((sortedData = data.sort((a, b) => {
    if (!sortConfig) {
      return 0;
    }
    const [key, direction] = sortConfig;
    if (a[key] < b[key]) {
      return direction === "ascending" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "ascending" ? 1 : -1;
    }
    return 0;
  })))}

  const indexOfLastItem = pageData.currentPage * pageData.limit;  
  const indexOfFirstItem = indexOfLastItem - 1000;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (key) => {
    if (!sortConfig || sortConfig[0] !== key) {
      setSortConfig([key, "ascending"]);
    } else if (sortConfig[1] === "ascending") {
      setSortConfig([key, "descending"]);
    } else {
      setSortConfig(null);
    }
  };

  
  return (
    <>
      <div className="flex flex-col">      
        <table className="  divide-y overflow-auto divide-gray-200 border">
          <thead>
            <tr className="sticky top-0 bg-gray-600  ">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(header.key)}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">            
            {currentItems.map((item, index) => (
              <tr key={index} className="text-center">
                {/* <td className="px-6 py-4 whitespace-nowrap">{item["campaignId"]}</td> */}
                <td className="px-6 py-4 whitespace-nowrap">{item["mobile"]}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item["text"]}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item["audioPath"]}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item["videopath"]}</td>                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </>
  );
};

export default CustomTable;

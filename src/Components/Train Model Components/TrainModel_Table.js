import { Button } from "@mui/base";
import { FirstPage, LastPage, RemoveRedEye } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const Table = ({ data, headers, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(pageSize);
  const [sortConfig, setSortConfig] = useState(null);

  const sortedData = data.sort((a, b) => {
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
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <>        
      <div className="flex flex-col ">
        <table className="  divide-y divide-gray-200 bg-gray-600 border">
          <thead>
            <tr>
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
                <td className="px-6 py-4 whitespace-nowrap">{item["id"]}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item["modelname"]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button>
                    View Files <RemoveRedEye />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mr-2 bg-gray-200 text-gray-600 rounded-md cursor-pointer"
          >
            <FirstPage />
          </button>
          <div className="flex items-center px-3 text-gray-500 text-sm">
            {indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, sortedData.length)} of{" "}
            {sortedData.length} items
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= sortedData.length}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md cursor-pointer"
          >
            <LastPage />
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;

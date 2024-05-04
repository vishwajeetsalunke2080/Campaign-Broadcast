import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import AxiosInstance from "@/configs/axiosConfig";
import { useState } from "react";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/router";
import { Download, PanoramaFishEye, RemoveCircle, RemoveRedEye, ViewAgenda, ViewComfy } from "@mui/icons-material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "modelname",
    numeric: true,
    disablePadding: false,
    label: "MODEL NAME",
  },
  {
    id: "campaignName",
    numeric: true,
    disablePadding: false,
    label: "CAMPAIGN NAME",
  },
  {
    id: "viewfiles",
    numeric: true,
    disablePadding: false,
    label: "",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{fontWeight:"bold", background:""}}
            key={headCell.id}
            align={headCell.numeric ? "center" : "center"}
            // padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



export default function ViewCampaigns() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const router = useRouter()

  // get available models
  const [models, setmodels] = useState([]);
  const [loading, setloading] = useState(true);

  async function getData() {
    AxiosInstance.get("campaigns").then((res) => {
      if (res.data.data != null) {
        setmodels(res.data.data);
        setloading(false);        
      }
    });
  }

  useEffect(() => {
    getData();    
  }, [loading]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleViewClick = () => {
    
  }

  const visibleRows = React.useMemo(
    () =>
      stableSort(models, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      {loading ? (
        <HashLoader
          color="#36d7b7"          
          size={100}          
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "center",            
          }}
        />
      ) : (
        <Box sx={{ width: "100%" }} >
          <Paper sx={{ width: "100%", mb: 2, padding: "10px" }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }}>
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={models.length}
                />
                <TableBody>
                  {visibleRows.map((item) => {
                    return (
                      <TableRow
                        tabIndex={-1}
                        key={item["id"]}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell
                          component="th"
                          id={item["id"]}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {item["id"]}
                        </TableCell>
                        <TableCell align="center">
                          {item["modelname"]}
                        </TableCell>
                        <TableCell align="center">
                          {item["campaignname"]}
                        </TableCell>
                        <TableCell align="center">
                          <Button onClick={handleViewClick} >
                            <RemoveRedEye/>View
                          </Button>                          
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={models.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </>
  );
}

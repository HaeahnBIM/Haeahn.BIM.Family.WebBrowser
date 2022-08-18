import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";
import fileDownload from "js-file-download";
import axios from "axios";
import Moment from "moment";
import moment from "moment";
import SimpleDialog from "./components/SimpleDialog";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Data from "./api/Data";

const baseuri = "https://ueapi.haeahn.com/api/RvtCollection/";
const baseuri2 = "https://ueapi.haeahn.com/api/FamilyAutomation/";

const RenderDate = (props) => {

  const handleDownload = async () => {

    const name = moment().format("YYYYMMDDHHmmss") + ".zip";
    const postData = {
      SEQ: props.row.SEQ,
      FILENAME: name,
      DOWNLOAD_TYPE: 'ORDER',
    };

    try {
      const res = await fetch(baseuri2 + "downloadItems", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      fileDownload(res.data, name);
    } catch (err) {
      console.log(err);
    }
  };

  if (props.value === "작업완료" && props.row.TYP_ADN === 'upgrade') {
    return <Button variant="text" onClick={handleDownload}>{props.value}</Button>;
  } else {
    return <div>{props.value}</div>;
  }
};

const columnsFavorite = [
  { field: "SEQ", headerName: "SEQ", width: 80 },
  { field: "ID_USER", headerName: "ID_USER", width: 100 },
  { field: "NM_LIST", headerName: "NM_LIST", width: 200 },
  { field: "DSCRP", headerName: "DSCRP", width: 200 },
  { field: "DT", headerName: "DT", width: 100 },
];

const columnsFavoriteItems = [
  { field: "ID_LIST", headerName: "ID_LIST", width: 80 },
  { field: "ID_FML", headerName: "ID_FML", width: 100 },
  { field: "ID_USER", headerName: "ID_USER", width: 100 },
  { field: "NM_FML_ORG", headerName: "NM_FML_ORG", editable: true, width: 180 },
  { field: "NM_FML_CHG", headerName: "NM_FML_CHG", editable: true, width: 180 },
  { field: "DT", headerName: "DT", width: 100 },
];

const columnsDownload = [
  { field: "SEQ", headerName: "SEQ", width: 60 },
  { field: "NM_PLATFORM", headerName: "NM_PLATFORM", width: 150 },
  { field: "ID_FML", headerName: "ID_FML", width: 100 },
  { field: "NM_CATG", headerName: "NM_CATG", width: 100 },
  { field: "NM_FML", headerName: "NM_FML", width: 200 },
  { field: "DT_DOWN", headerName: "DT_DOWN", width: 200 },
];

const columnsOrder = [
  { field: "SEQ", headerName: "SEQ", width: 60 },
  { field: "TYP_ADN", headerName: "TYP_ADN", width: 150 },
  { field: "DT_ORDR", headerName: "DT_ORDR", width: 200 },
  { field: "STATE", headerName: "STATE", width: 100, renderCell: RenderDate, align:'center' },
];

const columnsCart = [
  { field: "ID_FML", headerName: "ID_FML", width: 100 },
  { field: "NM_CATG", headerName: "NM_CATG", width: 100 },
  { field: "NM_FML", headerName: "NM_FML", width: 200 },
  { field: "ID_USER", headerName: "ID_USER", width: 100 },
  { field: "IS_USE", headerName: "IS_USE", width: 100 },
  { field: "DT_CART", headerName: "DT_CART", width: 150 },
];

function User() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [dataFavorite, setFavorite] = useState([]);
  const [dataFavoriteItems, setFavoriteItems] = useState([]);
  const [dataFavoriteModItems, setFavoriteModItems] = useState([]);
  const [dataCart, setCart] = useState([]);
  const [dataDownload, setDownload] = useState([]);
  const [dataOrder, setOrder] = useState([]);
  const [selectionFav, setSelectionFav] = useState([]);
  const [selectionFavItem, setSelectionFavItem] = useState([]);
  const [selectionDownload, setSelectionDownload] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [uuid, setUuid] = useState(params.get("uuid"));
  const [employeeId, setEmployeeId] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    if (selectionFav[0] === undefined) {
      return;
    }
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    const fetchLoginUUID = async () => {
      try {
        let data = new URLSearchParams();
        data.append(`UUID`, uuid);

        const options = {
          method: `POST`,
          body: data,
        };

        const response = await fetch(
          "https://api.haeahn.com/api/uuidlogin",
          options
        );
        const json = await response.json();
        //console.log(json);
        setEmployeeId(json.resultMessage);
      } catch (error) {
        console.log("error", error);
      }
    };

    const fetchDataFavorite = async () => {
      const postData = {
        USERID: employeeId,
      };
      //console.log(postData);

      try {
        const response = await fetch(baseuri + "favorite", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        const json = await response.json();
        //console.log(json);
        setFavorite(json);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataCart = async () => {
      const postData = {
        USERID: employeeId,
      };
      console.log(postData);

      try {
        const response = await fetch(baseuri + "cart", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        const json = await response.json();
        //console.log(json);
        setCart(json);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataDownload = async () => {
      const postData = {
        USERID: employeeId,
      };
      console.log(postData);

      try {
        const response = await fetch(baseuri + "downloadLog", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        const json = await response.json();
        //console.log(json);
        setDownload(json);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchDataOrder = async () => {
      const postData = {
        ID_USER_ORDR: employeeId,
      };

      try {
        const response = await fetch(baseuri2 + "queue", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        const json = await response.json();
        //console.log(json);
        setOrder(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLoginUUID();
    fetchDataFavorite();
    fetchDataCart();
    fetchDataDownload();
    fetchDataOrder();
  }, [uuid, employeeId]);

  const fetchDataFavorite = async () => {
    const postData = {
      USERID: employeeId,
    };
    console.log(postData);

    try {
      const response = await fetch(baseuri + "favorite", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const json = await response.json();
      //console.log(json);
      setFavorite(json);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteFavorite = async (e) => {
    Data.SetRouteLog(employeeId, "User", "FavDelete", "FUNCTION");
    const postData = {
      ID_LIST: selectionFav[0],
    };

    try {
      const res = await fetch(baseuri + "deleteFavoriteList", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
    } catch (err) {
      console.log(err);
    }

    fetchDataFavorite();
  };

  const handleDeleteFavoriteItem = async (e) => {
    Data.SetRouteLog(employeeId, "User", "FavItemDelete", "FUNCTION");
    const postData = {
      ID_FML: selectionFavItem[0],
      ID_LIST: selectionFav[0],
      USERID: employeeId,
    };

    console.log(postData);
    try {
      const res = await fetch(baseuri + "deleteFavoriteItem", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
    } catch (err) {
      console.error(err);
    }

    setSelectionFav(selectionFav[0]);
    handleGetFavoriteItems(selectionFav[0]);
  };

  const handleGetFavoriteItems = async (seq) => {
    const postData = {
      USERID: employeeId,
      ID_LIST: seq,
    };

    try {
      const res = await fetch(baseuri + "favoriteItems", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      const data = await res.json();
      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };
      setFavoriteItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrder = async () => {
    const postData = {
      ID_LIST: selectionFav[0],
    };

    try {
      const res = await fetch(baseuri + "deleteFavoriteList", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownload = async () => {
    axios({
      url: baseuri + "filename",
      params: {
        id: selectionDownload[0],
      },
    }).then((response0) => {
      axios({
        url: baseuri + "download",
        responseType: "blob",
        params: {
          id: selectionDownload[0],
          userid: employeeId,
          platform: "WEB",
        },
      }).then((response1) => {
        fileDownload(response1.data, response0.data);
      });
    });
  };

  const handleDownloadFavorite = async () => {
    Data.SetRouteLog(employeeId, "User", "FavDownload", "FUNCTION");
    if (selectionFav[0] === undefined) {
      return;
    }

    const selectedRow = dataFavorite.map((row) => {
      if (row.SEQ === selectionFav[0]) {
        return { ...row };
      }
      return row;
    });

    console.log(selectedRow[0].SEQ);
    console.log(selectedRow[0].ID_USER);
    console.log(selectedRow[0].NM_LIST);
    console.log(moment().format("YYYYMMDDHHmmss"));

    const name =
      moment().format("YYYYMMDDHHmmss") +
      "_" +
      selectedRow[0].ID_USER +
      "_" +
      selectedRow[0].NM_LIST +
      ".zip";

    console.log(name);

    axios({
      url: baseuri + "downloadFavorite",
      responseType: "blob",
      params: {
        id_list: selectedRow[0].SEQ,
        userid: employeeId,
        platform: "WEB",
        name: name,
      },
    }).then((response1) => {
      fileDownload(response1.data, name);
    });
  };

  const handleClick = async (e) => {
    Data.SetRouteLog(employeeId, "User", "FavItemRename", "FUNCTION");
    //console.log("dataFavoriteModItems", dataFavoriteModItems);
    //console.log("dataFavoriteItems", dataFavoriteItems);

    //console.log(JSON.stringify(dataFavoriteItems));

    try {
      const res = await fetch(baseuri + "favoriteReplaceName", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFavoriteItems),
      });
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      //setFavoriteItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditRowsModelChange = React.useCallback((model) => {
    //console.log("const handleEditRowsModelChange = React.useCallback((model)", model)

    // let items = [];
    // for (let index = 0; index < dataFavoriteItems.length; index++) {
    //   const item = dataFavoriteItems[index];
    //   if (model[item.ID_FML] !== undefined) {
    //     //item["NM_FML_ORG"] = model[item.ID_FML].NM_FML_ORG.value;
    //     //item["NM_FML_CHG"] = model[item.ID_FML].NM_FML_CHG.value;
    //     //item["NM_FML_CHG"] = model[item.ID_FML]["NM_FML_CHG"].value
    //     console.log(model[item.ID_FML].NM_FML_ORG)
    //     console.log(model[item.ID_FML].NM_FML_CHG)

    //     if (model[item.ID_FML].NM_FML_ORG !== undefined){
    //       item["NM_FML_ORG"] = model[item.ID_FML].NM_FML_ORG.value;
    //     }
    //     if (model[item.ID_FML].NM_FML_CHG !== undefined){
    //       item["NM_FML_CHG"] = model[item.ID_FML].NM_FML_CHG.value;
    //     }
    //   }
    //   items.push(item)
    // }

    // setFavoriteItems(items);
    //console.log(dataFavoriteItems)

    setEditRowsModel(model);
    //console.log(model);
  }, []);

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
      let items = [];
      //let modItems = [];
      for (let index = 0; index < dataFavoriteItems.length; index++) {
        const item = dataFavoriteItems[index];
        if (item.ID_FML === id) {
          item[field] = value;
          //modItems.push(item);
        }
        items.push(item);
      }

      // const updatedRows = dataFavoriteItems.map((row) => {
      //   if (row.ID_FML === id) {
      //     console.log(row);
      //     row[field] = value;
      //     return { ...row };
      //   }
      //   return row;
      // });

      //setFavoriteModItems(modItems);
      setFavoriteItems(items);
    },
    [dataFavoriteItems]
  );

  return (
    <div>
      <main>
        <Stack
          spacing={2}
          style={{
            height: "800px",
            display: "flex",
          }}
        >
          <div>즐겨찾기</div>
          <Stack direction="row" spacing={2}>
            <Stack width="48%" height="300px" direction="column" spacing={2}>
              <Stack
                direction="row"
                spacing={2}
                display="flex"
                justifyContent="flex-end"
              >
                <button
                  style={{ height: "25px", margin: "5px" }}
                  onClick={handleClickOpen}
                >
                  order
                </button>
                <button
                  style={{ height: "25px", margin: "5px" }}
                  onClick={handleDownloadFavorite}
                >
                  download
                </button>
                <button
                  style={{ height: "25px", margin: "5px" }}
                  onClick={handleDeleteFavorite}
                >
                  delete favorite
                </button>
                <SimpleDialog
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                  selectedFav={selectionFav[0]}
                  userId={employeeId}
                />
              </Stack>
              <DataGrid
                rows={dataFavorite}
                columns={columnsFavorite}
                getRowId={(row) => row.SEQ}
                rowHeight={35}
                rowsPerPageOptions={[100]}
                onRowClick={(event) => {
                  handleGetFavoriteItems(event.row.SEQ);
                }}
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionFav(newSelectionModel);
                }}
                selectionModel={selectionFav}
              />
            </Stack>
            <Stack width="48%" height="300px" direction="column" spacing={2}>
              <Stack
                direction="row"
                spacing={2}
                display="flex"
                justifyContent="flex-end"
              >
                <button
                  style={{ height: "25px", margin: "5px" }}
                  onClick={handleDeleteFavoriteItem}
                >
                  delete favorite Item
                </button>
                <button
                  style={{ height: "25px", margin: "5px" }}
                  onClick={handleClick}
                >
                  save replace
                </button>
              </Stack>

              <DataGrid
                rows={dataFavoriteItems}
                columns={columnsFavoriteItems}
                getRowId={(row) => row.ID_FML}
                rowHeight={35}
                rowsPerPageOptions={[100]}
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionFavItem(newSelectionModel);
                }}
                selectionModel={selectionFavItem}
                //editRowsModel={editRowsModel}
                //onEditRowsModelChange={handleEditRowsModelChange}
                onCellEditCommit={handleCellEditCommit}
              />
            </Stack>
          </Stack>

          <div>주문 이력</div>
          <Stack
            direction="row"
            spacing={2}
            display="flex"
            justifyContent="flex-end"
          >
            {/* <button
              style={{ height: "25px", margin: "5px" }}
              onClick={handleDownload}
            >
              downloads
            </button> */}
          </Stack>

          <DataGrid
            rows={dataOrder}
            columns={columnsOrder}
            getRowId={(row) => row.SEQ}
            rowHeight={35}
            rowsPerPageOptions={[100]}
            // onSelectionModelChange={(newSelectionModel) => {
            //   setSelectionDownload(newSelectionModel);
            // }}
            // selectionModel={selectionDownload}
          />
        </Stack>
      </main>
    </div>
  );
}
export default User;

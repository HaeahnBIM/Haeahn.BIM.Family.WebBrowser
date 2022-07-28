import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import fileDownload from "js-file-download";
import axios from "axios";
import Moment from "moment";
import moment from "moment";
import { useLocation, useSearchParams } from "react-router-dom";

const baseuri = "https://ueapi.haeahn.com/api/RvtCollection/";

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
  const [selectionFav, setSelectionFav] = useState([]);
  const [selectionFavItem, setSelectionFavItem] = useState([]);
  const [selectionDownload, setSelectionDownload] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [uuid, setUuid] = useState(params.get("uuid"));
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    fetchDataFavorite();
    fetchDataCart();
    fetchDataDownload();

    LoginByUUID(uuid).then((response) => {
      let user = JSON.parse(JSON.stringify(response.data));
      setEmployeeId(user.resultMessage);
    });
  }, []);

  const LoginByUUID = (UUID) => {
    try {
      return axios.post(
        "https://api.haeahn.com/api/uuidlogin",
        new URLSearchParams({ UUID }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataFavorite = async (e) => {
    const postData = {
      USERID: employeeId,
    };

    try {
      const res = await fetch(baseuri + "favorite", {
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
      setFavorite(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataCart = async (e) => {
    const postData = {
      USERID: employeeId,
    };

    try {
      const res = await fetch(baseuri + "cart", {
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
      setCart(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataDownload = async (e) => {
    const postData = {
      USERID: employeeId,
    };

    try {
      const res = await fetch(baseuri + "downloadLog", {
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
      setDownload(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFavorite = async (e) => {
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

  const handleGetFavoriteItems = async (e) => {
    //console.log(e.row.SEQ)

    const postData = {
      USERID: employeeId,
      ID_LIST: e.row.SEQ,
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
              </Stack>
              <DataGrid
                rows={dataFavorite}
                columns={columnsFavorite}
                getRowId={(row) => row.SEQ}
                rowHeight={35}
                rowsPerPageOptions={[100]}
                onRowClick={handleGetFavoriteItems}
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
                  onClick={handleDeleteFavorite}
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

          <div>다운로드 이력</div>
          <Stack
            direction="row"
            spacing={2}
            display="flex"
            justifyContent="flex-end"
          >
            <button
              style={{ height: "25px", margin: "5px" }}
              onClick={handleDownload}
            >
              downloads
            </button>
          </Stack>

          <DataGrid
            rows={dataDownload}
            columns={columnsDownload}
            getRowId={(row) => row.SEQ}
            rowHeight={35}
            rowsPerPageOptions={[100]}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionDownload(newSelectionModel);
            }}
            selectionModel={selectionDownload}
          />
        </Stack>
      </main>
    </div>
  );
}
export default User;

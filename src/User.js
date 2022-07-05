import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import fileDownload from "js-file-download";
import axios from "axios";

const baseuri = "https://ueapi.haeahn.com/api/RvtCollection/";

const columnsFavorite = [
  { field: "ID_FML", headerName: "ID_FML", width: 100 },
  { field: "NM_CATG", headerName: "NM_CATG", width: 100 },
  { field: "NM_FML", headerName: "NM_FML", width: 200 },
  { field: "ID_USER", headerName: "ID_USER", width: 100 },
  { field: "IS_USE", headerName: "IS_USE", width: 100 },
  { field: "DT_FAV", headerName: "DT_FAV", width: 150 },
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
  const [dataFavorite, setFavorite] = useState([]);
  const [dataCart, setCart] = useState([]);
  const [dataDownload, setDownload] = useState([]);
  const [selectionFav, setSelectionFav] = useState([]);
  const [selectionDownload, setSelectionDownload] = useState([]);

  useEffect(() => {
    fetchDataFavorite();
    fetchDataCart();
    fetchDataDownload();
  }, []);

  const fetchDataFavorite = async (e) => {
    const postData = {
      USERID: "20211201",
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
      USERID: "20211201",
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
      USERID: "20211201",
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
      ID: selectionFav[0],
      USERID: "20211201",
    };

    try {
      const res = await fetch(baseuri + "deleteFavorite", {
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
          userid: "20211201",
          platform: "WEB",
        },
      }).then((response1) => {
        fileDownload(response1.data, response0.data);
      });
    });
  };

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
            getRowId={(row) => row.ID_FML}
            rowHeight={35}
            rowsPerPageOptions={[100]}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionFav(newSelectionModel);
            }}
            selectionModel={selectionFav}
          />
          <div>다운로드 이력</div>
          <Stack direction="row" spacing={2}>
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
            getRowId={(row) => row.ID_FML}
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

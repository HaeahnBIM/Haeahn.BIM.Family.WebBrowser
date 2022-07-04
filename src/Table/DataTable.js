import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import "./DataTable.css";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import Input from "@mui/material/Input";
import fileDownload from "js-file-download";
import axios from "axios";

const baseuri = "https://ueapi.haeahn.com/api/RvtCollection/";

const columnsFamily = [
  { field: "SEQ", headerName: "ID", width: 60 },
  { field: "NM_CATG", headerName: "NM_CATG", width: 100 },
  { field: "NM_FML", headerName: "NM_FML", width: 250 },
  { field: "TotalCount", headerName: "총 유리개수", width: 100 },
  { field: "ElevCount", headerName: "유리 짝", width: 100 },
  { field: "HorzCount", headerName: "가로개수", width: 100 },
  { field: "VertCount", headerName: "세로개수", width: 100 },
  { field: "IsDouble", headerName: "이중창", width: 100 },
  { field: "IsCorner", headerName: "코너", width: 100 },
  { field: "CountLike", headerName: "좋아요", width: 80 },
  { field: "CountDown", headerName: "다운로드", width: 80 },
  { field: "CountReport", headerName: "오류신고", width: 80 },
  { field: "IsNG", headerName: "품질", width: 80 }
];

const columnsSymbol = [
  { field: "SEQ", headerName: "ID", width: 60 },
  { field: "ID_REL_FML", headerName: "ID_REL_FML", width: 120, hide: true },
  { field: "NM_SYM", headerName: "NM_SYM", width: 250 },
  { field: "IMG_SYM", headerName: "IMG_SYM", width: 300, hide: true },
];

const columnsSameFamily = [
  { field: "SEQ", headerName: "ID", width: 80 },
  { field: "NM_CATG", headerName: "NM_CATG", width: 120 },
  { field: "NM_FML", headerName: "NM_FML", width: 300 },
  { field: "VOL", headerName: "VOL", width: 300 },
  { field: "IMG_SYM", headerName: "IMG_SYM", width: 300, hide: true },
];

const columnsParameter = [
  { field: "SEQ", headerName: "ID", width: 50 },
  { field: "ID_REL", headerName: "ID_REL", width: 120 },
  { field: "BuiltInParameter", headerName: "BuiltInParameter", width: 150 },
  { field: "Name", headerName: "Name", width: 150 },
  { field: "ParameterGroup", headerName: "ParameterGroup", width: 150 },
  { field: "ParameterType", headerName: "ParameterType", width: 150 },
  { field: "Formula", headerName: "Formula", width: 150 },
  { field: "IsProject", headerName: "IsProject", width: 150 },
  { field: "IsInstance", headerName: "IsInstance", width: 150 },
  { field: "IsReadOnly", headerName: "IsReadOnly", width: 150 },
  { field: "IsReporting", headerName: "IsReporting", width: 150 },
  { field: "IsShared", headerName: "IsShared", width: 150 },
  { field: "StorageType", headerName: "StorageType", width: 150 },
  { field: "UserModifiable", headerName: "UserModifiable", width: 150 },
];

const columnsRelation = [
  { field: "SEQ", headerName: "ID", width: 50 },
  { field: "ID_REL", headerName: "ID_REL", width: 120 },
  { field: "TYP_REL", headerName: "TYP_REL", width: 150 },
  { field: "VAL_REL", headerName: "VAL_REL", width: 150 },
  { field: "DTL_REL", headerName: "DTL_REL", width: 150 },
  { field: "IS_USE", headerName: "IS_USE", width: 150 },
];

const DataTable = () => {
  const [dataFamily, setFamily] = useState([]);
  const [dataSameFamily, setSameFamily] = useState([]);
  const [dataSymbol, setSymbol] = useState([]);
  const [dataSymbolImage, setSymbolImage] = useState("");
  const [dataSymbolImage2, setSymbolImage2] = useState("");
  const [dataParameter, setParameter] = useState([]);
  const [dataRelation, setRelation] = useState([]);
  const [headerUserEnter, setHeaderUserEnter] = useState([]);
  const [dataUsgLoad, setDataUsgLoad] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectionSameModel, setSelectionSameModel] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [searchTotal, setSearchTotal] = useState("");
  const [searchElev, setSearchElev] = useState("");
  const [searchHorz, setSearchHorz] = useState("");
  const [searchVert, setSearchVert] = useState("");
  const [searchDoubleAll, setSearchDoubleAll] = useState(true);
  const [searchDouble, setSearchDouble] = useState(false);

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    fetchTableFamily();
  }, []);

  const fetchTableFamily = async () => {
    var url = new URL(baseuri + "families");

    await fetch(url)
      .then((data) => data.json())
      .then((data) => setFamily(data));
  };

  const fetchTableSymbol = async (id) => {
    var url = new URL(baseuri + "symbols");
    var params = { nmTable: id };

    await fetch(url)
      .then((data) => data.json())
      .then((data) => setFamily(data));
  };

  const handleGetData = async (e) => {
    const postData = {
      ID_REL: e.SEQ,
    };

    try {
      const res = await fetch(baseuri + "symbols", {
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
      let symbols = [];
      for (let i = 0; i < data.length; i++) {
        const d = data[i];

        symbols.push({
          SEQ: d.SEQ,
          ID_REL_FML: d.ID_REL_FML,
          NM_SYM: d.NM_SYM,
          IMG_SYM: d.IMG_SYM,
        });
      }
      setSymbol(symbols.map((row) => ({ ...row })));
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await fetch(baseuri + "parameters", {
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
      let parameters = [];
      for (let i = 0; i < data.length; i++) {
        const d = data[i];

        parameters.push({
          SEQ: d.SEQ,
          ID_REL: d.ID_REL,
          BuiltInParameter: d.BuiltInParameter,
          Name: d.Name,
          ParameterGroup: d.ParameterGroup,
          ParameterType: d.ParameterType,
          Formula: d.Formula,
          IsProject: d.IsProject,
          IsInstance: d.IsInstance,
          IsReadOnly: d.IsReadOnly,
          IsReporting: d.IsReporting,
          IsShared: d.IsShared,
          StorageType: d.StorageType,
          UserModifiable: d.UserModifiable,
        });
      }
      setParameter(parameters.map((row) => ({ ...row })));
    } catch (err) {
      console.log(err);
    }

    try {
      const res = await fetch(baseuri + "relations", {
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
      let relations = [];
      for (let i = 0; i < data.length; i++) {
        const d = data[i];

        relations.push({
          SEQ: d.SEQ,
          ID_REL: d.ID_REL,
          TYP_REL: d.TYP_REL,
          VAL_REL: d.VAL_REL,
          DTL_REL: d.DTL_REL,
          IS_USE: d.IS_USE,
          ID_ELEM: d.ID_ELEM,
        });
      }
      setRelation(relations.map((row) => ({ ...row })));
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetSameVolmne = async (e) => {
    const postData = {
      ID: e.SEQ,
      RATIO: 0.001,
    };

    try {
      const res = await fetch(baseuri + "findSameVol", {
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
      setSameFamily(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePreviewImageAndSameData = async (e) => {
    console.log(e.row);
    setSymbolImage(e.row.IMG_SYM);
    handleGetData(e.row);
    handleGetSameVolmne(e.row);
  };

  const handlePreviewImage = async (e) => {
    setSymbolImage2(e.row.IMG_SYM);
  };

  const handleValueChange = async (e) => {
    //setSearchKeyword(e.target.value);
    //console.log(e.target.value)

    if (e.target.value === "") {
      fetchTableFamily();
    } else {
      const postData = {
        data: e.target.value,
      };

      try {
        const res = await fetch(baseuri + "search", {
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
        setFamily(data);

        // const result = {
        //   status: res.status + "-" + res.statusText,
        //   headers: {
        //     "Content-Type": res.headers.get("Content-Type"),
        //     "Content-Length": res.headers.get("Content-Length"),
        //   },
        //   data: data,
        // };
        // let search = [];
        // for (let i = 0; i < data.length; i++) {
        //   const d = data[i];

        //   search.push({
        //     SEQ: d.SEQ,
        //   });
        // }
        // setSymbol(search.map((row) => ({ ...row })));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDownload = async () => {
    axios({
      url: baseuri + "filename",
      params: {
        id: selectionModel[0],
      },
    }).then((response0) => {
      axios({
        url: baseuri + "download",
        responseType: "blob",
        params: {
          id: selectionModel[0],
          userid: "20211201",
          platform: "WEB",
        },
      }).then((response1) => {
        fileDownload(response1.data, response0.data);
      });
    });
  };

  const handleChangeTotal = (e) => {
    if (Number(e.target.value) < 0) return;
    setSearchTotal(e.target.value);
  };

  const handleChangeElev = (e) => {
    if (Number(e.target.value) < 0) return;
    setSearchElev(e.target.value);
  };

  const handleChangeHorz = (e) => {
    if (Number(e.target.value) < 0) return;
    setSearchHorz(e.target.value);
  };

  const handleChangeVert = (e) => {
    if (Number(e.target.value) < 0) return;
    setSearchVert(e.target.value);
  };

  const handleChangeDouble = (e) => {
    setSearchDouble(e.target.checked);
  };

  const handleChangeDoubleAll = (e) => {
    setSearchDoubleAll(e.target.checked);
  };

  const handleClickSearch = () => {
    handleSearch();
  };

  const handleSearch = async (e) => {
    const postData = {
      TOTAL: searchTotal,
      ELEV: searchElev,
      HORZ: searchHorz,
      VERT: searchVert,
      DOUBLEALL: searchDoubleAll,
      DOUBLE: searchDouble,
    };

    console.log(JSON.stringify(postData));

    try {
      const res = await fetch(baseuri + "search2", {
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
      console.log(data);

      // let symbols = [];
      // for (let i = 0; i < data.length; i++) {
      //   const d = data[i];

      //   symbols.push({
      //     SEQ: d.SEQ,
      //     ID_REL_FML: d.ID_REL_FML,
      //     NM_SYM: d.NM_SYM,
      //     IMG_SYM: d.IMG_SYM,
      //   });
      // }
      setFamily(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onRemove = () => {
    if (selectionSameModel.length === 0) return;
    if (window.confirm("삭제합니까?")) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    let families = [];
    for (let i = 0; i < selectionSameModel.length; i++) {
      const family = selectionSameModel[i];
      families.push("" + family);
    }

    try {
      const res = await fetch(baseuri + "deleteFamily", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(families),
      });
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      const data = await res.json();
      fetchTableFamily();
      setSameFamily([]);
      setSymbol([]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReport = async (e) => {
    const postData = {
      ID: selectionModel[0],
      USERID: "20211201",
      TYP: "CATEGORY",
    };

    console.log(postData)

    try {
      const res = await fetch(baseuri + "report", {
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

  const handleLike = async (e) => {
    const postData = {
      ID: selectionModel[0],
      USERID: "20211201",
    };

    console.log(postData)

    try {
      const res = await fetch(baseuri + "like", {
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

  return (
    <div style={{ margin: "10px" }}>
      <div
        className="area_menu"
        style={{
          width: "100%",
          margin: "10px 10px 10px 0px",
          height: "50px",
          display: "inline-block",
          verticalAlign: "middle",
        }}
      >
        <div
          style={{
            height: "30px",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        >
          패밀리 브라우저
        </div>
        <div>
          총 유리개수
          <TextField
            style={{ margin: "0px 30px 0px 10px", width: "100px" }}
            id="search-total"
            type="text"
            variant="standard"
            value={searchTotal}
            onChange={handleChangeTotal}
          />
          유리짝 수
          <TextField
            style={{ margin: "0px 30px 0px 10px", width: "100px" }}
            id="search-elev"
            type="text"
            variant="standard"
            value={searchElev}
            onChange={handleChangeElev}
          />
          가로개수
          <TextField
            style={{ margin: "0px 30px 0px 10px", width: "100px" }}
            id="search-horz"
            type="text"
            variant="standard"
            value={searchHorz}
            onChange={handleChangeHorz}
          />
          세로개수
          <TextField
            style={{ margin: "0px 30px 0px 10px", width: "100px" }}
            id="search-vert"
            type="text"
            variant="standard"
            value={searchVert}
            onChange={handleChangeVert}
          />
          이중창 | 전체
          <Checkbox
            style={{ margin: "0px 30px 0px 10px" }}
            id="search-double"
            value={searchDoubleAll}
            checked={searchDoubleAll}
            onChange={handleChangeDoubleAll}
          />
          이중창
          <Checkbox
            style={{ margin: "0px 30px 0px 10px" }}
            id="search-double"
            value={searchDouble}
            onChange={handleChangeDouble}
          />
          <button
            style={{ height: "30px", margin: "5px", width: "80px" }}
            onClick={handleClickSearch}
          >
            검색
          </button>
        </div>
      </div>
      <div style={{ display: "flex", height: "800px" }}>
        <div style={{ width: "75%", margin: "0px 20px 0px 0px" }}>
          <div
            style={{
              height: "40px",
              display: "inline-block",
            }}
          >
            Family
          </div>
          <button
            style={{ height: "25px", float: "right", margin: "5px" }}
            onClick={handleDownload}
          >
            download
          </button>
          <button
            style={{ height: "25px", float: "right", margin: "5px" }}
            onClick={handleReport}
          >
            report
          </button>
          <button
            style={{ height: "25px", float: "right", margin: "5px" }}
            onClick={handleLike}
          >
            like
          </button>
          <div style={{ height: "50%", margin: "0px 0px 20px 0px" }}>
            <DataGrid
              rows={dataFamily}
              columns={columnsFamily}
              getRowId={(row) => row.SEQ}
              rowHeight={35}
              rowsPerPageOptions={[100]}
              onRowClick={handlePreviewImageAndSameData}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
            />
          </div>
          <div style={{ margin: "0px 0px 20px 0px" }}>
            Equal Volume
            <button
              style={{ height: "25px", float: "right", margin: "5px" }}
              onClick={onRemove}
            >
              delete
            </button>
          </div>

          <div style={{ height: "45%" }}>
            <DataGrid
              rows={dataSameFamily}
              columns={columnsSameFamily}
              getRowId={(row) => row.SEQ}
              rowHeight={35}
              rowsPerPageOptions={[100]}
              onRowClick={handlePreviewImage}
              checkboxSelection
              //checkboxSelection={checkboxSelection}
              onSelectionModelChange={(sel) => {
                setSelectionSameModel(sel);
              }}
              selectionModel={selectionSameModel}
            />
          </div>
        </div>
        <div
          style={{
            flexGrow: "0.3",
            height: "auto",
            margin: "0px 20px 0px 0px",
          }}
        >
          <div style={{ height: "auto" }}>
            <div
              style={{
                height: "40px",
                display: "inline-block",
              }}
            >
              Symbol
            </div>
            <div style={{ height: "370px", margin: "0px 0px 20px 0px" }}>
              <DataGrid
                getRowId={(row) => row.SEQ}
                rows={dataSymbol}
                columns={columnsSymbol}
                rowHeight={35}
                pageSize={100}
              />
            </div>
            <div
              style={{
                height: "370px",
                display: "inline-block",
                margin: "0px 20px 0px 0px",
              }}
            >
              <p>Family</p>
              <img
                src={`data:image/png;base64,${dataSymbolImage}`}
                width="200"
                height="200"
                alt=""
              />
            </div>
            <div style={{ height: "370px", display: "inline-block" }}>
              <p>Same Family</p>
              <img
                src={`data:image/png;base64,${dataSymbolImage2}`}
                width="200"
                height="200"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* <div style={{ flexGrow: "1", height: "auto" }}>
          <div style={{ height: "auto" }}>
            <div
              style={{
                height: "40px",
                display: "inline-block",
              }}
            >
              Parameters
            </div>
            <div style={{ height: "370px", margin: "0px 0px 20px 0px" }}>
              <DataGrid
                getRowId={(row) => row.SEQ}
                rows={dataParameter}
                columns={columnsParameter}
                rowHeight={35}
                pageSize={100}
              />
            </div>
            <div
              style={{
                height: "40px",
                display: "inline-block",
              }}
            >
              Relations
            </div>
            <div style={{ height: "370px" }}>
              <DataGrid
                getRowId={(row) => row.SEQ}
                rows={dataRelation}
                columns={columnsRelation}
                rowHeight={35}
                pageSize={100}
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DataTable;

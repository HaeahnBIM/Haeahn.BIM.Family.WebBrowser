import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./DataTable.css";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import Input from "@mui/material/Input";
import fileDownload from "js-file-download";
import axios from "axios";

const baseuri = "https://ueapi.haeahn.com/api/RvtCollection/";

const columnsFamily = [
  { field: "SEQ", headerName: "ID", width: 50 },
  {
    field: "ID_REL_FILE",
    headerName: "ID_REL_FILE",
    width: 120,
  },
  {
    field: "NM_CATG",
    headerName: "NM_CATG",
    width: 150,
  },
  {
    field: "NM_FML",
    headerName: "NM_FML",
    width: 300,
  },
];

const columnsSymbol = [
  { field: "SEQ", headerName: "ID", width: 50 },
  {
    field: "ID_REL_FML",
    headerName: "ID_REL_FML",
    width: 120,
  },
  {
    field: "NM_SYM",
    headerName: "NM_SYM",
    width: 150,
  },
  {
    field: "IMG_SYM",
    headerName: "IMG_SYM",
    width: 300,
    hide: true,
  },
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
  const [dataSymbol, setSymbol] = useState([]);
  const [dataSymbolImage, setSymbolImage] = useState("");
  const [dataParameter, setParameter] = useState([]);
  const [dataRelation, setRelation] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [headerUserEnter, setHeaderUserEnter] = useState([]);
  const [dataUsgLoad, setDataUsgLoad] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [snackbar, setSnackbar] = useState(null);

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
      ID_REL: e.row.SEQ,
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

  const PreviewImage = async (e) => {
    //console.log(e.row.IMG_SYM);
    setSymbolImage(e.row.IMG_SYM);
  };

  const handleValueChange = async (e) => {
    setSearchKeyword(e.target.value);
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

  const handleDownload = async () =>{
    axios({
      url: baseuri + "filename",
      params: {
        id:selectionModel[0]
      }
    }).then((response0) => {
      axios({
        url: baseuri + "download",
        responseType: 'blob',
        params: {
          id:selectionModel[0]
        }
      }).then((response1) => {
        fileDownload(response1.data, response0.data);
      });
    });    
  }

  return (
    <div style={{ margin: "10px" }}>
      <div className="area_menu">
        <div
          style={{
            height: "40px",
            display: "inline-block",
            verticalAlign: "middle",
          }}
        >
          패밀리 브라우저
        </div>
        <TextField
          style={{ margin: "0px 10px 10px 20px" }}
          id="search-text"
          variant="standard"
          onChange={handleValueChange}
          value={searchKeyword}
        />
        {/* <button style={{ height: "30px", margin: "5px" }} >
          검색
        </button> */}
      </div>
      <div style={{ display: "flex", height: "800px" }}>
        <div style={{ width: "35%", margin: "0px 20px 0px 0px" }}>
          <div
            style={{
              height: "40px",
              display: "inline-block",
            }}
          >
            Family
          </div>
            <button style={{ height: "25px", float: "right", margin: "5px" }} onClick={handleDownload}>
              download
            </button>
          <div style={{ height: "100%" }}>
            <DataGrid
              rows={dataFamily}
              columns={columnsFamily}
              getRowId={(row) => row.SEQ}
              rowHeight={35}
              rowsPerPageOptions={[100]}
              onRowClick={handleGetData}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
              }}
              selectionModel={selectionModel}
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
                onRowClick={PreviewImage}
                rowHeight={35}
                pageSize={100}
              />
            </div>
            <div
              style={{
                height: "40px",
                display: "inline-block",
              }}
            ></div>
            <div style={{ height: "370px" }}>
              <img
                src={`data:image/png;base64,${dataSymbolImage}`}
                width="200"
                height="200"
                alt=""
              />
            </div>
          </div>
        </div>
        <div style={{ flexGrow: "1", height: "auto" }}>
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
        </div>
      </div>
    </div>
  );
};

export default DataTable;

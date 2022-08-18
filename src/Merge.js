import { Divider, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CategoryFilter from "./components/CategoryFilter";
import WindowTypeFilter from "./components/WindowTypeFilter";
import DoorTypeFilter from "./components/DoorTypeFilter";
import Filter from "./components/Filter";
import Dummy from "./api/Dummy.json";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

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
  { field: "IsNG", headerName: "품질", width: 80 },
];

const columnsSameFamily = [
  { field: "SEQ", headerName: "ID", width: 80 },
  { field: "NM_CATG", headerName: "NM_CATG", width: 120 },
  { field: "NM_FML", headerName: "NM_FML", width: 300 },
  { field: "VOL", headerName: "VOL", width: 300 },
  { field: "IMG_SYM", headerName: "IMG_SYM", width: 300, hide: true },
];

const columnsSymbol = [
  { field: "SEQ", headerName: "ID", width: 60 },
  { field: "ID_REL_FML", headerName: "ID_REL_FML", width: 120, hide: true },
  { field: "NM_SYM", headerName: "NM_SYM", width: 200 },
  { field: "IMG_SYM", headerName: "IMG_SYM", width: 300, hide: true },
];

const columnsReport = [
  { field: "SEQ", headerName: "SEQ", width: 60 },
  { field: "ID_FML", headerName: "ID_FML", width: 100 },
  { field: "NM_CATG", headerName: "NM_CATG", width: 100 },
  { field: "NM_FML", headerName: "NM_FML", width: 200 },
  { field: "ID_USER", headerName: "ID_USER", width: 100 },
  { field: "CD_TYP_ERR", headerName: "CD_TYP_ERR", width: 150 },
  { field: "DT_REPORT", headerName: "DT_REPORT", width: 150 },
];

function Merge() {
  const [dataFamily, setFamily] = useState([]);
  const [familyFiltered, setFamilyFiltered] = useState([]);
  const [dataSameFamily, setSameFamily] = useState([]);
  const [dataReport, setReport] = useState([]);
  const [filterCategory, setFilterCategory] = useState(Dummy["카테고리"]);
  const [windows, setWindows] = useState(Dummy["창유형"]);
  const [doors, setDoors] = useState(Dummy["문유형"]);
  const [filterCondition, setFilterCondition] = useState(Dummy["중복조건"]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectionSameModel, setSelectionSameModel] = useState([]);
  const [dataSymbol, setSymbol] = useState([]);
  const [dataParameter, setParameter] = useState([]);
  const [dataRelation, setRelation] = useState([]);
  const [dataSymbolImage, setSymbolImage] = useState("");
  const [dataSymbolImage2, setSymbolImage2] = useState("");

  const _rowHeight = 30;

  useEffect(() => {
    fetchDataReport();
    fetchTableFamily();
  }, []);

  const fetchTableFamily = async () => {
    var url = new URL(baseuri + "families");

    await fetch(url)
      .then((data) => data.json())
      .then((data) => {
        setFamily(data);
        setFamilyFiltered(data);
      });
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const fetchDataReport = async (e) => {
    try {
      const res = await fetch(baseuri + "report", {
        method: "Get",
        mode: "cors",
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
      setReport(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeCategory = (e) => {
    setFamilyFiltered([...dataFamily]);

    let isCheckedFilter = false;
    for (let i = 0; i < filterCategory.length; i++) {
      if (filterCategory[i].checked) {
        isCheckedFilter = true;
        break;
      }
    }

    if (isCheckedFilter === false) {
      return;
    }

    let checkedFilters = [];
    for (let i = 0; i < filterCategory.length; i++) {
      if (filterCategory[i].checked) {
        checkedFilters.push(filterCategory[i]);
      }
    }
  };

  const handleChangeCondition = (e) => {
    setFamilyFiltered([...dataFamily]);

    let isCheckedFilter = false;
    for (let i = 0; i < filterCondition.length; i++) {
      if (filterCondition[i].checked) {
        isCheckedFilter = true;
        break;
      }
    }

    if (isCheckedFilter === false) {
      return;
    }

    let checkedFilters = [];
    for (let i = 0; i < filterCondition.length; i++) {
      if (filterCondition[i].checked) {
        checkedFilters.push(filterCondition[i]);
      }
    }
  };

  const handleButtonClick = (e) => {

    let postData = {};

    let isCheckedFilter = false;
    for (let i = 0; i < filterCategory.length; i++) {
      if (filterCategory[i].checked) {
        isCheckedFilter = true;
        break;
      }
    }

    if (isCheckedFilter === false) {
      return;
    }

    for (let i = 0; i < filterCondition.length; i++) {
      if (filterCondition[i].checked) {
        isCheckedFilter = true;
        break;
      }
    }

    if (isCheckedFilter === false) {
      return;
    }

    for (let i = 0; i < filterCategory.length; i++) {
      postData[filterCategory[i].key] = filterCategory[i].checked;
    }

    for (let i = 0; i < filterCondition.length; i++) {
      postData[filterCondition[i].key] = filterCondition[i].checked;
    }
    
    console.log(JSON.stringify(postData))
  };

  const handlePreviewImageAndSameData = async (e) => {
    //console.log(e.row);
    setSymbolImage(e.row.IMG_SYM);
    handleGetData(e.row);
    handleGetSameVolmne(e.row);
  };

  const handlePreviewImage = async (e) => {
    setSymbolImage2(e.row.IMG_SYM);
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

  return (
    <div style={{ margin: "10px" }}>
      <main>
        <Stack
          direction={"row"}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
            width="180px"
            minWidth="180px"
          >
            <Stack direction="column" spacing={1}>
              <div onChange={handleChangeCategory}>
                <Filter
                  filterList={filterCategory}
                  filterName={"카테고리"}
                ></Filter>
              </div>
              <div onChange={handleChangeCondition}>
                <Filter filterList={filterCondition} filterName={"중복검토"}></Filter>
              </div>
            </Stack>
            <button onClick={handleButtonClick} style={{ height: "30px", margin: "5px", width: "100%" }}>
              검색
            </button>
          </Stack>

          <Stack
            width="100%"
            height="800px"
            direction={"column"}
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            <Stack
              height="80%"
              style={{ margin: "10px" }}
              direction={"row"}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Stack width="80%" height="100%" direction={"column"} spacing={2}>
                <Stack direction={"row"} spacing={2} margin="5px">
                  <span style={{ width: "100%" }}>Family</span>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <button style={{ height: "25px", width: "80px" }}>
                      download
                    </button>
                    <button style={{ height: "25px", width: "80px" }}>
                      report
                    </button>
                  </Stack>
                </Stack>

                <DataGrid
                  rows={familyFiltered}
                  columns={columnsFamily}
                  getRowId={(row) => row.SEQ}
                  rowHeight={_rowHeight}
                  rowsPerPageOptions={[100]}
                  onRowClick={handlePreviewImageAndSameData}
                  //checkboxSelection
                  onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                  }}
                  selectionModel={selectionModel}
                />

                <Stack direction={"row"} spacing={2} margin="5px">
                  <span style={{ width: "100%" }}>Equal Volume</span>

                  <Stack
                    direction={"row"}
                    spacing={2}
                    display="flex"
                    justifyContent="flex-end"
                  >
                  <button style={{ height: "25px" }}>
                    delete
                  </button>

                  </Stack>
                </Stack>

                
                <div style={{ height: "200px" }}>
                  <DataGrid
                    rows={dataSameFamily}
                    columns={columnsSameFamily}
                    getRowId={(row) => row.SEQ}
                    rowHeight={_rowHeight}
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
              </Stack>

              <Stack direction={"column"} spacing={2} width="400px">
                <span style={{ margin: "5px" }}>Type</span>
                <DataGrid
                  getRowId={(row) => row.SEQ}
                  rows={dataSymbol}
                  columns={columnsSymbol}
                  rowHeight={_rowHeight}
                  pageSize={100}
                />
                {/* <span style={{ margin: "5px" }}>Patameter</span>
                <DataGrid
                  getRowId={(row) => row.SEQ}
                  rows={dataParameter}
                  columns={columnsParameter}
                  rowHeight={_rowHeight}
                  pageSize={100}
                /> */}

                <span style={{ margin: "10px 5px 5px 5px" }}>
                  Similar Family
                </span>

                <Stack height="20%" direction={"row"} spacing={2}>
                  <img
                    src={`data:image/png;base64,${dataSymbolImage}`}
                    width="150"
                    height="150"
                    alt=""
                  />
                  <img
                    src={`data:image/png;base64,${dataSymbolImage2}`}
                    width="150"
                    height="150"
                    alt=""
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </main>
    </div>
  );
}
export default Merge;

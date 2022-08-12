import React, { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Divider, Stack } from "@mui/material";
import Filter from "./components/Filter";
import Dummy from "./api/Dummy.json";

const baseuri = "https://ueapi.haeahn.com/api/RvtCollection/";
const baseuri2 = "https://ueapi.haeahn.com/api/FamilyAutomation/";

const columnsCentral = [
  { field: "SEQ", headerName: "ID", width: 60 },
  { field: "Code", headerName: "Code", width: 100 },
  { field: "Share", headerName: "Share", width: 300 },
];

const columnsModel = [
  { field: "SEQ", headerName: "SEQ", width: 60 },
  { field: "Code", headerName: "Code", width: 100 },
  { field: "RevitVersion", headerName: "RevitVersion", width: 100 },
  { field: "Filepath", headerName: "Filepath", width: 700 },
];

function Central() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [uuid, setUuid] = useState(params.get("uuid"));
  const [employeeId, setEmployeeId] = useState("");

  const [central, setCentral] = useState([]);
  const [centralModel, setCentralModel] = useState([]);
  const [selectedCentral, setSelectedCentral] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [versionFilter, setVersionFilter] = useState(Dummy["버전"]);

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
        setEmployeeId(json.resultMessage);
      } catch (err) {
        console.error(err);
      }
    };

    const handleCentral = async () => {
      try {
        const response = await fetch(baseuri + "centrals", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        setCentral(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLoginUUID();
    handleCentral();
  }, []);

  const _rowHeight = 30;

  const handleCentralModel = async (event) => {
    const postData = {
      SHARE_PATH: event.row.Share,
    };

    try {
      const response = await fetch(baseuri + "centralModels", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const json = await response.json();
      setCentralModel(json);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeVersion = (e) => {};

  const handleExtractFamily = async (event) => {

    const postData = {
      TYP_ADN: "extractfamily",
      MODEL_PATH: selectedModel,
      ID_USER_ORDR: employeeId
    };

    console.log(JSON.stringify(postData))

    try {
      const response = await fetch(baseuri2 + "setOrder", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      //const json = await response.json();
      //setCentralModel(json);
    } catch (err) {
      console.error(err);
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
          <Stack spacing={1} width="250px">
            <div onChange={handleChangeVersion}>
              <Filter filterList={versionFilter} filterName="버전"></Filter>
            </div>
          </Stack>

          <Stack
            width="100%"
            height="850px"
            direction={"column"}
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            <Stack
              height="100%"
              style={{ margin: "10px" }}
              direction={"row"}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Stack width="80%" height="100%" direction={"column"} spacing={2}>
                <Stack direction={"row"} spacing={2} margin="5px">
                  <span style={{ width: "100%" }}>Central</span>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <button style={{ height: "25px", width: "80px" }}>
                      download
                    </button>
                    <button style={{ height: "25px", width: "80px" }}>
                      report
                    </button>
                    <button style={{ height: "25px", width: "80px" }}>
                      like
                    </button>
                    <button style={{ height: "25px", width: "100px" }}>
                      add favorite
                    </button>
                    <button style={{ height: "25px", width: "100px" }}>
                      delete favorite
                    </button>
                  </Stack>
                </Stack>

                <DataGrid
                  rows={central}
                  columns={columnsCentral}
                  getRowId={(row) => row.Share}
                  rowHeight={_rowHeight}
                  rowsPerPageOptions={[100]}
                  onRowClick={(event) => {
                    handleCentralModel(event);
                  }}
                  onSelectionModelChange={(sel) => {
                    setSelectedCentral(sel);
                  }}
                  selectionModel={selectedCentral}
                />

                <Stack direction={"row"} spacing={2} margin="5px">
                  <span style={{ width: "100%" }}>Model</span>

                  <Stack
                    direction={"row"}
                    spacing={2}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <button
                      onClick={handleExtractFamily}
                      style={{ height: "25px", width: "150px" }}
                    >
                      Family Extraction
                    </button>
                  </Stack>
                </Stack>

                <div style={{ height: "400px" }}>
                  <DataGrid
                    rows={centralModel}
                    columns={columnsModel}
                    checkboxSelection
                    disableSelectionOnClick 
                    getRowId={(row) => row.RevitVersion + "|"+ row.Filepath}
                    rowHeight={_rowHeight}
                    rowsPerPageOptions={[100]}
                    onRowClick={(event) => {
                      handleExtractFamily(event);
                    }}
                    onSelectionModelChange={(sel) => {
                      setSelectedModel(sel);
                    }}
                    selectionModel={selectedModel}
                  />
                </div>
              </Stack>

              <Stack direction={"column"} spacing={2} width="400px">
                <span style={{ margin: "5px" }}>Type</span>

                <span style={{ margin: "10px 5px 5px 5px" }}>
                  Similar Family
                </span>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </main>
      <div>
        <React.Fragment key={"right"}></React.Fragment>
      </div>
    </div>
  );
}
export default Central;

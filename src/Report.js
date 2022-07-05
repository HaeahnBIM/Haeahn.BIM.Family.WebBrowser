import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const baseuri = "https://ueapi.haeahn.com/api/RvtCollection/";

const columnsReport = [
  { field: "SEQ", headerName: "SEQ", width: 60 },
  { field: "ID_FML", headerName: "ID_FML", width: 100 },
  { field: "NM_CATG", headerName: "NM_CATG", width: 100 },
  { field: "NM_FML", headerName: "NM_FML", width: 200 },
  { field: "ID_USER", headerName: "ID_USER", width: 100 },
  { field: "CD_TYP_ERR", headerName: "CD_TYP_ERR", width: 150 },
  { field: "DT_REPORT", headerName: "DT_REPORT", width: 150 },
];

function Report() {
  const [dataReport, setReport] = useState([]);

  useEffect(() => {
    fetchDataReport();
  }, []);

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
          <div>신고 목록</div>
          <DataGrid
            rows={dataReport}
            columns={columnsReport}
            getRowId={(row) => row.ID_FML}
            rowHeight={35}
            rowsPerPageOptions={[100]}
          />
        </Stack>
      </main>
    </div>
  );
}
export default Report;

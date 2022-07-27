import React, { useEffect } from "react";
import "./styles/DepartmentFilter.css";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Filter({ filterList, filterName }) {  
  useEffect(() => {
  }, []);

  const OnCheckboxClick = (event) => {
    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i].key === event.target.value) {
        if (filterList[i].checked) {
          filterList[i].checked = false;
        } else {
          filterList[i].checked = true;
        }
      }
    }
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {filterList.map((item) => (
        <FormControlLabel
          key={item.key}
          label={item.value}
          value={item.key}
          control={
            <Checkbox
              size="small"
              checked={item.checked}
              onClick={OnCheckboxClick}
            />
          }
        />
      ))}
    </Box>
  );

  return (
    <div>
      <div style={{ margin: "5px 0px 10px 0px" }}>{filterName}</div>
      {children}
    </div>
  );
}

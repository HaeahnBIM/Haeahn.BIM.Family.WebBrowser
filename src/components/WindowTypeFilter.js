import React, { useState, useEffect } from "react";
import "./styles/DepartmentFilter.css";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function WindowTypeFilter({ filterWindows }) {  
  useEffect(() => {
  }, []);

  const OnWindowCheckboxClick = (event) => {
    for (let i = 0; i < filterWindows.length; i++) {
      if (filterWindows[i].key === event.target.value) {
        if (filterWindows[i].checked) {
          filterWindows[i].checked = false;
        } else {
          filterWindows[i].checked = true;
        }
      }
    }
  };

  const childrenWindows = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {filterWindows.map((item) => (
        <FormControlLabel
          key={item.key}
          label={item.value}
          value={item.key}
          control={
            <Checkbox
              size="small"
              checked={item.checked}
              onClick={OnWindowCheckboxClick}
            />
          }
        />
      ))}
    </Box>
  );

  return (
    <div>
      <div style={{ margin: "5px 0px 10px 0px" }}>Windows</div>
      {childrenWindows}
    </div>
  );
}

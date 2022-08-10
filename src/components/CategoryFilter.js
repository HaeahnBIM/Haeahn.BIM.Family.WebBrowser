import React, { useState, useEffect } from "react";
import "./styles/DepartmentFilter.css";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function CategoryFilter({ filterCategory }) {  
  useEffect(() => {
  }, []);

  const OnCheckboxClick = (event) => {
    for (let i = 0; i < filterCategory.length; i++) {
      if (filterCategory[i].key === event.target.value) {
        if (filterCategory[i].checked) {
          filterCategory[i].checked = false;
        } else {
          filterCategory[i].checked = true;
        }
      }
    }
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {filterCategory.map((item) => (
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
      <div style={{ margin: "5px 0px 10px 0px" }}>카테고리</div>
      {children}
    </div>
  );
}

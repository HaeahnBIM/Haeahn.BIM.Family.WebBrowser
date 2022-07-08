import React, { useState, useEffect } from "react";
import "./styles/DepartmentFilter.css";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
//import Dummy from "../api/Dummy.json";

export default function WindowTypeFilter({ filterWindows }) {
  // 체크박스 체크하기
  const [allCheckedWindows, setAllCheckedWindows] = useState(false);
  // const [checkedWindows, setCheckedWindows] = useState([]);
  // const [checkedCountWindows, setCheckedCountWindows] = useState(0);
  // const [checked, setChecked] = React.useState([true, false]);
  
  useEffect(() => {
    //CheckAllWindows();
  }, []);

  // const CheckAllWindows = () => {
  //   filterWindows.forEach((dept) => {
  //     checkedWindows.push(dept);
  //   });
  //   setCheckedCountWindows(checkedWindows.length);
  //   //console.log("filterWindows", filterWindows, filterWindows.length)
  // };

  // const OnAllCheckClickWindows = (event) => {
  //   if (!allCheckedWindows) {
  //     for (let i = 0; i < filterWindows.length; i++) {
  //       filterWindows[i].checked = true;
  //     }
  //     //CheckAllWindows();
  //     setAllCheckedWindows(true);
  //   } else {
  //     for (let i = 0; i < filterWindows.length; i++) {
  //       filterWindows[i].checked = false;
  //     }
  //     //checkedWindows.clear();
  //     setAllCheckedWindows(false);
  //     //console.log("filterWindows", filterWindows);
  //   }
  // };

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

    // const ckArray = filterWindows.filter((item) => item.checked);
    // const ckCount = ckArray.length;

    // if (allCheckedWindows && ckCount < filterWindows.length) {
    //   setAllCheckedWindows(false);
    // }
    // if (!allCheckedWindows && ckCount === filterWindows.length) {
    //   setAllCheckedWindows(true);
    // }
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
      {/* <FormControlLabel
        label="Window"
        value="Group_Window"
        control={
          <Checkbox
            size="small"
            checked={allCheckedWindows}
            onClick={OnAllCheckClickWindows}
          />
        }
      /> */}
      {childrenWindows}
    </div>
  );
}

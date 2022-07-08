import React, { useState, useEffect } from "react";
import "./styles/DepartmentFilter.css";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
//import Dummy from "../api/Dummy.json";

export default function DoorTypeFilter({ filterDoors }) {
  // 체크박스 체크하기
  const [allCheckedDoors, setAllCheckedDoors] = useState(false);
  // const [checkedDoors, setCheckedDoors] = useState([]);
  // const [checkedCountDoors, setCheckedCountDoors] = useState(0);
  // const [checked, setChecked] = React.useState([true, false]);
  
  useEffect(() => {
    //CheckAllDoors();
  }, []);

  // const CheckAllDoors = () => {
  //   filterDoors.forEach((dept) => {
  //     checkedDoors.push(dept);
  //   });
  //   setCheckedCountDoors(checkedDoors.length);
  //   //console.log("filterDoors", filterDoors, filterDoors.length)
  // };

  // const OnAllCheckClickDoors = (event) => {
  //   if (!allCheckedDoors) {
  //     for (let i = 0; i < filterDoors.length; i++) {
  //       filterDoors[i].checked = true;
  //     }
  //     //CheckAllDoors();
  //     setAllCheckedDoors(true);
  //   } else {
  //     for (let i = 0; i < filterDoors.length; i++) {
  //       filterDoors[i].checked = false;
  //     }
  //     //checkedDoors.clear();
  //     setAllCheckedDoors(false);
  //     //console.log("checkedDoors", checkedDoors);
  //   }
  // };

  const OnDoorCheckboxClick = (event) => {
    for (let i = 0; i < filterDoors.length; i++) {
      if (filterDoors[i].key === event.target.value) {
        if (filterDoors[i].checked) {
          filterDoors[i].checked = false;
        } else {
          filterDoors[i].checked = true;
        }
      }
    }

    // const ckArray = filterDoors.filter((item) => item.checked);
    // const ckCount = ckArray.length;

    // if (allCheckedDoors && ckCount < filterDoors.length) {
    //   setAllCheckedDoors(false);
    // }
    // if (!allCheckedDoors && ckCount === filterDoors.length) {
    //   setAllCheckedDoors(true);
    // }
  };

  const childrenDoors = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {filterDoors.map((item) => (
        <FormControlLabel
          key={item.key}
          label={item.value}
          value={item.key}
          control={
            <Checkbox
              size="small"
              checked={item.checked}
              onClick={OnDoorCheckboxClick}
            />
          }
        />
      ))}
    </Box>
  );

  return (
    <div>
      <div style={{ margin: "5px 0px 10px 0px" }}>Doors</div>
      {childrenDoors}
    </div>
  );
}

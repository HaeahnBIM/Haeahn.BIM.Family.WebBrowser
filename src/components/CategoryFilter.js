import React, { useState, useEffect } from "react";
import "./styles/DepartmentFilter.css";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
//import Dummy from "../api/Dummy.json";

export default function CategoryFilter({ filterWindows, filterDoors }) {
  // 체크박스 체크하기
  const [allCheckedWindows, setAllCheckedWindows] = useState(true);
  const [allCheckedDoors, setAllCheckedDoors] = useState(true);
  //const [windows, setWindows] = useState(Dummy["창유형"]);
  //const [doors, setDoors] = useState(Dummy["문유형"]);
  const [checkedWindows, setCheckedWindows] = useState([]);
  const [checkedDoors, setCheckedDoors] = useState([]);
  const [checkedCountWindows, setCheckedCountWindows] = useState(0);
  const [checkedCountDoors, setCheckedCountDoors] = useState(0);
  const [checked, setChecked] = React.useState([true, false]);
  
  useEffect(() => {
    CheckAllWindows();
    CheckAllDoors();
  }, []);

  const CheckAllWindows = () => {
    filterWindows.forEach((dept) => {
      checkedWindows.push(dept);
    });
    setCheckedCountWindows(checkedWindows.length);
    //console.log("filterWindows", filterWindows, filterWindows.length)
  };

  const CheckAllDoors = () => {
    filterDoors.forEach((dept) => {
      checkedDoors.push(dept);
    });
    setCheckedCountDoors(checkedDoors.length);
    //console.log("filterDoors", filterDoors, filterDoors.length)
  };

  const OnAllCheckClickWindows = (event) => {
    if (!allCheckedWindows) {
      for (let i = 0; i < filterWindows.length; i++) {
        filterWindows[i].checked = true;
      }
      //CheckAllWindows();
      setAllCheckedWindows(true);
    } else {
      for (let i = 0; i < filterWindows.length; i++) {
        filterWindows[i].checked = false;
      }
      //checkedWindows.clear();
      setAllCheckedWindows(false);
      //console.log("filterWindows", filterWindows);
    }
  };

  const OnAllCheckClickDoors = (event) => {
    if (!allCheckedDoors) {
      for (let i = 0; i < filterDoors.length; i++) {
        filterDoors[i].checked = true;
      }
      //CheckAllDoors();
      setAllCheckedDoors(true);
    } else {
      for (let i = 0; i < filterDoors.length; i++) {
        filterDoors[i].checked = false;
      }
      //checkedDoors.clear();
      setAllCheckedDoors(false);
      //console.log("checkedDoors", checkedDoors);
    }
  };

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

    const ckArray = filterWindows.filter((item) => item.checked);
    const ckCount = ckArray.length;

    if (allCheckedWindows && ckCount < filterWindows.length) {
      setAllCheckedWindows(false);
    }
    if (!allCheckedWindows && ckCount === filterWindows.length) {
      setAllCheckedWindows(true);
    }
    //console.log(isFound(checkedWindows, event.target.value));

    // if (checkedWindows.includes(event.target.value)) {
    //   console.log(checkedWindows);
    // } else {
    //   console.log(checkedWindows);
    // }

    // if (checkedWindows.has(event.target.value)) {
    //   checkedWindows.delete(event.target.value);
    // } else {
    //   checkedWindows.add(event.target.value);
    // }
    // setCheckedCountWindows(checkedWindows.size);

    // if (allCheckedWindows && checkedWindows.size < filterWindows.length) {
    //   setAllCheckedWindows(false);
    // }
    // if (!allCheckedWindows && checkedWindows.size === filterWindows.length) {
    //   setAllCheckedWindows(true);
    // }
  };

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

    const ckArray = filterDoors.filter((item) => item.checked);
    const ckCount = ckArray.length;

    if (allCheckedDoors && ckCount < filterDoors.length) {
      setAllCheckedDoors(false);
    }
    if (!allCheckedDoors && ckCount === filterDoors.length) {
      setAllCheckedDoors(true);
    }

    //console.log(event.target.value)
    // if (checkedDoors.has(event.target.value)) {
    //   checkedDoors.delete(event.target.value);
    // } else {
    //   checkedDoors.add(event.target.value);
    // }
    // setCheckedCountDoors(checkedDoors.size);
    // if (allCheckedDoors && checkedDoors.size < filterDoors.length) {
    //   setAllCheckedDoors(false);
    // }
    // if (!allCheckedDoors && checkedDoors.size === filterDoors.length) {
    //   setAllCheckedDoors(true);
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
      <div style={{ margin: "5px 0px 10px 0px" }}>카테고리</div>
      <FormControlLabel
        label="Window"
        value="Group_Window"
        control={
          <Checkbox
            size="small"
            checked={allCheckedWindows}
            onClick={OnAllCheckClickWindows}
          />
        }
      />
      {childrenWindows}
      <FormControlLabel
        label="Door"
        value="Group_Door"
        control={
          <Checkbox
            size="small"
            checked={allCheckedDoors}
            onClick={OnAllCheckClickDoors}
          />
        }
      />
      {childrenDoors}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Dummy from "./api/Dummy.json";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Filter from "./components/Filter";
import TitlebarImageList from "./components/TitlebarImageList";
import FavList from "./components/FavList";
import InputBase from "@mui/material/InputBase";
import Input from "@mui/material/Input";
import fileDownload from "js-file-download";
import axios from "axios";
import { Divider, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Moment from "moment";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Snackbar from "@mui/material/Snackbar";
import Data from "./api/Data";

const baseuri = "https://ueapi.haeahn.com/api/RvtCollection/";

const columnsFamily = [
  { field: "SEQ", headerName: "ID", width: 60 },
  { field: "NM_CATG", headerName: "NM_CATG", width: 100 },
  { field: "NM_FML", headerName: "NM_FML", width: 300 },
  { field: "RvtVersion", headerName: "버전", width: 100 },
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
  { field: "IsStdd", headerName: "표준", width: 80 },
];

const columnsSymbol = [
  { field: "SEQ", headerName: "ID", width: 60 },
  { field: "ID_REL_FML", headerName: "ID_REL_FML", width: 120, hide: true },
  { field: "NM_SYM", headerName: "NM_SYM", width: 200 },
  { field: "IMG_SYM", headerName: "IMG_SYM", width: 300, hide: true },
];

const columnsSameFamily = [
  { field: "SEQ", headerName: "ID", width: 80 },
  { field: "NM_CATG", headerName: "NM_CATG", width: 120 },
  { field: "NM_FML", headerName: "NM_FML", width: 300 },
  { field: "VOL", headerName: "VOL", width: 300 },
  { field: "IMG_SYM", headerName: "IMG_SYM", width: 300, hide: true },
];

const columnsParameter = [
  { field: "ID_REL", headerName: "SEQ", width: 120 },
  { field: "BuiltInParameter", headerName: "BuiltInParameter", width: 150 },
  { field: "Name", headerName: "Name", width: 150 },
  { field: "ParameterGroup", headerName: "ParameterGroup", width: 150 },
  { field: "ParameterType", headerName: "ParameterType", width: 150 },
];

const columnsRelation = [
  { field: "ID_REL", headerName: "SEQ", width: 120 },
  { field: "TYP_REL", headerName: "TYP_REL", width: 150 },
  { field: "VAL_REL", headerName: "VAL_REL", width: 150 },
  { field: "DTL_REL", headerName: "DTL_REL", width: 150 },
  { field: "IS_USE", headerName: "IS_USE", width: 150 },
];

const columnsProject = [
  { field: "CD_PROJ", headerName: "CD_PROJ", width: 150 },
  { field: "NM_PROJ", headerName: "NM_PROJ", width: 150 },
];
const _rowHeight = 30;

function App() {
  const location = useLocation();

  const [startDate, setStartDate] = useState(
    Moment().subtract(1, "month").startOf("day").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    Moment().subtract(1, "day").startOf("day").format("YYYY-MM-DD")
  );
  const [loginId, setLoginId] = useState(
    location.state.userObj.resultMail.substring(
      0,
      location.state.userObj.resultMail.indexOf("@")
    )
  );
  const [employeeId, setEmployeeId] = useState(
    location.state.userObj.resultMessage
  );
  const [employeeName, setEmployeeName] = useState(
    location.state.userObj.resultUserName
  );
  const [uuid, setUuid] = useState(location.state.uuid);

  const [stddFilter, setStddFilter] = useState(Dummy["구분"]);
  const [versionFilter, setVersionFilter] = useState(Dummy["버전"]);
  const [filterCategory, setFilterCategory] = useState(Dummy["카테고리"]);
  const [windows, setWindows] = useState(Dummy["창유형"]);
  const [doors, setDoors] = useState(Dummy["문유형"]);
  const [dataFamily, setFamily] = useState([]);
  const [familyFiltered, setFamilyFiltered] = useState([]);
  const [dataSameFamily, setSameFamily] = useState([]);
  const [project, setProject] = useState([]);
  const [dataSymbol, setSymbol] = useState([]);
  const [dataSymbolImage, setSymbolImage] = useState("");
  const [dataSymbolImage2, setSymbolImage2] = useState("");
  const [dataParameter, setParameter] = useState([]);
  const [dataRelation, setRelation] = useState([]);
  const [headerUserEnter, setHeaderUserEnter] = useState([]);
  const [dataUsgLoad, setDataUsgLoad] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectionSameModel, setSelectionSameModel] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [searchTotal, setSearchTotal] = useState("");
  const [searchElev, setSearchElev] = useState("");
  const [searchHorz, setSearchHorz] = useState("");
  const [searchVert, setSearchVert] = useState("");
  const [searchDoubleAll, setSearchDoubleAll] = useState(true);
  const [searchDouble, setSearchDouble] = useState(false);
  const [finishOptions, setFinishOptions] = useState([]);
  const [showWindow, setShowWindow] = useState(true);
  const [showDoor, setShowDoor] = useState(true);
  const [showImageList, setShowImageList] = useState(true);
  const [state, setState] = useState({ right: false });
  const [drawerChange, setDrawerChange] = useState(false);
  const [newFavoriteName, setNewFavoriteName] = useState("");
  const [newFavoriteDesc, setNewFavoriteDesc] = useState("");
  const [msgSnackbar, setMsgSnackbar] = useState("");
  const [stateSnackbar, setStateSnackbar] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = stateSnackbar;

  const handleCloseSnackbar = () => setSnackbar(null);

  useEffect(() => {
    //console.log(loginId, employeeId, employeeName, uuid);
    fetchTableFamily();
    //setFinishOptions(windows.concat(doors));
    //setFinishOptions([windows, doors]);
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

  const fetchTableSymbol = async (id) => {
    var url = new URL(baseuri + "symbols");
    var params = { nmTable: id };

    await fetch(url)
      .then((data) => data.json())
      .then((data) => setFamily(data));
  };

  const handlePreviewImageAndSameData = async (e) => {
    //console.log(e.row);
    setSymbolImage(e.row.IMG_SYM);
    handleGetData(e.row);
    handleGetSameVolmne(e.row);
    handleProject(e.row);
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
      // let symbols = [];
      // for (let i = 0; i < data.length; i++) {
      //   const d = data[i];

      //   symbols.push({
      //     SEQ: d.SEQ,
      //     ID_REL_FML: d.ID_REL_FML,
      //     NM_SYM: d.NM_SYM,
      //     IMG_SYM: d.IMG_SYM,
      //   });
      // }
      setSymbol(data);
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
      setParameter(data);
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
      setRelation(data);
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

  const handleProject = async (e) => {
    const postData = {
      ID_REL: e.SEQ
    };

    try {
      const res = await fetch(baseuri + "project", {
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
      setProject(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePreviewImage = async (e) => {
    setSymbolImage2(e.row.IMG_SYM);
  };

  const handleValueChange = async (e) => {
    //setSearchKeyword(e.target.value);
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

  const handleStdd = async (e) => {
    
    Data.SetRouteLog(employeeId, "Main", "Stdd", "FUNCTION");
    const postData = {
      SEQ: selectionModel[0],
    };

    //console.log(postData);

    try {
      const res = await fetch(baseuri + "stdd", {
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
      fetchTableFamily();
      handleShowSnackbar(data[0].IS_STDD ? "표준 패밀리로 변경하였습니다." : "일반 패밀리로 변경하였습니다.")
    } catch (err) {
      console.log(err);
    }

  };

  const handleDownload = async () => {
    Data.SetRouteLog(employeeId, "Main", "download", "FUNCTION");
    axios({
      url: baseuri + "filename",
      params: {
        id: selectionModel[0],
      },
    }).then((response0) => {
      axios({
        url: baseuri + "download",
        responseType: "blob",
        params: {
          id: selectionModel[0],
          userid: employeeId,
          platform: "WEB",
        },
      }).then((response1) => {
        fileDownload(response1.data, response0.data);
      });
    });
  };

  const handleChangeTotal = (e) => {
    if (Number(e.target.value) < 0) return;
    setSearchTotal(e.target.value);
  };

  const handleChangeElev = (e) => {
    if (Number(e.target.value) < 0) return;
    setSearchElev(e.target.value);
  };

  const handleChangeHorz = (e) => {
    if (Number(e.target.value) < 0) return;
    setSearchHorz(e.target.value);
  };

  const handleChangeVert = (e) => {
    if (Number(e.target.value) < 0) return;
    setSearchVert(e.target.value);
  };

  const handleChangeDouble = (e) => {
    setSearchDouble(e.target.checked);
  };

  const handleChangeDoubleAll = (e) => {
    setSearchDoubleAll(e.target.checked);
  };

  const handleClickSearch = () => {
    console.log(windows);
    //handleSearch();
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleClickUser = (event) => {
    Data.SetRouteLog(employeeId, "Main", "User", "ROUTE");
    window.open(
      `./User?uuid=${uuid}`,
      "_blank",
      "location=yes,height=850,width=1140,left=0,location=0,scrollbars=yes,status=yes"
    );
  };

  const handleSearch = async (e) => {
    const postData = {
      TOTAL: searchTotal,
      ELEV: searchElev,
      HORZ: searchHorz,
      VERT: searchVert,
      DOUBLEALL: searchDoubleAll,
      DOUBLE: searchDouble,
    };

    console.log(JSON.stringify(postData));

    try {
      const res = await fetch(baseuri + "search2", {
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
      console.log(data);

      // let symbols = [];
      // for (let i = 0; i < data.length; i++) {
      //   const d = data[i];

      //   symbols.push({
      //     SEQ: d.SEQ,
      //     ID_REL_FML: d.ID_REL_FML,
      //     NM_SYM: d.NM_SYM,
      //     IMG_SYM: d.IMG_SYM,
      //   });
      // }
      setFamily(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onRemove = () => {
    if (selectionSameModel.length === 0) return;
    if (window.confirm("삭제합니까?")) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    let families = [];
    for (let i = 0; i < selectionSameModel.length; i++) {
      const family = selectionSameModel[i];
      families.push("" + family);
    }

    try {
      const res = await fetch(baseuri + "deleteFamily", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(families),
      });
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      const data = await res.json();
      fetchTableFamily();
      setSameFamily([]);
      setSymbol([]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetReport = async (e) => {
    Data.SetRouteLog(employeeId, "Main", "report", "FUNCTION");
    const postData = {
      ID: selectionModel[0],
      USERID: employeeId,
      TYP: "CATEGORY",
    };

    try {
      const res = await fetch(baseuri + "addReport", {
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (e) => {
    Data.SetRouteLog(employeeId, "Main", "like", "FUNCTION");
    const postData = {
      ID: selectionModel[0],
      USERID: employeeId,
    };

    try {
      const res = await fetch(baseuri + "like", {
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddFavorite = async (e) => {
    window.open(
      "./FavList",
      "_blank",
      "location=yes,height=500,width=700,left=0,location=0,scrollbars=yes,status=yes"
    );

    // const postData = {
    //   ID: selectionModel[0],
    //   USERID: employeeId,
    // };

    // console.log(postData);

    // try {
    //   const res = await fetch(baseuri + "addFavorite", {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(postData),
    //   });
    //   if (!res.ok) {
    //     const message = `An error has occured: ${res.status} - ${res.statusText}`;
    //     throw new Error(message);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleDeleteFavorite = async (e) => {
    Data.SetRouteLog(employeeId, "Main", "DelFav", "FUNCTION");
    
    const postData = {
      ID: selectionModel[0],
      USERID: employeeId,
    };

    console.log(postData);

    try {
      const res = await fetch(baseuri + "deleteFavorite", {
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCart = async (e) => {
    const postData = {
      ID: selectionModel[0],
      USERID: employeeId,
    };

    console.log(postData);

    try {
      const res = await fetch(baseuri + "addCart", {
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCart = async (e) => {
    const postData = {
      ID: selectionModel[0],
      USERID: employeeId,
    };

    console.log(postData);

    try {
      const res = await fetch(baseuri + "deleteCart", {
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickReport = (event) => {    
    Data.SetRouteLog(employeeId, "Main", "Report", "ROUTE");
    window.open(
      "./Report",
      "_blank",
      "location=yes,height=850,width=1140,left=0,location=0,scrollbars=yes,status=yes"
    );
  };

  const handleClickMerge = (event) => {
    Data.SetRouteLog(employeeId, "Main", "Merge", "ROUTE");
    window.open(
      "./Merge",
      "_blank",
      "location=yes,height=900,width=1400,left=0,location=0,scrollbars=yes,status=yes"
    );
  };

  const handleClickCentral = (event) => {
    Data.SetRouteLog(employeeId, "Main", "Central", "ROUTE");
    window.open(
      `./Central?uuid=${uuid}`,
      "_blank",
      "location=yes,height=850,width=1140,left=0,location=0,scrollbars=yes,status=yes"
    );
  };

  const filteringCornerFamily = (filters, filteredFamilies) => {
    let filtered = [];

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      var f = filter.key;
      switch (f) {
        case "window_normal":
          filtered = filtered.concat(
            filteredFamilies.filter((data) => data.IsCorner === false)
          );
          break;
        case "window_corner":
          filtered = filtered.concat(
            filteredFamilies.filter((data) => data.IsCorner)
          );
          break;
        default:
          return "";
      }
    }

    return filtered;
  };

  const handleChangeStdd = (e) => {
    setFamilyFiltered([...dataFamily]);

    let isFilterTrue = false;
    for (let i = 0; i < stddFilter.length; i++) {
      if (stddFilter[i].checked) {
        isFilterTrue = true;
        break;
      }
    }

    if (isFilterTrue === false) {
      return;
    }

    let filters_True = [];
    for (let i = 0; i < stddFilter.length; i++) {
      if (stddFilter[i].checked) {
        filters_True.push(stddFilter[i]);
      }
    }

    let filtered = filteringStddFamily(filters_True, dataFamily);

    setFamilyFiltered(filtered);
  };

  const handleChangeVersion = (e) => {
    setFamilyFiltered([...dataFamily]);

    let isFilterTrue = false;
    for (let i = 0; i < versionFilter.length; i++) {
      if (versionFilter[i].checked) {
        isFilterTrue = true;
        break;
      }
    }

    if (isFilterTrue === false) {
      return;
    }

    let filters_True = [];
    for (let i = 0; i < versionFilter.length; i++) {
      if (versionFilter[i].checked) {
        filters_True.push(versionFilter[i]);
      }
    }

    let filtered = filteringVersionFamily(filters_True, dataFamily);

    setFamilyFiltered(filtered);
  };

  const handleChangeCategory = (e) => {
    setFamilyFiltered([...dataFamily]);

    let isFilterTrue = false;
    for (let i = 0; i < filterCategory.length; i++) {
      if (filterCategory[i].checked) {
        isFilterTrue = true;
        break;
      }
    }

    if (isFilterTrue === false) {
      return;
    }

    let filters_True = [];
    for (let i = 0; i < filterCategory.length; i++) {
      if (filterCategory[i].checked) {
        filters_True.push(filterCategory[i]);
      }
    }

    let filtered = filteringCategoryFamily(filters_True, dataFamily);

    setFamilyFiltered(filtered);
  };

  const handleChangeWindowType = (e) => {
    setFamilyFiltered([...dataFamily]);

    let curFilter = {};
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key === e.target.value) {
        curFilter = windows[i];
      }
    }
    if (curFilter === {}) {
      for (let i = 0; i < doors.length; i++) {
        if (doors[i].key === e.target.value) {
          curFilter = doors[i];
        }
      }
    }

    if (e.target.checked) {
      setFinishOptions((finishOptions) => [...finishOptions, curFilter]);
    } else {
      let filter = [];
      for (let i = 0; i < finishOptions.length; i++) {
        if (finishOptions[i].key !== e.target.value) {
          filter.push(finishOptions[i]);
        }
      }
      setFinishOptions(filter);
    }

    let isFilterTrue = false;
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].checked) {
        isFilterTrue = true;
        break;
      }
    }
    if (isFilterTrue === false) {
      for (let i = 0; i < doors.length; i++) {
        if (doors[i].checked) {
          isFilterTrue = true;
          break;
        }
      }
    }

    if (isFilterTrue === false) {
      setFamilyFiltered(dataFamily);
      return;
    }

    let window_filters_True = [];
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].checked) {
        window_filters_True.push(windows[i]);
      }
    }

    setFamilyFiltered(dataFamily);

    let filtered = [];

    const filterIsDouble = window_filters_True.filter(
      (data) => data.group === "isdouble"
    );
    const filterIsCorner = window_filters_True.filter(
      (data) => data.group === "iscorner"
    );

    if (filterIsDouble.length > 0) {
      filtered = filteringDoubleFamily(filterIsDouble, dataFamily);
    }

    if (filterIsCorner.length > 0) {
      filtered = filteringCornerFamily(
        filterIsCorner,
        filtered.length > 0 ? filtered : dataFamily
      );
    }

    setFamilyFiltered(filtered);
  };

  const handleChangeDoorType = () => {
    //setFamilyFiltered([...dataFamily]);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (selectionModel[0] === undefined) {
      return;
    }

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    Data.SetRouteLog(employeeId, "Main", "Fav", "FUNCTION");

    setState({ ...state, [anchor]: open });
    setDrawerChange(false);
  };

  const filteringStddFamily = (filters, filteredFamilies) => {
    let filtered = [];

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const f = filter.key;

      let val = true;
      if (f === "stdd") {
        val = true;
      } else {
        val = false;
      }

      filtered = filtered.concat(
        filteredFamilies.filter((data) => data.IsStdd === val)
      );
    }
    //console.log(filtered)

    return filtered;
  };

  const filteringVersionFamily = (filters, filteredFamilies) => {
    let filtered = [];

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      const f = filter.value;

      filtered = filtered.concat(
        filteredFamilies.filter((data) => {
          if (data.RvtVersion !== null) {
            if (data.RvtVersion.includes(f)) {
              return data;
            }
          }
        })
      );
    }
    //console.log(filtered)

    return filtered;
  };

  const filteringCategoryFamily = (filters, filteredFamilies) => {
    let filtered = [];

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      var f = filter.key;
      switch (f) {
        case "window":
          filtered = filtered.concat(
            filteredFamilies.filter((data) => data.NM_CATG === "Windows")
          );
          break;
        case "door":
          filtered = filtered.concat(
            filteredFamilies.filter((data) => data.NM_CATG === "Doors")
          );
          break;
        default:
          return "";
      }
    }

    return filtered;
  };

  const filteringDoubleFamily = (filters, filteredFamilies) => {
    let filtered = [];

    for (let i = 0; i < filters.length; i++) {
      const filter = filters[i];
      var f = filter.key;
      switch (f) {
        case "window_single":
          filtered = filtered.concat(
            filteredFamilies.filter((data) => data.IsDouble === false)
          );
          break;
        case "window_double":
          filtered = filtered.concat(
            filteredFamilies.filter((data) => data.IsDouble)
          );
          break;
        default:
          return "";
      }
    }

    return filtered;
  };

  const handleGetSelectedModel = () => {
    //console.log(familyFiltered.length)
    //console.log(selectionModel[0])

    let data = {};
    for (let index = 0; index < familyFiltered.length; index++) {
      const item = familyFiltered[index];
      //console.log(item.SEQ)
      if (item.SEQ === selectionModel[0]) {
        data = item;
        break;
      }
    }

    return data;
  };

  function list(anchor) {
    let data = {};
    for (let index = 0; index < familyFiltered.length; index++) {
      const item = familyFiltered[index];
      if (item.SEQ === selectionModel[0]) {
        data = item;
        break;
      }
    }

    return (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
        role="presentation"
        //onClick={toggleDrawer(anchor, false)}
        //onKeyDown={toggleDrawer(anchor, false)}
      >
        <FavList
          selectedFamily={data}
          employeeId={employeeId}
          handleAddedFav={handleAddedFav}
        />
      </Box>
    );
  }

  function SelectedFamily() {
    let data = {};
    for (let index = 0; index < familyFiltered.length; index++) {
      const item = familyFiltered[index];
      if (item.SEQ === selectionModel[0]) {
        data = item;
        break;
      }
    }

    return (
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"row"} spacing={2}>
          <img
            src={`data:image/png;base64,${data.IMG_SYM}`}
            width="100"
            height="100"
            alt=""
          />
          <div>
            <div>{data.NM_CATG}</div>
            <div>{data.NM_FML}</div>
          </div>
        </Stack>
      </Stack>
    );
  }

  const handleClickConfirmAdd = async () => {
    if (newFavoriteName === "") {
      return;
    }

    const postData = {
      NM_LIST: newFavoriteDesc,
      DSCRP: newFavoriteName,
      USERID: employeeId,
    };

    try {
      const res = await fetch(baseuri + "createFavoriteList", {
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
      const data = await res;
      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };
      //setFavorite(data);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setDrawerChange(false);

    setNewFavoriteName("");
    setNewFavoriteDesc("");
  };

  const handleAddedFav = (name) => {
    setState({ ...state, ["right"]: false });
    setDrawerChange(false);

    handleShowSnackbar("'" + name + "' 즐겨찾기 추가 완료")
  };

  const handleShowSnackbar = (msg)=> {
    setMsgSnackbar(msg);

    setStateSnackbar({
      open: true,
      ...{
        vertical: "bottom",
        horizontal: "right",
      },
    });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setStateSnackbar({ ...stateSnackbar, open: false });
  };

  return (
    <div style={{ margin: "10px" }}>
      <main>
        <Stack
          direction={"row"}
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Stack spacing={1} width="200px">
            <div onChange={handleChangeStdd}>
              <Filter filterList={stddFilter} filterName="구분"></Filter>
            </div>
            <div onChange={handleChangeVersion}>
              <Filter filterList={versionFilter} filterName="버전"></Filter>
            </div>
            <div onChange={handleChangeCategory}>
              <Filter
                filterList={filterCategory}
                filterName="카테고리"
              ></Filter>
            </div>
            {showWindow && (
              <div onChange={handleChangeWindowType}>
                <Filter filterList={windows} filterName="Windows"></Filter>
              </div>
            )}
            {showDoor && (
              <div onChange={handleChangeDoorType}>
                <Filter filterList={doors} filterName="Doors"></Filter>
              </div>
            )}
          </Stack>
          <Stack
            width="100%"
            height="1050px"
            direction={"column"}
            divider={<Divider orientation="horizontal" flexItem />}
            spacing={2}
          >
            <Stack
              direction={"row"}
              spacing={2}
              display="flex"
              justifyContent="flex-end"
            >
              <button
                style={{ height: "30px", margin: "5px", width: "80px" }}
                onClick={handleClickSearch}
              >
                검색
              </button>
              <button
                style={{ height: "30px", margin: "5px", width: "80px" }}
                onClick={handleClickUser}
              >
                내 정보
              </button>
              <button
                style={{ height: "30px", margin: "5px", width: "80px" }}
                onClick={handleClickReport}
              >
                신고목록
              </button>
              <button
                style={{ height: "30px", margin: "5px", width: "80px" }}
                onClick={handleClickMerge}
              >
                중복관리
              </button>
              <button
                style={{ height: "30px", margin: "5px", width: "80px" }}
                onClick={handleClickCentral}
              >
                CENTRAL
              </button>
            </Stack>

            <Stack
              height="80%"
              style={{ margin: "10px" }}
              direction={"row"}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Stack width="100%" height="100%" direction={"column"} spacing={2}>
                <Stack direction={"row"} spacing={2} margin="5px">
                  <span style={{ width: "100%" }}>Family</span>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <FormControlLabel
                      key="Image"
                      label="Image"
                      value="Image"
                      control={
                        <Checkbox
                          size="small"
                          checked={showImageList}
                          onClick={(event) => {
                            setShowImageList(event.target.checked);
                          }}
                        />
                      }
                    />
                    <button
                      style={{ height: "25px", width: "100px" }}
                      onClick={handleStdd}
                    >
                      change stdd
                    </button>
                    <button
                      style={{ height: "25px", width: "80px" }}
                      onClick={handleDownload}
                    >
                      download
                    </button>
                    <button
                      style={{ height: "25px", width: "80px" }}
                      onClick={handleSetReport}
                    >
                      report
                    </button>
                    <button
                      style={{ height: "25px", width: "80px" }}
                      onClick={handleLike}
                    >
                      like
                    </button>
                    <button
                      style={{ height: "25px", width: "100px" }}
                      onClick={toggleDrawer("right", true)}
                    >
                      add favorite
                    </button>
                    <button
                      style={{ height: "25px", width: "100px" }}
                      onClick={handleDeleteFavorite}
                    >
                      delete favorite
                    </button>
                  </Stack>
                </Stack>

                {showImageList ? (
                  <TitlebarImageList itemData={familyFiltered} />
                ) : (
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
                )}

                  <Stack
                    style={{ height: "300px", width:"100%" }}
                    margin="5px"
                    direction={"row"}
                    spacing={2}
                    divider={<Divider orientation="vertical" flexItem />}
                  >
                    <Stack direction={"column"} spacing={2} width="100%">
                      <span >Relation</span>
                      <DataGrid
                        rows={dataRelation}
                        columns={columnsRelation}
                        getRowId={(row) => row.id}
                        rowHeight={_rowHeight}
                        rowsPerPageOptions={[100]}
                      />
                    </Stack>
                    <Stack direction={"column"} spacing={2} width="100%">
                      <span >Parameter</span>
                      <DataGrid
                        rows={dataParameter}
                        columns={columnsParameter}
                        getRowId={(row) => row.id}
                        rowHeight={_rowHeight}
                        rowsPerPageOptions={[100]}
                      />
                    </Stack>
                  </Stack>
              </Stack>

              <Stack direction={"column"} spacing={2} width="350px">
                <Stack direction={"row"} spacing={2} margin="10px 0px 20px 0px">
                  <img
                    src={`data:image/png;base64,${dataSymbolImage}`}
                    width="200"
                    height="200"
                    alt=""
                  />
                </Stack>
                <span style={{ margin: "10px 5px 5px 5px" }}>
                  Type
                </span>
                <DataGrid
                  getRowId={(row) => row.SEQ}
                  rows={dataSymbol}
                  columns={columnsSymbol}
                  rowHeight={_rowHeight}
                  pageSize={100}
                />
                <span style={{ margin: "10px 5px 5px 5px" }}>
                  Project
                </span>
                <DataGrid
                  getRowId={(row) => row.ID}
                  rows={project}
                  columns={columnsProject}
                  rowHeight={_rowHeight}
                  pageSize={100}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </main>
      <div>
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent="space-between"
              alignItems="flex-start"
              style={{ margin: "15px" }}
            >
              {drawerChange ? (
                <ArrowBackIcon
                  onClick={() => {
                    setDrawerChange(false);
                  }}
                />
              ) : (
                <span style={{ width: "25px" }}> </span>
              )}

              {drawerChange ? (
                <div>
                  <b>Create list</b>
                </div>
              ) : (
                <div>
                  <b>Save item in list</b>
                </div>
              )}

              <CloseIcon onClick={toggleDrawer("right", false)} />
            </Stack>
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
              style={{ height: "100%", margin: "15px" }}
            >
              {drawerChange ? (
                <Box
                  sx={{ width: 350 }}
                  //role="presentation"
                  // onClick={toggleDrawer("right", false)}
                  // onKeyDown={toggleDrawer("right", false)}
                >
                  <TextField
                    id="standard-basic"
                    label="favorite name"
                    variant="standard"
                    style={{ width: "100%" }}
                    value={newFavoriteName}
                    onChange={(e) => setNewFavoriteName(e.target.value)}
                  />
                  <TextField
                    id="standard-basic"
                    label="favorite description"
                    variant="standard"
                    style={{ width: "100%" }}
                    value={newFavoriteDesc}
                    onChange={(e) => setNewFavoriteDesc(e.target.value)}
                  />
                </Box>
              ) : (
                <Stack direction="column" spacing={1}>
                  <SelectedFamily />
                  <Divider />
                  {list("right")}
                </Stack>
              )}

              <Stack
                direction="column"
                spacing={1}
                justifyContent="space-around"
                style={{ height: "60px", width: "100%" }}
              >
                <Divider />

                {drawerChange ? (
                  <button
                    style={{ height: "40px" }}
                    onClick={() => {
                      handleClickConfirmAdd();
                    }}
                  >
                    Create list confirmation
                  </button>
                ) : (
                  <button
                    style={{ height: "40px" }}
                    onClick={() => {
                      setDrawerChange(true);
                    }}
                  >
                    Create list +
                  </button>
                )}
              </Stack>
            </Stack>
          </Drawer>
        </React.Fragment>
      </div>
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          autoHideDuration={3000}
          message={msgSnackbar}
          key={vertical + horizontal}
        />
      </div>
    </div>
  );
}

export default App;

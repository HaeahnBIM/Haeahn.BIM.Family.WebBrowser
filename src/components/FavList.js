import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Snackbar from '@mui/material/Snackbar';

const baseuri = "https://ueapi.haeahn.com/api/RvtCollection/";

const FavList = (props) => {
  const [selectedFamily, setSelectedFamily] = useState(props.selectedFamily);
  const [employeeId, setEmployeeId] = useState(props.employeeId);
  const [favorite, setFavorite] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [symbolImage, setSymbolImage] = useState("");

  useEffect(() => {
    fetchDataFavorite();
  });

  const fetchDataFavorite = async (e) => {
    const postData = {
      USERID: employeeId,
    };

    try {
      const res = await fetch(baseuri + "favorite", {
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
      setFavorite(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddFavorite = async (selectedFamily, favId) => {
    const postData = {
      ID_FML: selectedFamily.SEQ,
      ID_LIST: favId,
      USERID: employeeId,
    };

    //console.log("postData", postData)

    try {
      const res = await fetch(baseuri + "addFavorite", {
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleListItemClick = (event, value) => {
    //console.log("const handleListItemClick = (event, value)", value.SEQ, selectedFamily);
    //setSelectedIndex(value.SEQ);
    handleAddFavorite(selectedFamily, value.SEQ);

    console.log('const handleListItemClick = (event, value)', selectedFamily)

    props.handleAddedFav(selectedFamily.NM_FML);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {favorite.map((value) => {
        const labelId = `checkbox-list-label-${value.SEQ}`;

        return (
          <ListItem key={value.SEQ} alignItems="flex-start">
            {/* <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar> */}
            <ListItemButton
              role={undefined}
              onClick={(event) => handleListItemClick(event, value)}
              dense
            >
              <img
                style={{ margin: "0px 20px 0px 0px" }}
                src={`data:image/png;base64,${value.IMG_SYM}`}
                width="70"
                height="70"
                alt=""
              />
              <ListItemText
                id={labelId}
                primary={`${value.NM_LIST} (Count: ${value.CNT_ITEM})`}
                secondary={value.DSCRP}
                // {
                //   <div
                //     sx={{ display: 'inline' }}
                //     component="div"
                //     variant="body2"
                //     color="text.primary"
                //   >
                //     Family: {value.CNT_ITEM}
                //   {value.DSCRP}
                //   </div>
                // }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default FavList;

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function TitlebarImageList({itemData}) {
  return (
    <ImageList sx={{  height: "70%" }} cols={5} gap={10}>
      {itemData.map((item) => (
        <ImageListItem key={item.SEQ} sx={{ width: 200 }} >
          <img
            src={`data:image/png;base64,${item.IMG_SYM}`}
            alt={item.NM_FML}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.NM_FML}
            subtitle={<span>{item.NM_CATG}</span>}
            position="below"
            actionIcon={
              <IconButton
                sx={{ color: 'black' }}
                aria-label={`star ${item.NM_CATG}`}
              >
                <StarBorderIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const orderType = ['upgrade',];

const baseuri = "https://ueapi.haeahn.com/api/FamilyAutomation/";

export default function SimpleDialog(props) {
  const { onClose, selectedValue, open, selectedFav, userId } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (orderType) => {
    postOrder(orderType);
    onClose();
  };

  const postOrder = async (orderType) => {
    const contentData = {
        version: "2023",
      };

    const postData = {
      SEQ: selectedFav,
      ORDER_TYPE: orderType,
      ID_USER_ORDR: userId,
      CONTENT: JSON.stringify(contentData),
    };

    console.log(postData);

    try {
      const response = await fetch(baseuri + "setOrder", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      //const json = await response.json();
      //console.log(json);
      //setCart(json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account: {selectedFav}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {orderType.map((order) => (
          <ListItem button onClick={() => handleListItemClick(order)} key={order}>
            <ListItemText primary={order} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
  selectedFav: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
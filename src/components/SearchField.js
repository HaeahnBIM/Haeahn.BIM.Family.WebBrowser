import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function SearchField() {
    return(
        <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        defaultValue="Small"
        variant="filled"
        size="small"
      />
    );
}
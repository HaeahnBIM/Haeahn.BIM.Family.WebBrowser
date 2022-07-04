import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function WorkTypeFilter() {
  return (
    <FormControl component="fieldset">
      {/* <FormLabel component="legend">Label placement</FormLabel> */}
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="건축모델링"
          labelPlacement="end"
        />
        <FormControlLabel
          value="start"
          control={<Checkbox />}
          label="패밀리 작성"
          labelPlacement="end"
        />
        <FormControlLabel
          value="bottom"
          control={<Checkbox />}
          label="스케줄 생성/관리"
          labelPlacement="end"
        />
      </FormGroup>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="구조모델링"
          labelPlacement="end"
        />
        <FormControlLabel
          value="start"
          control={<Checkbox />}
          label="주석 작업"
          labelPlacement="end"
        />
        <FormControlLabel
          value="bottom"
          control={<Checkbox />}
          label="프로젝트 관리"
          labelPlacement="end"
        />
      </FormGroup>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="기계/전기/소방 모델링"
          labelPlacement="end"
        />
        <FormControlLabel
          value="start"
          control={<Checkbox />}
          label="뷰 관리"
          labelPlacement="end"
        />
      </FormGroup>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="top"
          control={<Checkbox />}
          label="사이트 모델링"
          labelPlacement="end"
        />
        <FormControlLabel
          value="start"
          control={<Checkbox />}
          label="시트 관리"
          labelPlacement="end"
        />
      </FormGroup>
    </FormControl>
  );
}

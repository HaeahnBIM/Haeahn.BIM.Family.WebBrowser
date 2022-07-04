import React, { useState, useEffect } from "react";
import './styles/DepartmentFilter.css';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dummy from "../api/Dummy.json";

// 부서 필터 컴포넌트(전체, 각 부서들)

// 한 땀 한땀이 많아서 부서 리스트에 따라 반복생성되게끔 바꿔야 겠다.
export default function DepartmentFilter() {

    useEffect(() => {
        CheckAllDepartments();
    }, [])

    // 체크박스 체크하기
    const [allChecked, setAllChecked] = useState(true);
    const [departments, setDepartments] = useState(Dummy["대상 부서"]);
    const [checkedDepartments, setCheckedDepartments] = useState(new Set());
    const [checkedCount, setCheckedCount] = useState(0);

    const CheckAllDepartments = () => {
        departments.forEach((dept) => {
            checkedDepartments.add(dept);
        });
        setCheckedCount(checkedDepartments.size);
    }
 
    const OnAllCheckClick = (event) => {
        if(!allChecked){
            CheckAllDepartments();
            setAllChecked(true);
        }
        else{
            checkedDepartments.clear();
            setAllChecked(false);
        }
    }

    const OnCheckboxClick = (event) => {
        if(checkedDepartments.has(event.target.value)){
            checkedDepartments.delete(event.target.value);
        }
        else{
            checkedDepartments.add(event.target.value);
        }
        setCheckedCount(checkedDepartments.size);
        if(allChecked && checkedDepartments.size < departments.length){
            setAllChecked(false);
        }
        if(!allChecked && checkedDepartments.size == departments.length){
            setAllChecked(true);
        }
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            {departments.map((item)=>(
                <FormControlLabel
                    label={item}
                    value={item}
                    control={<Checkbox checked={checkedDepartments.has(item) ? true : false} onClick={OnCheckboxClick} />}
                />))
            }
        </Box>
    );

    return (
        <div>
            <FormControlLabel
                label="전체"
                control={<Checkbox checked={allChecked} onClick={OnAllCheckClick}/>}
            />
            {children}
        </div>
    )
}
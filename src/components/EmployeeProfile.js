import React from "react";
import './styles/EmployeeProfile.css';

// 임직원 프로필 컴포넌트(사진, 이름, 부서, 직위 포함)
// 아래 정보는 어떻게 받아 올 것인가?
const profileImg ="https://hub.haeahn.com/Storage/GW/ImageStorage/Employee/jaehkim.jpg";
const employeeName = "김재희B";
const employeeDepartment = "IT연구소";
const employeePosition = "선임";

export default function EmployeeProfile() {
    return(
        <div>
            <div>
                <img className="profile-img" src={profileImg}></img>
            </div>
            <div className="profile-text">
                {employeeDepartment}
            </div>
            <div className="profile-text">
                {employeeName}  |  {employeePosition}
            </div>
        </div>
    )
}
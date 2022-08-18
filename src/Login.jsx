import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./css/login.module.css";
import pageStyles from "./css/page-wrap.module.css";
import logoImg from "./img/HAEAHN_LOGO.png";
import { fontSize } from "@mui/system";
import axios from "axios";
import Data from "./api/Data";

function Login() {
  let navigate = useNavigate();

  const [user, setUser] = useState();
  const [UserID, setUserId] = useState();
  const [PW, setPassword] = useState();
  const [alertMsg, setAlertMsg] = useState();
  const [uuid, setUuid] = useState();

  const AuthKey = "hubhaeahnrest";

  const LoginUser = (userId, pw, authKey) => {
    try {
      return axios.post(
        "https://api.haeahn.com/api/loginsso",
        new URLSearchParams({ userId, pw, authKey }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const GetUserUUID = async (EMP_NO) => {
    try {
      return axios.post(
        "https://api.haeahn.com/api/huserlogin",
        new URLSearchParams({ EMP_NO }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    LoginUser(UserID, PW, AuthKey).then((response) => {
      let userObj = JSON.parse(JSON.stringify(response.data));
      //유저 데이터가 존재하지 않음
      if (userObj === undefined || userObj.resultCode === -1) {
        setAlertMsg("잘못된 사용자 정보입니다. 다시 입력해 주세요.");
      } else {
        GetUserUUID(userObj.resultMessage).then((response) => {
          let userUUID = JSON.parse(JSON.stringify(response.data));
          setUuid(userUUID.resultUUID)

          setUser(userObj);
          //setAlertMsg("");     

          Data.SetRouteLog(userObj.resultMessage, "Login", "Main", "ROUTE");
          
          navigate('/App', { state: {userObj: userObj, uuid: userUUID.resultUUID} });
        });
      }
    });
  };

  return (
    <main className={pageStyles.page_wrapper}>
      <section
        className={pageStyles.page_container}
        style={{ justifyContent: "center" }}
      >
        <div
          className={styles.content_wrapper}
          style={{ margin: "auto", width: "500px", height: "500px" }}
        >
          <div className={styles.block_column_wrapper}>
            <img src={logoImg} className={styles.logo_img} alt="logo"></img>
            <div style={{ fontWeight: "500", paddingBottom: "30px" }}>
              Haeahn Family Manager v0.1
            </div>
            <form onSubmit={handleSubmit}>
              <label>
                <p>Username</p>
                <input
                  type="text"
                  placeholder="email ID"
                  onChange={(e) => setUserId(e.target.value)}
                />
              </label>
              <label>
                <p>Password</p>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <div style={{ paddingTop: "20px" }}>
                <button type="submit">Submit</button>
              </div>
              <div>
                <br />
                {alertMsg}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;

import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./LoginPage.css";
import Cookies from "js-cookie";
import axios from "axios";

const LoginPage = () => {
  const token = Cookies.get("jwtToken");
  if (token) {
    return <Navigate to="/" replace />;
  }

  const navigate = useNavigate();
  
  const [login, setLogin] = useState(false);
  const [UserName, setUserName] = useState("");
  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    setUserName("");
    setEmailData("");
    setPasswordData("");
  }, [login]);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (login && !UserName) {
      return alert("Please enter your username.");
    }

    if (!emailData || !passwordData) {
      return alert("Please enter all fields.");
    }

    const success = await apiCall();
    if (success) {
      setUserName("");
      setEmailData("");
      setPasswordData("");
    }
  };

  const apiCall = async () => {
    const url = login
      ? "http://localhost:3000/sign"
      : "http://localhost:3000/login";

    try {
      const response = await axios.post(url, {
        email: emailData,
        password: passwordData,
        username: UserName || "",
      });

      console.log("muneer", response.data.allTask);
      
      Cookies.set("jwtToken", response.data.token, { expires: 7 });
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="mainDiv">
      <div className="LoginMianDiv">
        <div className="LoginSubDiv">
          <h1>{login ? "Sign Up" : "Login"}</h1>
          <form onSubmit={HandleSubmit}>
            {login && (
              <>
                <label className="label" htmlFor="UserName">
                  UserName
                </label>
                <br />
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  value={UserName}
                  id="UserName"
                  type="text"
                  className="inputLogin"
                />
                <br />
                <div className="GAPDiv" />
              </>
            )}

            <label className="label" htmlFor="email">
              Email Id
            </label>
            <br />
            <input
              onChange={(e) => setEmailData(e.target.value)}
              value={emailData}
              id="email"
              type="email"
              className="inputLogin"
            />
            <br />
            <div className="GAPDiv" />
            <label className="label" htmlFor="password">
              PassWord
            </label>
            <br />
            <input
              onChange={(e) => setPasswordData(e.target.value)}
              value={passwordData}
              id="password"
              type="password"
              className="inputLogin"
            />
            <br />
            <div className="LofinFooter">
              <button className="loginBtn" type="submit">
                Login
              </button>
              <button
                onClick={() => setLogin(!login)}
                className="LinkBtn"
                type="button"
              >
                {!login ? "SignUp...?" : "Login...?"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

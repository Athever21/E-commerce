import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth_url } from "../../config";
import "./Header.scss";
import { useSelector, useDispatch } from "react-redux";

import LoginModal from "./LoginModal";

export default () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [loginModal,setLoginModal] = useState(false);

  useEffect(() => {
    axios
      .post(`${auth_url}/check`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const logout = async() => {
    await axios.post(`${auth_url}/logout`,{},{withCredentials: true});
    dispatch({
      type: "LOGOUT_USER"
    });
  }

  return (
    <header>
      <h1>E-commerce</h1>
      <div className="user">
        {user.username ? (
          <div className="user-info">
            <h3>{user.username}</h3>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="login">
            <button onClick={() => setLoginModal(true)}>
              Login
            </button>
            {loginModal && <LoginModal setShow={setLoginModal}/>}
          </div>
        )}
      </div>
    </header>
  );
};

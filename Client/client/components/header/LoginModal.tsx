import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import axios from "axios";
import {auth_url} from "../../config";
import events from "../../events";

const ADD_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user)
  }
`

export default ({ setShow }: { setShow: Function }) => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addUser, { data, error }] = useMutation(ADD_USER);

  const hideModal = ({ target }: any) => {
    if (target.classList[0] === "modal-container") {
      setShow(false);
    }
  }

  const loginUser = async () => {
    const res = await axios.post(`${auth_url}/login`,{login: username, password},{withCredentials: true});
    if(res.data.token) {
      setShow(false);
      events.emit("logged");
    }
  }

  const register = async () => {
    addUser({
      variables: {
        user: {
          username,
          email,
          password
        }
      }
    });

  }


  useEffect(() => {
    if (data?.createUser) {
      setUsername("");
      setEmail("");
      setPassword("");
      setLogin(true);
    }
    if (error) console.log("erro", error.message);
  }, [data, error])

  return (
    <div className="modal-container" onClick={hideModal}>
      <div className="modal-content login-modal">
        <h2>{login ? "Sign In" : "Sign Up"}</h2>
        <div className="inputs">
          <div className="input">
            <label>Username: </label>
            <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          {!login && <div className="input">
            <label>Email: </label>
            <input type="text" value={email} onChange={({ target }) => setEmail(target.value)} />
          </div>}
          <div className="input">
            <label>Password: </label>
            <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button onClick={login ? loginUser : register}>{login ? "Log In" : "Create Account"}</button>
        </div>
        <div className="login-nav">
          {login ?
            <div>Not a member? <span onClick={() => setLogin(false)}>Create a account</span></div> :
            <div>Already have account? <span onClick={() => setLogin(true)}>Log In</span></div>}
        </div>
      </div>
    </div>
  )
}
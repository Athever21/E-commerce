import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {auth_url} from "./config";
import axios from "axios";
import { hot } from "react-hot-loader";
import events from "./events";
import "./App.scss";

const Header = lazy(() => import("./components/header/Header"));

const App = () => {
  const user = useSelector((state: any) => state.user);
  const  [update,forceUpdate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const f = () => forceUpdate((f) => !f);

    events.on("logged", f);

    if(!user.username) {
      (async() => {
        try {
          const res = await axios.post(`${auth_url}/check`,{},{withCredentials: true});
          console.log(res);
          if(res.data.user) {
            dispatch({
              type: "LOGIN_USER",
              data: res.data.user
            });
          }
        } catch(err) {
          console.log(err);
        }
      })();
    }

    return () => {
      events.off("logged", f);
    }
  }, [update])

  return (
    <div>
      <Suspense fallback={<div className="container-lds"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>}>
        <Header />
      </Suspense>
    </div>
  )
}

export default hot(module)(App);
import { useContext, useEffect, useState } from "react";
import "./App.css";
import Router from "./Router";
import { auth } from "./Pages/Utility/fireBase";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Pages/Utility/Action.type";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch({
          type: Type.SET_USER,
          user: authuser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Router />
    </>
  );
}

export default App;

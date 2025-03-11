import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./Signup.module.css";
import { auth } from "../Utility/fireBase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../Utility/Action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signin: false,
    signUp: false,
  });
  const [{ user }, dispatch] = useContext(DataContext);

  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  // console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name == "signin") {
      // console.log(e.target.name);

      setLoading({ ...loading, signin: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signin: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signin: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);

          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });

          // console.log(err);
        });
    }
  };

  return (
    <section className={classes.login}>
      <div>
        <Link to="/">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG12.png"
            alt="AmazonLogo"
          />
        </Link>
      </div>

      <div className={classes.login__Container}>
        <h1>Sign in</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form>
          <div>
            <label htmlFor="email">E-mail</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">password</label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <button
            type="submit"
            name="signin"
            className={classes.login__signInButton}
            onClick={authHandler}
          >
            {loading.signin ? (
              <ClipLoader color="grey" size={15} />
            ) : (
              " Sign in"
            )}
          </button>
          <br />
          <br />
        </form>
        <p>
          By Signing-in you agree to the Amazone Fake Clone condtion of use &
          sale please see our privecy notice,our cookies notice and our
          interest-based Ads notice
        </p>
        <br />
        <button
          type="submit"
          name="signUp"
          className={classes.login__registerButton}
          onClick={authHandler}
        >
          {loading.signUp ? (
            <ClipLoader color="grey" size={15}></ClipLoader>
          ) : (
            " Create your Amazon Account "
          )}
        </button>
        {error && (
          <small style={{ color: "red", padding: "5px" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;

import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import style from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import {auth } from "../../Pages/Utility/fireBase"

function Header() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const totalItem = basket.reduce((amount, item) => amount + item.amount, 0);

  return (
    <section className={style.fixed}>
      <div className={style.header__container}>
        <div className={style.logo__container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon-Logo"
            />
          </Link>
          <div className={style.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className={style.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" />

          <BsSearch size={38} />
        </div>
        <div className={style.order__container}>
          <Link to="" className={style.language}>
            <img
              src="https://pngimg.com/uploads/flags/flags_PNG14655.png"
              alt="Flag-Logo"
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>

          {/* </a> */}
          <Link to="/Auth">
            <div>
              {user ? (
                <>
                  <p>Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={() => auth.signOut()}>signOut</span>
                </>
              ) : (
                <>
                  <p>Sign in</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>
          <Link to="/cart" className={style.cart}>
            <BiCart size={35} />
            <span>{totalItem}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
}

export default Header;

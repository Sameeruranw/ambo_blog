import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const Navigate = useNavigate();
  const path = useLocation().pathname;

  // console.log(prompt);
  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <>
      <div className=" flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">@mbo Blogging Web</Link>
        </h1>
        {path === '/'&& <div className=" flex justify-center items-center space-x-0">
          <p
            onClick={() =>
              Navigate(prompt ? "?search=" + prompt : Navigate("/"))
            }
            className="cursor-pointer"
          >
            <FaSearch />
          </p>
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className=" outline-none px-3"
            placeholder="search blog"
            type="text"
          ></input>
        </div>}

        <div className=" hidden md:flex items-center justify-center space-x-2 md:space-x-4">
          <h3>
            {user ? (
              <h3>
                <Link to="/Write">write</Link>
              </h3>
            ) : (
              <Link to="/Login">login</Link>
            )}
          </h3>

          {user ? (
            <div onClick={showMenu}>
              <p className="cursor-pointer">
                <FaBars />
              </p>
              {menu && <Menu />}
            </div>
          ) : (
            <h3>
              <Link to="/signup">Signup</Link>
            </h3>
          )}
        </div>
        <div onClick={showMenu} className=" md:hidden text-lg ">
          <p className="cursor-pointer relative">
            <FaBars />
          </p>
          {menu && <Menu />}
        </div>
      </div>
    </>
  );
};

export default Navbar;

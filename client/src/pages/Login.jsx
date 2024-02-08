import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import URL from "../url";
import axios from "axios";
import { UserContext, } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
          const res = await axios.post(URL + "/api/auth/login",{email,password},{withCredentials:true})
         setUser(res.data)
            navigate("/")
    } catch (err) {
      setError(true)
      console.log(err);
    }
  };

  return (
    <>
      <div className=" flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">@mbo Blogging Web</Link>
        </h1>
        <h3>
          <Link to="/Signup">Signup</Link>
        </h3>
      </div>
      <div className=" w-full flex justify-center items-center h-[70vh] ">
        <div className=" flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className=" text-xl font-bold text-left">
            {" "}
            Login to your account
          </h1>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full px-4 py-2 border-2 border-black outline-0"
            type="email"
            placeholder="enter your email"
          ></input>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border-2 border-black outline-0"
            type="password"
            placeholder="enter your password"
          ></input>
          <button
            onClick={handleClick}
            className=" w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
          >
            Login
          </button>
          {error && <h3 className='text-red-500 text-sm'> something went wrong</h3>}
          <div className=" flex  justify-center items-center space-x-3">
            <p> New here ?</p>
            <p className="text-gray-500 hover:text-black">
              {" "}
              <Link to="/Signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

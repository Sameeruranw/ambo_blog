import React from "react";

const Footer = () => {
  return (
    <>
      <div className=" mt-8 w-full bg-black px-8 md:px-[300px] flex md:flex-row flex-col space-y-4 md:space-y-0  items-start  md:justify-between text-sm md:text-md py-8">
        <div className=" flex flex-col text-white">
          <p>Featured Blog</p>
          <p>Most viewed</p>
          <p>Reader Choice</p>
        </div>
        <div className=" flex flex-col text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent posts</p>
        </div>
        <div className=" flex flex-col text-white">
          <p>Privacy & policy</p>
          <p>Terms and condition</p>
          <p>Recent and support</p>
        </div>
      </div>
      <p className=" py-2 pb-6 text-center text-white bg-black text-sm ">
        {" "}
        All rights reserved by @mbo Blog Market{" "}
      </p>
    </>
  );
};

export default Footer;

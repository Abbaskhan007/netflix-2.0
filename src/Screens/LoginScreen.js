import React, { useState, useEffect } from "react";
import SignInScreen from "./SignInScreen";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, logout } from "../features/counter/userSlice";

export default function LoginScreen() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="h-screen relative bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/757ab38f-5d08-40bc-b3eb-eaba63ed8203/93c34f94-56c8-40a7-8b2e-b4aac6427977/GB-en-20210125-popsignuptwoweeks-perspective_alpha_website_medium.jpg)] bg-center bg-no-repeat bg-cover">
      <div className="fixed flex flex-row justify-between items-center w-full px-5 ">
        <img
          onClick={() => navigate("/")}
          className="w-24 cursor-pointer"
          src="https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/Netflix-900x0.png"
        />
        <button
          onClick={() => navigate("/signIn")}
          className="px-[20px] py-[10px] text-white bg-[#e50914] border-none outline-none cursor-pointer"
        >
          Sign In
        </button>
      </div>
      <div className="absolute top-[30%] text-center w-full text-white p-8">
        <div>
          <h1 className="text-4xl font-semibold mb-3">
            Unlimited films, TV Programmes and more.{" "}
          </h1>
          <h6 className="text-lg  mb-6">
            Watch at anywhere. Cancel at any time
          </h6>
          <p className="text-sm font-light">
            Ready to watch? Enter your email to create or restart your
            membership
          </p>
          <div className="flex flex-row max-w-2xl mx-auto my-4">
            <input
              className="flex-1 h-[40px] px-6 outline-none border-none text-black"
              type="text"
              placeholder="Email Address"
            />
            <button
              onClick={() => navigate("/signIn")}
              className="text-white bg-[#e50914] border-none outline-none cursor-pointer px-[20px] h-[40px] "
            >
              GET STARTED
            </button>
          </div>
        </div>
      </div>
      <div className="h-screen bg-black/40 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.8)]" />
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({ show }) {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed w-full transition-all ease-in duration-500 flex items-center justify-between p-5 h-6 py-[30px] z-50 bg-[#111] ${
        !show && "bg-transparent"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        className="w-28 fixed left-5 object-contain cursor-pointer pl-5"
        src="https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/Netflix-900x0.png"
      />
      <img
        onClick={() => navigate("/profile")}
        className=" fixed w-8 right-3 cursor-pointer"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
      />
    </div>
  );
}

import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logout } from "../features/counter/userSlice";
import PlansScreen from "./PlansScreen";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("User", user);

  const onLogout = () => {
    auth.signOut();
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  if (user) {
    return (
      <div className="h-screen">
        <NavBar />
        <div className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto text-white  pt-[80px] ">
          <h2 className="border-b border-b-[#282c2d] mb-5 md:text-[60px] text-[40px] font-[400] text-center md:text-start">
            Edit Profile
          </h2>
          <div className="flex md:flex-row flex-col space-y-6  md:space-x-6 ">
            <img
              className="h-[100px] object-contain"
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            />
            <div className="flex-1">
              <h5 className="bg-[gray] text-[16px] px-[20px] py-[15px]">
                {user?.email}
              </h5>
              <h5 className="mt-[20px] text-[16px] font-medium">
                Plans (Current Plan Premium)
              </h5>
              <PlansScreen />
              <button
                onClick={onLogout}
                className="bg-[#e50914] mt-4 w-full p-[10px] font-[600] text-[16px] border-none cursor-pointer"
              >
                Signout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

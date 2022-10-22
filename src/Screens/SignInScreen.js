import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, logout } from "../features/counter/userSlice";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const onRegister = e => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => console.log("Auth User", authUser))
      .catch(error => alert(error));
  };

  const onSignIn = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(authUser => console.log("Auth User", authUser))
      .catch(error => alert(error));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  //   console.log("Email and Password", email, password);

  return (
    <div className="h-screen flex  justify-between items-center relative bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/757ab38f-5d08-40bc-b3eb-eaba63ed8203/93c34f94-56c8-40a7-8b2e-b4aac6427977/GB-en-20210125-popsignuptwoweeks-perspective_alpha_website_medium.jpg)] bg-center bg-no-repeat bg-cover">
      <div className="w-[400px] text-white -mt-8 flex flex-col bg-[rgba(0,0,0,0.85)] items-center justify-center mx-auto py-[70px]">
        <form onSubmit={onSignIn} className="w-[300px]">
          <h3 className="text-3xl mb-6 text-center">Sign In</h3>
          <input
            value={email}
            //   onChange={e => setEmail(e)}
            onChange={e => setEmail(e.target.value)}
            className="h-[40px] w-full outline-none border-none mb-4 rounded-sm py-[5px] px-[15px] text-black"
            type="email"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="h-[40px] w-full outline-none border-none mb-4 rounded-sm py-[5px] px-[15px] text-black"
            type="password"
            placeholder="Password"
          />
          <button
            className="px-5 py-3 w-full text-[16px] rounded-md text-white bg-[#e50914] border-none cursor-pointer mt-3 font-[600] "
            type="submit"
          >
            Sign In
          </button>
          <h4 className="mt-4">
            <span className="text-gray-500">New to Netflix?</span>{" "}
            <span
              className="hover:underline cursor-pointer"
              onClick={() => navigate("/registration", { replace: true })}
            >
              Sign Up Now.
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
}

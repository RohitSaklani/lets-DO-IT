import React, { useState } from "react";

import { signIn } from "../utility/login";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { res, error } = await signIn(email, pass);

    setError(error?.toString());
    if (res) {
      navigate("/");
    }
  };

  return (
    <div className="  bg-gradient-to-br from-green-200 to-yellow-200 w-[300px] h-[400px] md:w-[400px] md:h-[500px] m-auto  mt-4 px-8	 pt-10">
      <p className="text-[30px] ">Sign In</p>
      <form onSubmit={handleSubmit} className="flex flex-col  gap-4  mt-8">
        <p className="text-red-700 font-medium">
          {/* {error?.type == "signin" ? error?.title : ""} */}
          {error}
        </p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="h-[35px] rounded-sm px-3"
          type="text"
          placeholder="Email"
          required
        ></input>
        <input
          onChange={(e) => setPass(e.target.value)}
          className="h-[35px] rounded-sm px-3"
          type="password"
          placeholder="Password"
          required
        ></input>
        <button className=" bg-green-300 h-[35px] rounded-sm mt-3 hover:bg-green-400 ">
          Sign In
        </button>
      </form>
      <div className="">
        <Link to="/signup">
          <p className="text-xs mt-4">
            New User ?<span className="font-medium hover:text-sm">Sign Up</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;

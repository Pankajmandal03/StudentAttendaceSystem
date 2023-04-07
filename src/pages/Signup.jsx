import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Layout from "../components/Layout";
import { UserAuth } from "../context/Auth_context";

const Signup = () => {
  const { handleSignup } = UserAuth();
  const initialState = {
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [formState, setFormState] = useState(initialState);

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <>
      <Layout className={"flex justify-center items-center"}>
        <div className="w-[80%] h-[60%] md:w-fit bg-white m-auto rounded-md flex flex-col justify-center items-center gap-2	p-2">
          <form
            action=""
            className="flex flex-col justify-center items-center gap-y-5"
          >
            <h1 className="text-black text-3xl font-semibold text-center">
              Create Student Account
            </h1>
            <Input
              onChange={handleFormChange}
              id="email"
              label="Mail"
              type="email"
              placeholder={"Enter Your Mail"}
            />
            <Input
              onChange={handleFormChange}
              id="password"
              label="Password"
              type="password"
              placeholder={"Enter Your password"}
            />
            <Input
              onChange={handleFormChange}
              id="confirmpassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Your password"
            />
            <div className="flex gap-8">
              <span>Already have a account?</span>
              <Link to="/Login" className="text-blue-900">
                Login Here
              </Link>
            </div>
            <button
              type="button"
              onClick={() => {
                handleSignup(formState);
              }}
              className="bg-purple-500  text-xl text-white rounded-lg p-1 hover:bg-purple-400"
            >
              Create Account
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Signup;

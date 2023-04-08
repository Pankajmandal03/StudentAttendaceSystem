import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Layout from "../components/Layout";
import { UserAuth } from "../context/Auth_context";
import Spinner from "../components/Spiner";

const Signup = () => {
  const { handleSignup, loading, setLoading } = UserAuth();
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
      <Layout>
        <div className="flex flex-col items-center justify-around gap-16 ">
          <h1 className="text-black text-3xl font-bold text-center mt-10">
            Create Student Account
          </h1>

          <div className="w-[80%] h-[60%] md:w-fit bg-white  rounded-md flex flex-col justify-center items-center gap-2	px-2 py-6">
            <form
              action=""
              className="flex flex-col justify-center items-center gap-y-5"
            >
              <h1 className="text-black text-3xl font-semibold text-center">
                SignUp
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
                  handleSignup(formState, setLoading);
                }}
                className="bg-purple-500  text-xl text-white rounded-lg px-6 py-2 hover:bg-purple-400"
              >
                {loading ? <Spinner /> : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Signup;

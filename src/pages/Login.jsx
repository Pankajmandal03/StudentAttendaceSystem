import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Layout from "../components/Layout";
import { UserAuth } from "../context/Auth_context";
import { auth } from "../Firebase_config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spiner";

const Login = () => {
  const { setUser } = UserAuth();
  const naviGate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  const handleloginIn = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(
      auth,
      formState.email,
      formState.password
    ).then((userCredential) => {
      toast.success("Login Sucessfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: false,
        theme: "light",
      });

      // Signed in
      const user = userCredential.user;
      setLoading(false);
      setUser(user);
      naviGate("/Dashboard");
      // ...
    });
  };

  return (
    <Layout className={"flex justify-center items-center"}>
      <div className="w-[80%] h-[50%] md:w-fit p-4 bg-white rounded-md  flex flex-col items-center justify-center gap-2 pt-3">
        <h1 className="text-black text-3xl font-bold text-center">Login</h1>

        <Input
          onChange={handleFormChange}
          id="email"
          label={"Mail"}
          type={"email"}
          placeholder={"Enter Your Mail"}
        />
        <Input
          onChange={handleFormChange}
          id="password"
          label={"Password"}
          type={"password"}
          placeholder={"Enter Your password"}
        />
        <div className="flex">
          <span>Dosen't have a account?</span>
          <Link to="/Signup" className="text-blue-900">
            Create Here
          </Link>
        </div>

        <button
          type="button"
          onClick={() => {
            handleloginIn(formState, setLoading);
          }}
          className="bg-purple-500 text-center text-xl text-white rounded-lg px-6 py-2 hover:bg-purple-400"
        >
          {loading ? <Spinner /> : "Login"}
        </button>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Login;

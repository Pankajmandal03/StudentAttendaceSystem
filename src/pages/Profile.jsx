import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Input from "../components/Input";
import { option_year, option_branch } from "../components/Data";
import Select from "../components/Select";
import { UserAuth } from "../context/Auth_context";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase_config";
import { useNavigate } from "react-router-dom";
import Navbarcomp from "../components/Navbarcomp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const { user, userdata } = UserAuth();
  const naviGate = useNavigate();
  const initialState = {
    name: "",
    number: "",
    email: "",
    branch: "",
    year: "",
  };
  const [formState, setFormState] = useState(initialState);
  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    setFormState(userdata);
  }, [userdata]);

  const handleUpdateProfile = async () => {
    const updateRef = doc(db, "Student_attendance", `${user.uid}`);
    await updateDoc(updateRef, formState)
      .then(() => {
        console.log(user.uid);
        toast.success("Profile Updated Sucessfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .then(() => {
        naviGate("/Dashboard");
      });
  };

  return (
    <>
      <Layout>
        <Navbarcomp></Navbarcomp>
        <div className="flex items-center justify-center my-6">
          {userdata ? (
            <div className=" w-[90vw] h-[80vh] bg-white flex flex-col items-center justify-center  rounded-lg gap-y-5 py-4">
              <form action="" className="contents w-[100vw]">
                <h1 className="text-4xl font-bold text-center ">Profile</h1>
                <Input
                  id="name"
                  type={"name"}
                  label="Student Name:"
                  placeholder={"Enter your name"}
                  onChange={handleFormChange}
                  value={userdata.name}
                />
                <Input
                  id="number"
                  type={"number"}
                  label="Roll Number:"
                  placeholder={"Enter your roll number"}
                  onChange={handleFormChange}
                  value={userdata.number}
                />
                <Input
                  id="email"
                  type={"mail"}
                  label="Mail:"
                  placeholder={"Enter your Mail"}
                  onChange={handleFormChange}
                  value={userdata.email}
                />
                <Select
                  id="branch"
                  label="Branch"
                  options={option_branch}
                  onChange={handleFormChange}
                  value={userdata.branch}
                ></Select>
                <Select
                  id="year"
                  label="Year"
                  options={option_year}
                  onChange={handleFormChange}
                  value={userdata.year}
                ></Select>

                <button
                  onClick={handleUpdateProfile}
                  type="button"
                  className="bg-purple-500 text-center text-xl text-white rounded-lg p-1 hover:bg-purple-400 shadow hover:shadow-lg hover:scale-105 duration-200"
                >
                  Update
                </button>
              </form>
            </div>
          ) : (
            <div className="absolute w-[70vw] h-[90vh] bg-white flex flex-col items-center justify-center right-5 rounded-lg gap-y-5">
              <form action="" className="contents w-[100vw]">
                <h1 className="text-4xl font-bold text-center ">Profile</h1>
                <Input
                  id="name"
                  type={"name"}
                  label="Enter your name"
                  placeholder={"Enter your name"}
                  onChange={handleFormChange}
                />
                <Input
                  id="number"
                  type={"number"}
                  label="Enter your roll number"
                  placeholder={"Enter your roll number"}
                  onChange={handleFormChange}
                />
                <Input
                  id="email"
                  type={"mail"}
                  label="Your Mail"
                  placeholder={"Enter your Mail"}
                  onChange={handleFormChange}
                />
                <Select
                  id="branch"
                  label="Branch"
                  options={option_branch}
                  onChange={handleFormChange}
                ></Select>
                <Select
                  id="year"
                  label="Year"
                  options={option_year}
                  onChange={handleFormChange}
                ></Select>

                <button
                  onClick={handleUpdateProfile}
                  type="button"
                  className="bg-purple-500 text-center text-xl text-white rounded-lg p-1 hover:bg-purple-400 shadow hover:shadow-lg hover:scale-105 duration-200"
                >
                  Update
                </button>
              </form>
            </div>
          )}
        </div>
        <ToastContainer></ToastContainer>
      </Layout>
    </>
  );
};

export default Profile;

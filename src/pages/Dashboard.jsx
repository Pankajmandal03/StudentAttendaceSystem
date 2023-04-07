import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { UserAuth } from "../context/Auth_context";
import { auth, db } from "../Firebase_config";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { doc, setDoc } from "@firebase/firestore";
import { AiOutlineMenu, AiOutlineScan } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const Dashboard = () => {
  const [expand, setexpannd] = useState(false);
  const toggle = () => {
    setexpannd(!expand);
  };

  const { userdata ,user} = UserAuth();
  const naviGate = useNavigate();
  const logOut = async () => {
    await signOut(auth).then(() => {
      naviGate("/Login");
    });
  };

  function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    stopscanning();
  }

  function onScanFailure(error) {
    console.warn(`Code scan error = ${error}`);
    stopscanning();
  }

  const scanbutton = () => {
  
    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = async (decodedText, decodedResult) => {
      /* handle success */
      const qrcodedata = JSON.parse(decodedResult.decodedText);
      // await setDoc(
      //   doc(
      //     db,
      //     `${qrcodedata.department}-${qrcodedata.year}-${qrcodedata.subname}`,
      //     "date-starttime-endtime-studentUID"
      //   ),
      //   {
      //     name: "Los Angeles",
      //     state: "CA",
      //     country: "USA",
      //   }
      // );
      Html5Qrcode.stop()
      .then((ignore) => {
        // QR Code scanning is stopped.
        console.log(user);
      })
      .catch((err) => {
        alert("stop scanning error");
      });
      // stopscanning()
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    html5QrCode.start(
      { facingMode: "environment" },
      config,
      onScanSuccess,
      onScanFailure
    );
  }
  //   let html5QrcodeScanner = new Html5QrcodeScanner(
  //     "reader",
  //     { fps: 10, qrbox: { width: 250, height: 250 } },
  //     /* verbose= */ false
  //   );
  //   html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  // };
  const stopscanning = () => {
    Html5Qrcode.stop()
      .then((ignore) => {
        // QR Code scanning is stopped.
        console.log(user);
      })
      .catch((err) => {
        alert("stop scanning error");
      });
  };

  return (
    <>
      {/* <Layout className={'flex justify-center items-center'}> */}
      <Layout>
      <div className="absolute flex-col ">
          <div className=" pt-4 pl-4  ">
            <button onClick={toggle}>
              <div
                className={`${
                  expand ? "hidden" : "block"
                } h-6 w-6 text-black text-3xl `}
              >
                <AiOutlineMenu />
              </div>
              <div
                className={`${
                  expand ? "block" : "hidden"
                } h-6 w-6 text-black text-2xl active:bg-none`}
              >
                <RxCross1 />
              </div>
            </button>
          </div>
          <div className="relative top-0">
            <nav
              className={`${
                expand ? "block" : "hidden"
              } flex  pt-52 justify-center backdrop-blur-sm duration-500  w-[100vw] h-[90vh]  ease-out `}
            >
              <ul className="flex flex-col gap-y-14 items-center pb-2 rounded-md">
                {userdata ? (
                  <p className="text-2xl hover:font-semibold absolute top-3 left-24">
                    Account: {userdata.name}
                  </p>
                ) : (
                  <p className="text-2xl hover:font-semibold">Account</p>
                )}
                {/* {userdata ? (
              <h1 className="font-bold text-xl">
                {userdata.name}
              </h1>
            ) : (
              <h1 className="font-bold text-xl">Account</h1>
            )} */}
                <li>
                  <Link to="/profile" className="text-2xl hover:font-semibold">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/Attendance" className="text-2xl hover:font-semibold">
                    Your Attendance
                  </Link>
                </li>
                <button
                  onClick={logOut}
                  className="mx-auto w-1/2  cursor-pointer p-2 rounded-md font-semibold hover:scale-105 shadow hover:shadow-lg duration-200 bg-red-600 text-white"
                >
                  Log Out
                </button>
              </ul>
            </nav>
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-center flex-col gap-y-28  ">
          <div className=" h-[50vh] md:h-[55vh] p-2 w-[90vw] md:w-[25vw] border-2 border-dashed  rounded-lg">
          <div id="reader" width="600px"></div>
            {/* <p className="flex items-center justify-center w-full h-fit">tap below</p> */}
          </div>

          <button
            type="button"
            onClick={scanbutton}
            className="mx-auto  cursor-pointer p-2 rounded-md font-semibold hover:scale-105 shadow hover:shadow-lg duration-200  text-black text-7xl"
          >
            <AiOutlineScan />
          </button>
        </div>
    
      </Layout>
    </>
  );
};

export default Dashboard;

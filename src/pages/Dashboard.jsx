import Layout from "../components/Layout";
import Navbarcomp from "../components/Navbarcomp";
import { UserAuth } from "../context/Auth_context";
import { db } from "../Firebase_config";
import { Html5Qrcode } from "html5-qrcode";
import { collection, addDoc } from "@firebase/firestore";

import { AiOutlineScan } from "react-icons/ai";

const Dashboard = () => {
  const { userdata } = UserAuth();

  const scanbutton = () => {
    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = async (decodedText, decodedResult) => {
      /* handle success */
      const qrcodedata = JSON.parse(decodedResult.decodedText);
      html5QrCode
        .stop()
        .then(async (ignore) => {
          await addDoc(
            collection(
              db,
              `${qrcodedata.department}-${qrcodedata.year}-${qrcodedata.subname}`
            ),
            {
              name: `${userdata.name}`,
              studentId: `${userdata.uid}`,
              rollno: `${userdata.number}`,
              teacherid: `${qrcodedata.AdminUID}`,
              date: `${qrcodedata.date}`,
              time: `${qrcodedata.time}`,
            }
          )
            .then(() => {
              alert("data added sucessfully");
              console.log(qrcodedata);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          alert("stop scanning error");
        });
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    html5QrCode.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback
    );
  };

  return (
    <>
      <Layout>
        <Navbarcomp></Navbarcomp>
        <div className="w-full h-screen flex justify-center items-center flex-col gap-y-28  ">
          <div className=" h-[50vh] md:h-[55vh] p-2 w-[90vw] md:w-[25vw] border-2 border-dashed  rounded-lg">
            <div id="reader" width="600px"></div>
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

import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { db } from "../Firebase_config";
import Layout from "../components/Layout";
import { UserAuth } from "../context/Auth_context";

const Attendance = () => {
  const { userdata, user } = UserAuth();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Com-2-EC-I", `${user.uid}`), (doc) => {
      console.log("Current data: ", doc.data());
    });
    console.log(user.uid);
    unsub();
  }, []);

  return (
    <Layout>
      <div>Attendance</div>
    </Layout>
  );
};

export default Attendance;

import { collection, doc, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase_config";
import Layout from "../components/Layout";
import { UserAuth } from "../context/Auth_context";

const Attendance = () => {
  const { userdata, user } = UserAuth();
  const [attendance, setattendance] = useState(null);

  useEffect(() => {
    const temp = [];
    const unsub = onSnapshot(doc(db, "Com-2-EC-I", `${user.uid}`), (doc) => {
      temp.push(...doc.data());
      console.log("Current data: ", doc.data());
      console.log(temp);
    });
    setattendance(temp);
    console.log(user.uid);
    unsub();
  }, []);

  return (
    <Layout>
      {attendance && (
        <div>
          <p>{attendance.name}</p>
        </div>
      )}
    </Layout>
  );
};

export default Attendance;

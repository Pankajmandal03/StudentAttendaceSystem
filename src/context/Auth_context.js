import React, { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth, db } from '../Firebase_config';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext()

const AuthenticationContext = ({ children }) => {
	const [user, setUser] = useState();
	const [userdata, setuserdata] = useState()
	const [loading, setLoading] = useState(false);

	const naviGate = useNavigate()

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
				const unsub = onSnapshot(doc(db, "Student_attendance", user.uid), (doc) => {
					console.log("Current data: ", doc.data());

					setuserdata(doc.data());
					unsub()

				});

				// ...
			} else {
				setUser(null)
				setuserdata(null)
				naviGate('/login')
			}
		});
	}, [])

	const handleSignup = async (formState) => {
		if (formState.password === formState.confirmpassword) {
			setLoading(true);
			await createUserWithEmailAndPassword(auth, formState.email, formState.password)
				.then((userCredential) => {
					const user = userCredential.user;
					setUser(user);
					setDoc(doc(db, "Student_attendance", user.uid), {
						email: user.email,
						uid: user.uid
					}).then(() => {
						setLoading(false);
						sendEmailVerification(auth.currentUser).then(() => {
							toast.success("SignUp Sucessfully!", {
								position: "top-center",
								autoClose: 3000,
								hideProgressBar: false,
								closeOnClick: false,
								pauseOnHover: false,
								draggable: false,
								progress: false,
								theme: "light",
							});
							naviGate("/Dashboard")
						})
					})
				})
				.catch((error) => {
					alert(error)
				})
		}
		else {
			toast.error("Invalid Password!", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: false,
				theme: "light",
			});
		}
	}
	return (
		<>
			<ToastContainer></ToastContainer>
			<AuthContext.Provider value={{ user, setUser, handleSignup, userdata, loading, setLoading }}>
				{children}

			</AuthContext.Provider>
		</>
	)
}

const UserAuth = () => {
	return useContext(AuthContext)
}
export { AuthenticationContext, UserAuth }

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth, db } from '../Firebase_config';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';


const AuthContext = createContext()

const AuthenticationContext = ({ children }) => {
	const [user, setUser] = useState();
	const [userdata, setuserdata] = useState()
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
			await createUserWithEmailAndPassword(auth, formState.email, formState.password)
				.then((userCredential) => {
					const user = userCredential.user;
					setUser(user);
					setDoc(doc(db, "Student_attendance", user.uid), {
						email: user.email,
						uid: user.uid
					}).then(() => {
						sendEmailVerification(auth.currentUser).then(() => {
							alert("Account Created")
							naviGate("/Dashboard")
						})
					})
				})
				.catch((error) => {
					alert(error)
				})
		}
		else{ alert("password not match")}
	}




	return (
		<>
			<AuthContext.Provider value={{ user, setUser, handleSignup, userdata }}>
				{children}
			</AuthContext.Provider>
		</>
	)
}

const UserAuth = () => {
	return useContext(AuthContext)
}
export { AuthenticationContext, UserAuth }

import React from 'react'
import { UserAuth } from '../context/Auth_context';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase_config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbarcomp = ({ className }) => {
	const { userdata } = UserAuth();
	const naviGate = useNavigate();
	const logOut = async () => {
		await signOut(auth).then(() => {
			toast.error("Logout Sucessfully!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			naviGate("/Login");
		});
	};
	return (
		<div className={className}>
			<nav>
				<ul className="flex   justify-between items-center pb-2 rounded-md pt-6 px-5">


					<li>
						<Link to="/profile" className="mx-auto   cursor-pointer p-2 rounded-md font-semibold hover:scale-105 shadow hover:shadow-lg duration-200 bg-purple-600 text-white">
							Profile
						</Link>
					</li>
					<li>

						{userdata ? (
							<p className="text-2xl hover:font-semibold  font-bold">
								{userdata.name}
							</p>
						) : (
							<p className="text-1xl hover:font-semibold">Account</p>
						)}
					</li>
					<li>

						<button
							onClick={logOut}
							className="mx-auto   cursor-pointer p-2 rounded-md font-semibold hover:scale-105 shadow hover:shadow-lg duration-200 bg-red-600 text-white"
						>
							Log Out
						</button>
					</li>
				</ul>
			</nav>
			<ToastContainer></ToastContainer>
		</div>
	)
}

export default Navbarcomp

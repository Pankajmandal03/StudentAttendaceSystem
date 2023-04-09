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
			<nav className=''>
				<ul className="flex   justify-between items-center pb-2 rounded-md pt-6 px-5">


					<li>
						<Link to="/profile" className="mx-auto   cursor-pointer p-2 rounded-md font-semibold hover:scale-105  hover:shadow-lg duration-200 bg-purple-600 text-white shadow-md">
							Profile
						</Link>
					</li>
					<li>
						<Link to="/Dashboard" className="mx-auto   cursor-pointer p-2 rounded-md font-semibold hover:scale-105  hover:shadow-lg duration-200 bg-white text-purple-600 shadow-md">
							Dashboard
						</Link>

					</li>
					<li>

						<button
							onClick={logOut}
							className="mx-auto   cursor-pointer p-2 rounded-md font-semibold hover:scale-105  hover:shadow-lg duration-200 bg-red-600 text-white shadow-md"
						>
							Log Out
						</button>
					</li>
				</ul>
			</nav>
			<p className='text-center mt-2'>
				{userdata ? (
					<p className="text-2xl hover:font-semibold  font-bold">
						{userdata.name}
					</p>
				) : (
					<p className="text-1xl hover:font-semibold">Account</p>
				)}
			</p>
			<ToastContainer></ToastContainer>
		</div>
	)
}

export default Navbarcomp

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// //creating a component to render the navigation bar
// const Navbarcomp = () => {

// 	//creating a state variable to store the current page
// 	const [currentPage, setCurrentPage] = useState('home');

// 	//creating a function to update the current page state variable
// 	const handlePageChange = (page) => {
// 		setCurrentPage(page);
// 	}

// 	return (

// 		//rendering the navigation bar with links to different pages
// 		<nav>

// 			<Link onClick={() => handlePageChange('Profile')} className={currentPage === 'Profile' ? 'active' : ''} to="/Profile">Profile</Link>

// 			<Link onClick={() => handlePageChange('Dashboard')} className={currentPage === 'Dashboard' ? 'active' : ''} to="/Dashboard">Dashboard</Link>

// 			<Link onClick={() => handlePageChange('contact')} className={currentPage === 'contact' ? 'active' : ''} to="/contact">Contact</Link>

// 		</nav>

// 	);
// };
// export default Navbarcomp;



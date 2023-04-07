import React from 'react'

const Layout = ({ children, className }) => {
	return (
		<div className={` md:min-h-screen h-[100vh] w-[100vw] bg-gradient-to-r from-indigo-300 to-purple-400  ${className} `} >
			{children} 


		</div>
	)
}

export default Layout
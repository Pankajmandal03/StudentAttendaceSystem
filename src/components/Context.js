import React, { createContext, useContext } from 'react'

const attendancecontext = createContext()

const ContextProvider = ({ children }) => {
	let data = "nitish"
	return (
		<>
			<attendancecontext.Provider value={{ data }}>
				{children}
			</attendancecontext.Provider>
		</>
	)
}

const UserContext = () => {
	return useContext(attendancecontext)
}

export { ContextProvider, UserContext }
import { Navigate, Route, Routes } from 'react-router-dom'

import CreateAccount from '../pages/CreateAccount'
import Login from '../pages/Login'

export default function UnLoggedInRouter() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/create-account" element={<CreateAccount />} />
			<Route path="*" element={<Navigate to={'/'} replace />} />
		</Routes>
	)
}

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "./app/shared/components/sidebar"
import Redirect from "./app/shared/components/rediirect"
import EmployeesPage from "./app/features/employees/views/employees"
import SettingsPage from "./app/features/settings/views/settings"
import { useEffect, useState } from "react";
import CreateEmployeePage from "./app/features/employees/views/createEmployee"
import LoginPage from "./app/features/auth/views/login"

function App() {
	const [theme, setTheme] = useState(localStorage.getItem("theme"));

	useEffect(() => {
		const saved = localStorage.getItem("theme") || "coral";
		setTheme(saved);
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme || "coral");
	}, [theme]);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Redirect route="/login"/>} />

				<Route path="/login" element={<LoginPage />} />
				<Route path="/employees" element={ <EmployeesPage /> } />
				<Route path="/create-employee" element={<CreateEmployeePage />} />
				<Route path="/requests" element={<> </>} />
				<Route path="/settings" element={ <SettingsPage /> } />
			</Routes>
		</BrowserRouter>
	)
}

export default App

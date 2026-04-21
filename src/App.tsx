import { BrowserRouter, Route, Routes } from "react-router-dom"
import Redirect from "./app/shared/components/rediirect"
import EmployeesPage from "./app/features/employees/views/employees"
import SettingsPage from "./app/features/settings/views/settings"
import { useEffect, useState } from "react";
import CreateEmployeePage from "./app/features/employees/views/createEmployee"
import LoginPage from "./app/features/auth/views/login"
import RequestsPage from "./app/features/requests/views/RequestsPage"
import { verifySession } from "./app/shared/services/apiClient";

function App() {
	const [theme, setTheme] = useState(localStorage.getItem("theme"));

	useEffect(() => {
		const saved = localStorage.getItem("theme") || "coral";
		setTheme(saved);
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme || "coral");
	}, [theme]);

	useEffect(() => {
        // Verificamos la sesión apenas carga la app
        verifySession();
    }, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Redirect route="/login"/>} />

				<Route path="/login" element={<LoginPage />} />
				<Route path="/employees" element={ <EmployeesPage /> } />
				<Route path="/create-employee" element={<CreateEmployeePage />} />
				<Route path="/requests" element={<RequestsPage />} />
				<Route path="/settings" element={ <SettingsPage /> } />
			</Routes>
		</BrowserRouter>
	)
}

export default App

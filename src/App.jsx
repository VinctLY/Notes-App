// IMPORT REACT MODULES
import { getAccessToken } from "./utils/network-data";
import { createContext, useEffect, useState } from "react";

// IMPORT OTHER MODULES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// IMPORT UI COMPONENTS
import Header from "./components/header";

// IMPORT PAGES
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateNote from "./pages/createNote";
import Notes from "./pages/notes/Notes";
import NoteItem from "./pages/noteItem";
import Profile from "./pages/Profile/Profile";
import PageNotFound from "./pages/pageNotFound";

export const ThemeContext = createContext();
export const AuthenticatedContext = createContext();
export const LanguageContext = createContext();

function App() {
	const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
	const themeData = {
		theme,
		setTheme,
	};
	const [language, setLanguage] = useState(localStorage.getItem("language") || "English");
	const languageData = {
		language,
		setLanguage,
	};

	const [authenticated, setAuthenticated] = useState(!!getAccessToken());
	const authenticatedData = {
		authenticated,
		setAuthenticated,
	};

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	useEffect(() => {
		localStorage.setItem("language", language);
	}, [language]);

	return (
		<Router>
			<ThemeContext.Provider value={themeData}>
				<LanguageContext.Provider value={languageData}>
					<AuthenticatedContext.Provider value={authenticatedData}>
						<Header />
						<Routes>
							<Route path="/">
								<Route index element={<Home />} />
								{!authenticated ? (
									<>
										<Route path="login" element={<Login />} />
										<Route path="register" element={<Register />} />
									</>
								) : (
									<>
										<Route path="notes">
											<Route index element={<Notes active={true} />} />
											<Route path="archived">
												<Route index element={<Notes active={false} />} />
												<Route path=":noteId" element={<NoteItem active={false} />} />
											</Route>
											<Route path="create" element={<CreateNote />} />
											<Route path=":noteId" element={<NoteItem active={true} />} />
										</Route>
										<Route path="profile" element={<Profile />} />
									</>
								)}
							</Route>
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</AuthenticatedContext.Provider>
				</LanguageContext.Provider>
			</ThemeContext.Provider>
		</Router>
	);
}

export default App;

/**
 * TODO {2 items}: - REFACTOR CONTEXT COMPONENT PROVIDER (ThemeContext, AuthenticatedContext)
 * TODO {3 items}: - SET LOGIC FOR LOGIN, CHANGING APP THEME, AND LANGUAGE
 */

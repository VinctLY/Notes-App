import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserLogged } from "../../utils/network-data";

import useFetch from "../../hooks/useFetch";
import { AuthenticatedContext, LanguageContext, ThemeContext } from "../../App";

import LoadingAnimation from "../../components/loadingAnimation";

const Profile = () => {
	const { theme, setTheme } = useContext(ThemeContext);
	const { setAuthenticated } = useContext(AuthenticatedContext);
	const { language, setLanguage } = useContext(LanguageContext);

	const { isLoading, isError, data } = useFetch(() => getUserLogged());
	const navigate = useNavigate()

	if (isLoading)
		return (
			<div className="temporary--container">
				<LoadingAnimation />
			</div>
		);

	if (isError)
		return (
			<div className="temporary--container">
				<p className="warning--data--output">An error occurred when trying to get data..</p>
			</div>
		);

	return (
		<main className="page--profile_me">
			<div className="profile--me">
				<h1>{data.name}</h1>
				<span>{data.email}</span>
			</div>
			<div className="profile--cta">
				<button
					onClick={() => {
						localStorage.removeItem("accessToken");
						setAuthenticated(false);
						navigate("/")
					}}>
					<i className="fa-solid fa-arrow-right-from-bracket"></i>
					<span>{language === "English" ? "Logout" : "Keluar"}</span>
				</button>
				<button
					onClick={() => {
						theme === "light" ? setTheme("dark") : setTheme("light");
					}}>
					{theme === "light" ? (
						<>
							<i className="fa-solid fa-sun"></i>
							<span>{language === "English" ? "Light Mode" : "Mode Terang"}</span>
						</>
					) : (
						<>
							<i className="fa-solid fa-moon"></i>
							<span>{language === "English" ? "Dark Mode" : "Mode Gelap"}</span>
						</>
					)}
				</button>
				<button
					onClick={() => {
						language === "English" ? setLanguage("Indonesia") : setLanguage("English");
					}}>
					<i className="fa-solid fa-language"></i>
					<span>{language === "English" ? "Change Language (Indonesia)" : "Ubah Bahasa (English)"}</span>
				</button>
			</div>
		</main>
	);
};

export default Profile;

import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthenticatedContext, LanguageContext } from "../../App";

const Header = () => {
	const { language } = useContext(LanguageContext);
	const { authenticated } = useContext(AuthenticatedContext);

	return (
		<header>
			<nav>
				<span className="logo">
					<Link to="/">DINOTEAPP</Link>
				</span>
				<ul>
					{authenticated ? (
						<>
							<li>
								<Link to="/notes">{language === "English" ? "View Notes" : "Lihat Catatan"}</Link>
							</li>
							<li>
								<Link to="/notes/archived">{language === "English" ? "Archived" : "Arsip"}</Link>
							</li>
							<li>
								<Link to="/notes/create">{language === "English" ? "Create" : "Buat Catatan"}</Link>
							</li>
							<li>
								<Link to="/profile" className="button--cta_profile">
									<i className="fa-solid fa-user"></i>
								</Link>
							</li>
						</>
					) : (
						<li>
							<Link to="/login" className="button--cta_login">
								{language === "English" ? "Login" : "Masuk"}
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;

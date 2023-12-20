import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticatedContext, LanguageContext } from "../../App";

const Home = () => {
	const { language } = useContext(LanguageContext);
	const { authenticated } = useContext(AuthenticatedContext);
	const headingRef = useRef(null);

	const navigate = useNavigate();

	useEffect(() => {
		!authenticated && navigate("/login");

		const headingContent =
			language === "English" ? "What are you thinking of?" : "Apa yang ada di pikiran anda?";
		let forward = true;
		let i = 0;

		const headingTextAnimation =
			authenticated &&
			setInterval(() => {
				if (i <= headingContent.length - 1 && forward) {
					i++;
					headingRef.current.innerHTML = headingContent.slice(0, i);

					if (i === headingContent.length - 1) {
						setTimeout(() => {
							i = 0;
							forward = !forward;
						}, 1500);
					}
				} else if (i <= headingContent.length - 1 && !forward) {
					i++;
					headingRef.current.innerHTML = headingContent.slice(0, headingContent.length - i);

					if (i === headingContent.length - 1) {
						setTimeout(() => {
							i = 0;
							forward = !forward;
						}, 1000);
					}
				}
			}, 150);

		return () => {
			authenticated && clearInterval(headingTextAnimation);
		};
	}, []);

	return (
		<main className="home--page">
			<div className="home--page_navigations">
				<h1 ref={headingRef} className="home--page_heading"></h1>
				<Link to="/notes">{language === "English" ? "View Notes" : "Lihat Catatan"}</Link>
				<Link to="/notes/create">{language === "English" ? "Lihat Catatan" : "Buat Catatan"}</Link>
			</div>
		</main>
	);
};

export default Home;

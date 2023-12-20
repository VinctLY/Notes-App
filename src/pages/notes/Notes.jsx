import { useContext } from "react";
import { Link } from "react-router-dom";
import { getActiveNotes, getArchivedNotes } from "../../utils/network-data";
import PropTypes from "prop-types";

import useFetch from "../../hooks/useFetch";
import { LanguageContext } from "../../App";

import LoadingAnimation from "../../components/loadingAnimation";
import NoDataAnimation from "../../components/noDataAnimation";

const Notes = ({ active }) => {
	const { language } = useContext(LanguageContext);

	const {
		isLoading,
		isError,
		data: notes,
	} = active ? useFetch(() => getActiveNotes()) : useFetch(() => getArchivedNotes());

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
		<main className="notes--page">
			<ul className="notes--page_list">
				{notes ? (
					notes.map((item) => {
						const date = new Date(item.createdAt).toLocaleDateString(
							language === "English" ? "en-US" : "id-ID",
							{
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							}
						);

						return (
							<li className="notes--list-item" key={item.id}>
								<div className="list--item_heading item--heading">
									<h2>
										<Link to={item.id}>
											{item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}
											<i className="fa-solid fa-link"></i>
										</Link>
									</h2>
									<span>{date}</span>
								</div>
								<p>{item.body.length > 100 ? item.body.slice(0, 100) + "..." : item.body}</p>
							</li>
						);
					})
				) : (
					<div className="temporary--container">
						<NoDataAnimation />
						<p>
							{language === "English" ? "No item in this list" : "Belum ada catatan untuk saat ini"}
						</p>
					</div>
				)}
			</ul>
		</main>
	);
};

Notes.propTypes = {
	active: PropTypes.bool.isRequired,
};

export default Notes;

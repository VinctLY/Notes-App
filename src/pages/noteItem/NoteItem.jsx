import { useContext } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteNote, archiveNote, unarchiveNote, getNote } from "../../utils/network-data";

import useFetch from "../../hooks/useFetch";
import { LanguageContext } from "../../App";

import LoadingAnimation from "../../components/loadingAnimation";
import NoDataAnimation from "../../components/noDataAnimation";

const NoteItem = ({ active }) => {
	const { language } = useContext(LanguageContext);

	const { noteId } = useParams();
	const { isLoading, isError, data: note } = useFetch(() => getNote(noteId));
	const { refetch: refetchDeleteNote } = useFetch(() => deleteNote(noteId), {
		autoFetch: false,
		navigateAfterFetch: "/notes",
	});
	const { refetch: refetchArchiveNote } = active
		? useFetch(() => archiveNote(noteId), { autoFetch: false, navigateAfterFetch: "/notes" })
		: useFetch(() => unarchiveNote(noteId), { autoFetch: false, navigateAfterFetch: "/notes" });

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

	const date = note
		? new Date(note.createdAt).toLocaleDateString(language === "English" ? "en-US" : "id-ID", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
		  })
		: null;

	return (
		<>
			{note ? (
				<main className="note--page_item">
					<div className="note--item">
						<div className="note--item_heading item--heading">
							<h1>{note.title}</h1>
							<span>{date}</span>
						</div>
						<p>{note.body}</p>
						<div className="note--item_actions">
							<button
								className="action--delete"
								onClick={() => {
									refetchDeleteNote();
								}}>
								<i
									className="fa-solid fa-trash"
									title={language === "English" ? "Delete this note" : "Hapus catatan ini"}></i>
							</button>
							<button
								className="action--archive"
								onClick={() => {
									refetchArchiveNote();
								}}>
								{active ? (
									<i
										className="fa-solid fa-box-archive"
										title={
											language === "English" ? "Archive this note" : "Arsipkan catatan ini"
										}></i>
								) : (
									<i
										className="fa-solid fa-box-open"
										title={
											language === "English" ? "Unarchive this note" : "Pindahkan ke catatan aktif"
										}></i>
								)}
							</button>
						</div>
					</div>
				</main>
			) : (
				<div className="temporary--container">
					<NoDataAnimation />
					<p>No data..</p>
				</div>
			)}
		</>
	);
};

NoteItem.propTypes = {
	active: PropTypes.bool.isRequired,
};

export default NoteItem;

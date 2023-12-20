import { useContext } from "react";
import { addNote } from "../../utils/network-data";
import { LanguageContext } from "../../App";

import useInput from "../../hooks/useInput";
import useFetch from "../../hooks/useFetch";

const CreateNote = () => {
	const { language } = useContext(LanguageContext);

	const [title, setTitle] = useInput("");
	const [body, setBody] = useInput("");

	const { refetch } = useFetch(() => addNote({ title, body }), {
		autoFetch: false,
		navigateAfterFetch: "/notes",
	});

	const canSubmit = !!title && !!body;

	return (
		<main className="page--create_note">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					refetch();
				}}>
				<h1>{language === "English" ? "Create New Note" : "Buat Catatan Baru"}</h1>
				<input
					type="text"
					placeholder={language === "English" ? "Enter a Title..." : "Masukan judul catatan..."}
					value={title}
					onChange={setTitle}
				/>
				<textarea
					placeholder={
						language === "English" ? "Enter Your Note Content..." : "Masukan isi catatan..."
					}
					value={body}
					onChange={setBody}></textarea>
				<button type="submit" disabled={!canSubmit}>
					{language === "English" ? "Create" : "Buat"}
				</button>
			</form>
		</main>
	);
};

export default CreateNote;

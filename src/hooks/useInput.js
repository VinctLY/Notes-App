import { useState } from "react";

export default function useInput(defaultVal = "") {
	const [value, setValue] = useState(defaultVal);
	const onValueChangeHandler = (e) => {
		typeof e === "object" ? setValue(e.target.value) : setValue(e);
	};

	return [value, onValueChangeHandler];
}

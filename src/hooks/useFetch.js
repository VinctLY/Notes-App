import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useFetch(
	fetchFunction,
	options = { autoFetch: true, navigateAfterFetch: false, loader: () => {} }
) {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState(null);
	const navigate = useNavigate();

	const navigateAfter = () => {
		options.navigateAfterFetch &&
			typeof options.navigateAfterFetch === "string" &&
			navigate(options.navigateAfterFetch);
	};

	const fetchData = async () => {
		try {
			const response = await fetchFunction();

			if (response.error)
				throw new Error("An error occurred when trying to get data. Try again later!");

			setIsLoading(false);
			response.data?.length !== 0 ? setData(response.data) : setData(null);

			await options.loader(response);
			navigateAfter();
		} catch (err) {
			setIsLoading(false);
			setIsError(true);
		}
	};

	const refetch = async () => {
		setIsLoading(true);
		await fetchData();
		navigateAfter();
	};

	useEffect(() => {
		options.autoFetch ? fetchData() : setIsLoading(false);
	}, []);

	return { isLoading, isError, data, refetch };
}

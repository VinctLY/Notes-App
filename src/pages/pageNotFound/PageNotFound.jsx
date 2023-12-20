import { Player } from "@lottiefiles/react-lottie-player";
import Not_Found_Animation from "../../assets/Animation - 1703067644588.json";

const PageNotFound = () => {
	return (
		<div className="temporary--container">
			<Player autoplay loop src={Not_Found_Animation} className="animation--page_not_found"></Player>
            <span>Page NOT Found 404 :\</span>
		</div>
	);
};

export default PageNotFound;

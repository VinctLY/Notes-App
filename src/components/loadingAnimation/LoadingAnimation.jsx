import { Player } from "@lottiefiles/react-lottie-player";

import Loading_Animation from "../../assets/Loading_Animation.json";

const LoadingAnimation = (prop) => {
	return (
		<>
			<Player autoplay loop src={Loading_Animation} className="animation--loading_note_data" />
			<span>Loading data.. Please wait!</span>
		</>
	);
};

export default LoadingAnimation;

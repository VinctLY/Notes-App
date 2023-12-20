import { Player } from "@lottiefiles/react-lottie-player";
import No_Data_Animation from "../../assets/Animation - 1703044901308.json";

const NoDataAnimation = () => {
	return <Player autoplay loop src={No_Data_Animation} className="animation--no_data"></Player>;
};

export default NoDataAnimation;

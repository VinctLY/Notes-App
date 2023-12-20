import PropTypes from "prop-types";

import { Player } from "@lottiefiles/react-lottie-player";
import Checked_Animation from "../../assets/Checked_Animation.json";

const CheckedAnimation = ({ styleClass }) => {
	return <Player autoplay keepLastFrame className={styleClass} src={Checked_Animation}></Player>;
};

CheckedAnimation.propTypes = {
	styleClass: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

export default CheckedAnimation;

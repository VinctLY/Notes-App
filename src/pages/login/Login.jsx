import { useContext } from "react";
import { Link } from "react-router-dom";
import { login, putAccessToken } from "../../utils/network-data";

import { AuthenticatedContext, LanguageContext } from "../../App";

import useInput from "../../hooks/useInput";
import useFetch from "../../hooks/useFetch";

const Login = () => {
	const [inputEmail, setInputEmail] = useInput("");
	const [inputPassword, setInputPassword] = useInput("");

	const { language } = useContext(LanguageContext);
	const { setAuthenticated } = useContext(AuthenticatedContext);

	const loader = (data) => {
		putAccessToken(data.data.accessToken);
		setAuthenticated(localStorage.getItem("accessToken"));
	};

	const { refetch } = useFetch(() => login({ email: inputEmail, password: inputPassword }), {
		autoFetch: false,
		navigateAfterFetch: "/",
		loader,
	});

	const canSubmit = inputEmail && inputPassword;

	return (
		<>
			<main className="form--input_n_login">
				<form
					className="page--login"
					onSubmit={(e) => {
						e.preventDefault();

						refetch();

						setInputEmail("");
						setInputPassword("");
					}}>
					<h1>{language === "English" ? "Login" : "Masuk"}</h1>
					<div className="input--field_n_validator">
						<input
							type="email"
							placeholder="Email"
							id="email"
							name="email"
							autoComplete="email"
							value={inputEmail}
							onChange={setInputEmail}
						/>
					</div>
					<div className="input--field_n_validator">
						<input
							type="password"
							placeholder="Password"
							value={inputPassword}
							onChange={setInputPassword}
						/>
					</div>
					<button type="submit" disabled={!canSubmit}>
						Login
					</button>
					<p className="navigate--user-form">
						Don't have any account, yet? Click here to{" "}
						<Link to="/register">
							<u>Register!</u>
						</Link>
					</p>
				</form>
			</main>
		</>
	);
};

export default Login;

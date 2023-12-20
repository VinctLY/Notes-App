import { useContext } from "react";
import validator from "validator";
import { Link } from "react-router-dom";
import { register } from "../../utils/network-data";
import { LanguageContext } from "../../App";

import useInput from "../../hooks/useInput";
import useFetch from "../../hooks/useFetch";

import CheckedAnimation from "../../components/checkedAnimation";

const Register = () => {
	const { language } = useContext(LanguageContext);

	const [inputName, setInputName] = useInput("");
	const [inputEmail, setInputEmail] = useInput("");
	const [inputPassword, setInputPassword] = useInput("");
	const [inputConfirmationPassword, setInputConfirmationPassword] = useInput("");

	const { refetch } = useFetch(
		() => register({ name: inputName, email: inputEmail, password: inputConfirmationPassword }),
		{ autoFetch: false, navigateAfterFetch: "/login" }
	);

	const nameValidator = () => {
		if (inputName !== "") {
			if (inputName.length <= 2)
				return (
					<span className="input--state input--warning">
						{language === "English"
							? "Name field must not be an initial!"
							: "Bagian nama tidak boleh berupa inisial!"}
					</span>
				);
			else if (validator.isAlpha(inputName)) return true;
			else {
				return (
					<span className="input--state input--warning">
						{language === "English"
							? "Name field must not contain numbers/symbols!"
							: "Bagian nama tidak boleh menggunakan angka/simbol!"}
					</span>
				);
			}
		}
		return false;
	};
	const isNameValid = nameValidator() && typeof nameValidator() === "boolean";

	const emailValidator = () => {
		if (inputEmail !== "") {
			if (validator.isEmail(inputEmail)) return true;
			else
				return (
					<span className="input--state input--warning">
						{language === "English"
							? "Please enter a valid email!"
							: "Masukan email dengan format yang benar!"}
					</span>
				);
		}
		return false;
	};
	const isEmailValid = emailValidator() && typeof emailValidator() === "boolean";

	const passwordValidator = () => {
		if (inputPassword !== "") {
			const points = validator.isStrongPassword(inputPassword, {
				returnScore: true,
			});

			if (points <= 20) {
				return (
					<span>
						Status:{" "}
						<span className="input--state input--warning">
							{language === "English" ? "Weak" : "Lemah"} ❌
						</span>
					</span>
				);
			} else if (points > 20 && points < 40) {
				return (
					<span>
						Status: <span className="input--state input--password_status_medium">Medium 👍</span>
					</span>
				);
			} else if (points >= 40) {
				return true;
			}
		}
		return false;
	};
	const isPasswordValid = passwordValidator() && typeof passwordValidator() === "boolean";

	const confirmationPasswordValidator = () => {
		if (inputConfirmationPassword !== "") {
			if (inputConfirmationPassword === inputPassword) return true;
			else
				return (
					<span className="input--state input--warning">
						{language === "English"
							? "Confirmation field must be the same as password field!"
							: "Bagian konfirmasi kata sandi harus sama dengan bagian kata sandi!"}
					</span>
				);
		}
		return false;
	};
	const isConfirmationPasswordValid =
		confirmationPasswordValidator() && typeof confirmationPasswordValidator() === "boolean";

	const canSubmit = isNameValid && isEmailValid && isPasswordValid && isConfirmationPasswordValid;

	return (
		<>
			<main className="form--input_n_login">
				<form
					className="page--login"
					onSubmit={(e) => {
						e.preventDefault();

						canSubmit && refetch();
					}}>
					<h1>{language === "English" ? "Register" : "Buat Akun"}</h1>
					<div className="input--field_n_validator">
						<input
							type="text"
							placeholder={language === "English" ? "Enter your name" : "Masukkan nama anda"}
							id="name"
							name="name"
							autoComplete="name"
							value={inputName}
							onChange={setInputName}
						/>
						{nameValidator()}
						{isNameValid && <CheckedAnimation styleClass={"input--state_success"} />}
					</div>
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
						{emailValidator()}
						{isEmailValid && <CheckedAnimation styleClass={"input--state_success"} />}
					</div>
					<div className="input--field_n_validator">
						<input
							type="password"
							placeholder={language === "English" ? "Password" : "Kata sandi"}
							value={inputPassword}
							onChange={setInputPassword}
						/>
						{passwordValidator()}
						{isPasswordValid && (
							<span>
								Status:{" "}
								<span className="input--state input--password_status_valid">
									{language === "English" ? "Strong" : "Kuat"} 👍
								</span>
							</span>
						)}
					</div>
					<div className="input--field_n_validator">
						<input
							type="password"
							placeholder={
								language === "English" ? "Confirmation Password" : "konfirmasi kata sandi"
							}
							value={inputConfirmationPassword}
							onChange={setInputConfirmationPassword}
						/>
						{confirmationPasswordValidator()}
						{isConfirmationPasswordValid && (
							<CheckedAnimation styleClass={"input--state_success"} />
						)}
					</div>
					<button type="submit" disabled={!canSubmit}>
						{language === "English" ? "Sign Up" : "Buat Akun"}
					</button>
					<p className="navigate--user-form">
						{language === "English"
							? "Already have an account? Click here to"
							: "Sudah punya akun? Masuk ke sini untuk"}{" "}
						<Link to="/login">
							<u>{language === "English" ? "Login!" : "Masuk!"}</u>
						</Link>
					</p>
				</form>
			</main>
		</>
	);
};

export default Register;

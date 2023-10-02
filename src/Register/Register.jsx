import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import auth from "../firebase/firebase.config";

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const handelRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password);
        setErrorMessage('');
        setSuccess('');
        if (password.length < 6) {
            setErrorMessage("password should be at least 6 ");
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setErrorMessage('Your password should have ai least one upper case characters.');
            return;
        }
        else if(!accepted){
            setErrorMessage('Please accept our terms and conditions!')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result);
                setSuccess("user created success!");
            })
            .catch(error => {
                console.log(error);
                // const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage)
            })
    }
    return (
        <div >
            <div className="mx-auto w-1/2">
                <div className="text-3xl mb-8">please register</div>
                <form onSubmit={handelRegister}>
                    <input className="mb-4 w-full py-3 px-4" type="email" name="email" id="" placeholder="Email Address" required />
                    <br />
                    <div className="mb-4 relative">
                        <input className=" w-full py-3 px-4" type={showPassword ? "text" : "password"} name="password" id="" placeholder="Password" required />
                        <span className="absolute top-3 right-2" onClick={() => setShowPassword(!showPassword)}>{
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }</span>
                    </div>
                    <br />
                    <div className="ml-2 mb-3">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept our <a href="">Terms and Conditions</a> </label>
                    </div>
                    <br />
                    <button className="btn btn-secondary mb-4 w-full py-3 px-4">Register</button>
                </form>
                {
                    errorMessage && <p className="text-3xl text-red-600">{errorMessage}</p>
                }
                {
                    success && <p className=" text-3xl text-green-600">{success}</p>
                }
                <p>Already have an account? <Link to="/login">login</Link></p>
            </div>
        </div>
    );
};

export default Register;
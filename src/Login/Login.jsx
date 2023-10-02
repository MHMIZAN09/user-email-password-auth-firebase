import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../firebase/firebase.config";
const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState();
    const emailRef = useRef(null);
    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
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

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess("user login success!");
            })
            .catch(error => {
                console.log(error.message);
                const errorMessage = error.message;
                setErrorMessage(errorMessage)
            })
    }
    const handleForgotPassword = (e) => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('email reset', emailRef.current.value);
        }
        else if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-0.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log("please write a valid email");
        }
        sendPasswordResetEmail(auth,email)
        .then(() =>{
            alert('please check your email');
        })
        .catch(error =>{
            console.log(error.message);
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input

                                    type="text"
                                    name="email"
                                    ref={emailRef}
                                    placeholder="email"
                                    className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a onClick={handleForgotPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {
                            errorMessage && <p className="text-3xl text-red-600">{errorMessage}</p>
                        }
                        {
                            success && <p className=" text-3xl text-green-600">{success}</p>
                        }
                        <p>New to this website Please <Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
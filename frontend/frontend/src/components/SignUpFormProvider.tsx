import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const SignUpFormProvider = () => {
    const navigate = useNavigate();

    const [postInputs, setPostsInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const buttonStyle = {
        backgroundColor: 'rgb(58, 103, 179)',
        color: 'white',
        fontWeight: 'bold',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostsInputs(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateEmail = (email: string) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        return isValid;
    };

    async function sendRequest() {
        const { email } = postInputs;
        if (!validateEmail(email)) {
            // If email is not valid, return early
            alert("Invalid email format");
            return;
        }

        try {
            const url = `${BACKEND_URL}/api/v1/user/signup`;
            console.log(url);
            const response = await axios.post(url, postInputs);
            if (response.status === 200) {
                const jwt = response.data.jwt;
                localStorage.setItem("token", jwt);
                navigate("/blogs");
            } else {
                throw new Error("Unexpected response status: " + response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("Incorrect Inputs");
        }
    }

    return (
        <>
            <div className="h-screen flex justify-center flex-col">
                <div className="flex justify-center flex-col items-center">
                    <div className="text-3xl font-extrabold">Create an Account</div>
                    <div>
                        Already have an Account? <Link className="underline" to="/signin">SignIn</Link>
                    </div>
                </div>

                <div className="flex justify-center flex-col items-center mt-3">
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={postInputs.firstName}
                            onChange={handleChange}
                            className="bg-blue-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 block p-2.5 mt-5"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={postInputs.lastName}
                            onChange={handleChange}
                            className="bg-blue-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 block p-2.5 mt-5"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={postInputs.email}
                            onChange={handleChange}
                            className={`bg-blue-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 block p-2.5 mt-5`}
                            required
                        />
                        
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={postInputs.password}
                            onChange={handleChange}
                            className="bg-blue-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 block p-2.5 mt-5"
                            required
                        />
                        <span>Note: password should be of min 8 characters</span>
                    </div>

                    <button onClick={sendRequest}
                        type="submit"
                        style={buttonStyle}
                        className="rounded-lg focus:outline-none focus:shadow-outline mt-9 w-80"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </>
    );
};

export default SignUpFormProvider;

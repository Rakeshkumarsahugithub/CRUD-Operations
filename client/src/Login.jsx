import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await axios.post(
                'https://crud-operations-udfx.onrender.com/auth/login',
                { email, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            alert(result.data.message);
            setAuth(true);
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                console.error("Error during login:", error);
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <h1 className="text-center">Login</h1>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Enter Your Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Enter Your Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-primary w-100" onClick={handleLogin}>LOGIN</button>
                </div>
            </div>
        </div>
    );
};

export default Login;



          



 

    

// Key Features:
// State Management:

// email and password are managed using useState.
// These state variables store the input values typed by the user.
// Login API Request:

// Uses axios.post to send a request to the backend with user credentials.
// Includes withCredentials: true to handle sessions/cookies securely.
// Error Handling:

// Displays server-provided error messages (if any) or a generic error message if something goes wrong.
// Authentication State Update:

// The setAuth(true) updates the authentication status in the parent component or global state.
// Navigation:

// After a successful login, the user is redirected to the /home page using navigate('/home').
// Responsive and Secure Form:

// The type="email" ensures basic email validation.
// The type="password" masks the password for security.
// Reusability:

// The setAuth prop allows the component to work with different authentication flows and manage authentication state externally.
// This implementation ensures a clean and functional login flow, handling user inputs, server communication, and navigation efficiently.
// import React, { useState } from "react";
// import axios from "axios";
// import ReCAPTCHA from "react-google-recaptcha";

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [captchaToken, setCaptchaToken] = useState('');

//   const handleCaptchaChange = (value) => {
//     setCaptchaToken(value);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // Ensure CAPTCHA was completed
//     if (!captchaToken) {
//       alert("Please complete the CAPTCHA");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/auth/login", {
//         email,
//         password,
//         captchaToken,
//       });

//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error logging in:", error?.response?.data?.message || error.message);
//       alert("Error logging in");
//     }
//   };

//   return (
//     <div className="regi">
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           className="lab"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           className="lab"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <ReCAPTCHA
//           sitekey="YOUR_SITE_KEY" // Replace with your site key from Google reCAPTCHA
//           onChange={handleCaptchaChange}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;








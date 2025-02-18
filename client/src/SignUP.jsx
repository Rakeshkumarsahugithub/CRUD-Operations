// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const navigate = useNavigate();

//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const collectData = async () => {
//     if (!validatePassword(password)) {
//       alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     try {
//       const result = await axios.post(
//         "https://crud-operations-udfx.onrender.com/auth/signup",
//         { name, email, password, confirmPassword },
//         { withCredentials: true }
//       );
      
//       alert(result.data.message);
//       setName("");
//       setEmail("");
//       setPassword("");
//       setConfirmPassword("");
//       navigate("/login");
//     } catch (error) {
//       console.error("Error during signup:", error.response || error);
//       alert(error.response?.data?.message || "Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-12 col-md-6">
//           <h1 className="text-center">Register</h1>

//           <div className="mb-3">
//             <label className="form-label">Enter Your Name:</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Enter Your Email:</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Enter Your Password:</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">Confirm Your Password:</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>

//           <button className="btn btn-success w-100" onClick={collectData}>SIGN UP</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp; // Export the SignUp component for use in other parts of the app.





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // const collectData = async () => {
  //   if (!validatePassword(password)) {
  //     alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match.");
  //     return;
  //   }

  //   try {
  //     const result = await axios.post(
  //       "https://crud-operations-eight-delta.vercel.app/auth/signup",
  //       { name, email, password, confirmPassword },
  //       // { withCredentials: true }
  //           credentials: "include", // Important to send cookies with fetch
  //     );
      
  //     alert(result.data.message);
  //     setName("");
  //     setEmail("");
  //     setPassword("");
  //     setConfirmPassword("");
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Error during signup:", error.response || error);
  //     alert(error.response?.data?.message || "Signup failed. Please try again.");
  //   }
  // };

      const collectData = async () => {
  if (!validatePassword(password)) {
    alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch("https://crud-operations-eight-delta.vercel.app/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, confirmPassword }),
      credentials: "include", // Important to send cookies with fetch
    });

    const result = await response.json();
    alert(result.message);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/login");
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Signup failed. Please try again.");
  }
};


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <h1 className="text-center">Register</h1>

          <div className="mb-3">
            <label className="form-label">Enter Your Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Enter Your Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Enter Your Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Your Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100" onClick={collectData}>SIGN UP</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp; // Export the SignUp component for use in other parts of the app.



// State Management: The useState hook is used to store the values of the input fields.
// Validation: The validatePassword function ensures the password meets security criteria.
// Error Handling: The try-catch block handles API errors gracefully, providing feedback to the user.
// Navigation: After successful signup, the user is redirected to the login page using navigate.
// Form Reset: The input fields are cleared after a successful signup.


// import React, { useState } from "react";
// import axios from "axios";
// import ReCAPTCHA from "react-google-recaptcha";

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [captchaToken, setCaptchaToken] = useState('');

//   const handleCaptchaChange = (value) => {
//     setCaptchaToken(value);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     // Ensure passwords match
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     // Ensure CAPTCHA was completed
//     if (!captchaToken) {
//       alert("Please complete the CAPTCHA");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/auth/signup", {
//         name,
//         email,
//         password,
//         confirmPassword,
//         captchaToken,
//       });

//       alert(response.data.message);
//     } catch (error) {
//       console.error("Error signing up:", error?.response?.data?.message || error.message);
//       alert("Error signing up");
//     }
//   };

//   return (
//     <div>
//       <h1>Signup</h1>
//       <form onSubmit={handleSignup}>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Name"
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Confirm Password"
//         />
//         <ReCAPTCHA
//           sitekey="YOUR_SITE_KEY" // Replace with your site key from Google reCAPTCHA
//           onChange={handleCaptchaChange}
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;


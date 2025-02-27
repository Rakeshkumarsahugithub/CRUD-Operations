
            {/* Conditionally render Footer only if not on the Home page {location.pathname !== "/home" && location.pathname !== "/products" && <Footer />}   {location.pathname !== "/home" && <Footer />}  {!["/home", "/products"].includes(location.pathname) && <Footer />} */}

            // import React, { useState, useEffect } from "react";
            // import { Routes, Route, Navigate, useLocation } from "react-router-dom";
            // import axios from "axios";
            // import 'bootstrap/dist/css/bootstrap.min.css';

            // import "./App.css";
            // import Footer from "./Footer";
            // import ThemeMode from "../ThemeMode";
            // import SignUp from "./SignUP";
            // import Login from "./Login";
            // import AddProduct from "./AddProduct";
            // import ProductList from "./Productlist"
            // import UpdateProduct from "./UpdateProduct";
            // import Nav from "./Nav";
            // import Home from "./Home";
            
            // const App = () => {
            //     const [isAuthenticated, setIsAuthenticated] = useState(false);
            //     const [isLoading, setIsLoading] = useState(true);
            //     const location = useLocation();
            
            //     useEffect(() => {
            //         const checkAuth = async () => {
            //             try {
            //                 const response = await axios.get("https://crud-operations-udfx.onrender.com/auth/check", { withCredentials: true });
            //                 setIsAuthenticated(response.data.isAuthenticated);
            //             } catch (error) {
            //                 setIsAuthenticated(false);
            //             } finally {
            //                 setIsLoading(false);
            //             }
            //         };
            //         checkAuth();
            //     }, []);
            
            //     const handleLogout = async () => {
            //         try {
            //             await axios.post("https://crud-operations-udfx.onrender.com/auth/logout", {}, { withCredentials: true });
            //             setIsAuthenticated(false);
            //         } catch (error) {
            //             console.error("Error logging out:", error);
            //             alert("Failed to log out. Please try again.");
            //         }
            //     };
            
            //     if (isLoading) {
            //         return <div>Loading...</div>;
            //     }
            
            //     return (
            //         <div className="app">
            //             <ThemeMode />
            //             <Nav isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            //             <Routes>
            //                 <Route path="/signup" element={<SignUp />} />
            //                 <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
            //                 {isAuthenticated ? (
            //                     <>
            //                         <Route path="/home" element={<Home />} />
            //                         <Route path="/products" element={<ProductList />} />
            //                         <Route path="/add-product" element={<AddProduct />} />
            //                         <Route path="/update/:id" element={<UpdateProduct />} />
            //                         <Route path="/" element={<Navigate to="/products" replace />} />
            //                     </>
            //                 ) : (
            //                     <Route path="*" element={<Navigate to="/login" replace />} />
            //                 )}
            //             </Routes>
            //             {location.pathname !== "/home" && <Footer />}
            //         </div>
            //     );
            // };
            
            // export default App;



 import React, { useState, useEffect } from "react";
            import { Routes, Route, Navigate, useLocation } from "react-router-dom";
            import axios from "axios";
            import 'bootstrap/dist/css/bootstrap.min.css';

            import "./App.css";
            import Footer from "./Footer";
            import ThemeMode from "../ThemeMode";
            import SignUp from "./SignUP";
            import Login from "./Login";
            import AddProduct from "./AddProduct";
            import ProductList from "./Productlist"
            import UpdateProduct from "./UpdateProduct";
            import Nav from "./Nav";
            import Home from "./Home";
            
            const App = () => {
                const [isAuthenticated, setIsAuthenticated] = useState(false);
                const [isLoading, setIsLoading] = useState(true);
                const location = useLocation();
            
                useEffect(() => {
                    const checkAuth = async () => {
                        try {
                            const response = await axios.get("https://crud-operations-rte5.vercel.app/auth/check", { withCredentials: true });
                            setIsAuthenticated(response.data.isAuthenticated);
                        } catch (error) {
                            setIsAuthenticated(false);
                        } finally {
                            setIsLoading(false);
                        }
                    };
                    checkAuth();
                }, []);
            
                const handleLogout = async () => {
                    try {
                        await axios.post("https://crud-operations-rte5.vercel.app/auth/logout", {}, { withCredentials: true });
                        setIsAuthenticated(false);
                    } catch (error) {
                        console.error("Error logging out:", error);
                        alert("Failed to log out. Please try again.");
                    }
                };
            
                if (isLoading) {
                    return <div>Loading...</div>;
                }
            
                return (
                    <div className="app">
                        <ThemeMode />
                        <Nav isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                        <Routes>
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
                            {isAuthenticated ? (
                                <>
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/products" element={<ProductList />} />
                                    <Route path="/add-product" element={<AddProduct />} />
                                    <Route path="/update/:id" element={<UpdateProduct />} />
                                    <Route path="/" element={<Navigate to="/products" replace />} />
                                </>
                            ) : (
                                <Route path="*" element={<Navigate to="/login" replace />} />
                            )}
                        </Routes>
                        {location.pathname !== "/home" && <Footer />}
                    </div>
                );
            };
            
            export default App;
            
            


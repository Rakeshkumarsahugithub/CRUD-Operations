// import React, { useState } from "react"; // Import React and the useState hook for state management.
// import axios from "axios"; // Import axios for making HTTP requests.

// const AddProduct = () => { // Define the `AddProduct` functional component.
//     const [name, setName] = useState(''); // State variable for the product name.
//     const [price, setPrice] = useState(''); // State variable for the product price.
//     const [category, setCategory] = useState(''); // State variable for the product category.
//     const [company, setCompany] = useState(''); // State variable for the product company.
//     const [error, setError] = useState(false); // State variable to track validation errors.

//     const addProduct = async () => { // Function to handle adding a product.
//         // Check if all fields are filled; if not, show validation errors.
//         if (!name || !price || !category || !company) {
//             setError(true); // Set error to true to display validation messages.
//             return; // Stop further execution until the form is valid.
//         }

//         try {
//             const result = await axios.post( // Send a POST request to the backend to add a new product.
//                 "http://localhost:5000/products", // Backend endpoint for adding a product.
//                 { name, price, category, company }, // Pass the product details in the request body.
//                 { withCredentials: true } // Include cookies in the request for authentication.
//             );

//             alert("Product added successfully!"); // Notify the user of successful product addition.

//             // Clear the input fields after adding the product.
//             setName('');
//             setPrice('');
//             setCategory('');
//             setCompany('');
//             setError(false); // Reset the error state.
//         } catch (error) {
//             console.error("Error adding product:", error); // Log the error for debugging.
//             alert("Failed to add product. Please try again."); // Notify the user of the failure.
//         }
//     };

//     return (
//         <div className="addproduct"> {/* Wrapper div for styling */}
//             <h1>Add Product...</h1> {/* Heading for the form */}
            
//             {/* Input for Product Name */}
//             <input
//                 type="text"
//                 placeholder="Enter product name" // Placeholder text
//                 className="inputBx" // CSS class for styling
//                 value={name} // Bind input value to the `name` state
//                 onChange={(e) => setName(e.target.value)} // Update state on input change
//             />
//             {error && !name && <span id="popup">Enter valid name</span>} {/* Validation message */}

//             {/* Input for Product Price */}
//             <input
//                 type="text"
//                 placeholder="Enter product price" // Placeholder text
//                 className="inputBx" // CSS class for styling
//                 value={price} // Bind input value to the `price` state
//                 onChange={(e) => setPrice(e.target.value)} // Update state on input change
//             />
//             {error && !price && <span id="popup">Enter valid price</span>} {/* Validation message */}

//             {/* Input for Product Category */}
//             <input
//                 type="text"
//                 placeholder="Enter product category" // Placeholder text
//                 className="inputBx" // CSS class for styling
//                 value={category} // Bind input value to the `category` state
//                 onChange={(e) => setCategory(e.target.value)} // Update state on input change
//             />
//             {error && !category && <span id="popup">Enter valid category</span>} {/* Validation message */}

//             {/* Input for Product Company */}
//             <input
//                 type="text"
//                 placeholder="Enter product company" // Placeholder text
//                 className="inputBx" // CSS class for styling
//                 value={company} // Bind input value to the `company` state
//                 onChange={(e) => setCompany(e.target.value)} // Update state on input change
//             />
//             {error && !company && <span id="popup">Enter valid company</span>} {/* Validation message */}

//             {/* Button to submit the form */}
//             <button className="prdbtn" onClick={addProduct}>Add Product</button> {/* On click, call `addProduct` */}
//         </div>
//     );
// };

// export default AddProduct; // Export the component to be used in other parts of the application.



import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const addProduct = async () => {
        setError(false);
        setSuccessMessage('');

        if (!name || !price || isNaN(price) || !category || !company) {
            setError(true);
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                "http://localhost:5009/products",
                { name, price, category, company },
                { withCredentials: true }
            );

            setSuccessMessage("Product added successfully!");
            setName('');
            setPrice('');
            setCategory('');
            setCompany('');
        } catch (error) {
            console.error("Error adding product:", error);
            setSuccessMessage("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Add Product</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {error && !name && <small className="text-danger">Enter valid name</small>}
            </div>

            <div className="mb-3">
                <input
                    type="number"
                    className="form-control"
                    placeholder="Enter product price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                {error && (!price || isNaN(price)) && <small className="text-danger">Enter a valid numeric price</small>}
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                {error && !category && <small className="text-danger">Enter valid category</small>}
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                {error && !company && <small className="text-danger">Enter valid company</small>}
            </div>

            <button className="btn btn-primary" onClick={addProduct} disabled={loading}>
                {loading ? "Adding..." : "Add Product"}
            </button>

            {successMessage && <div className="mt-3 alert alert-info">{successMessage}</div>}
        </div>
    );
};

export default AddProduct;
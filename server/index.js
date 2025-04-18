// import express from 'express';
// import bcrypt from 'bcryptjs';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';

// import { Product } from './Product.js';
// import { myUser } from './User.js'; // Importing myUser instead of User

// // Load environment variables
// dotenv.config();

// // Create Express app
// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//     origin: "http://localhost:5173", // Frontend port
//     credentials: true
// }));

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Signup route
// app.post('/auth/signup', async (req, res) => {
//     try {
//         const { name, email, password, confirmPassword } = req.body;

//         // Check if the email already exists
//         const existingUserByEmail = await myUser.findOne({ email });
//         if (existingUserByEmail) {
//             return res.status(400).json({ message: 'Email already exists' });
//         }

//         // Check if password and confirmPassword match
//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: 'Passwords do not match' });
//         }

//         // Validate password strength
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         if (!passwordRegex.test(password)) {
//             return res.status(400).json({
//                 message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
//             });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create and save new user
//         const newUser = new myUser({
//             name,
//             email,
//             password: hashedPassword,
//             confirmPassword // This can be omitted in the actual model, as it's just used for validation
//         });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// // Login route
// app.post('/auth/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find user by email
//         const user = await myUser.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: "User is not registered" });
//         }

//         // Compare password
//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) {
//             return res.status(400).json({ message: 'Password is incorrect' });
//         }

//         // Create JWT token
//         const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: '2h' });

//         // Send token in cookie
//         res.cookie('token', token, { httpOnly: true, maxAge: 7200000 }); // 2 hours
//         return res.json({ status: true, message: "Login successfully" });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// // Add product route
// app.post('/product/add', async (req, res) => {
//     try {
//         const { name, price, category, company, userId } = req.body;

//         // Create a new product
//         const newProduct = new Product({
//             name,
//             price,
//             category,
//             company,
//             userId // userId should be the ObjectId of the user
//         });

//         // Save the product
//         await newProduct.save();
//         res.status(201).json({ message: 'Product added successfully' });
//     } catch (error) {
//         console.error('Error adding product:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // Get all products route
// app.get('/products', async (req, res) => {
//     try {
//         const products = await Product.find().populate('userId', 'name email'); // Populate the user information
//         res.json(products);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// import express from "express";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config.js";
// import User from "./User.js";
// import Product from "./Products.js";


// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5007;

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5174",
//     credentials: true,
//   })
// );

// // Database Connection
// connectDB().catch((err) => {
//   console.error("Database connection failed:", err.message);
//   process.exit(1);
// });

// // Auth Middleware
// const authMiddleware = (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }
//     try {
//       const decoded = jwt.verify(token, process.env.KEY);
//       req.user = decoded; // Attach user info to the request object
//       next();
//     } catch (error) {
//       console.error("Token verification error:", error);
//       res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }
//   };

// // Routes

// // Signup Route
// app.post("/auth/signup", async (req, res) => {
//   try {
//     const { name, email, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Signup error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Login Route
// app.post("/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.KEY, { expiresIn: "2h" });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 7200000, // 2 hours
//     });
//     res.json({ message: "Login successful" });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Logout Route
// app.post("/auth/logout", (req, res) => {
//   res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
//   res.json({ message: "Logged out successfully" });
// });

// // Authentication Check Route
// app.get("/auth/check", (req, res) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.json({ isAuthenticated: false });
//   }

//   try {
//     jwt.verify(token, process.env.KEY);
//     return res.json({ isAuthenticated: true });
//   } catch {
//     return res.json({ isAuthenticated: false });
//   }
// });

// // Get User Info Route
// app.get("/user", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     res.json({ name: user.name });
//   } catch (error) {
//     console.error("Error fetching user info:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Get Products Route
// app.get("/products", authMiddleware, async (req, res) => {
//   try {
//     const products = await Product.find({ userId: req.user.id });
//     res.json(products);
//   } catch (error) {
//     console.error("Get products error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Add Product Route
// app.post("/products", authMiddleware, async (req, res) => {
//   try {
//     const { name, price, category, company } = req.body;

//     const product = new Product({
//       name,
//       price,
//       category,
//       company,
//       userId: req.user.id, // Attach the user ID to the product
//     });
//     await product.save();

//     res.status(201).json({ message: "Product added successfully" });
//   } catch (error) {
//     console.error("Add product error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Get Product by ID Route
// app.get("/products/:id", authMiddleware, async (req, res) => {
//     const { id } = req.params;
  
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid product ID" });
//     }
  
//     try {
//       const product = await Product.findOne({ _id: id, userId: req.user.id });
//       if (!product) {
//         return res.status(404).json({ message: "Product not found or not authorized" });
//       }
  
//       res.status(200).json(product);
//     } catch (error) {
//       console.error("Error fetching product by ID:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
  


// // Update Product Route
// app.put("/products/:id", authMiddleware, async (req, res) => {
//     const { id } = req.params;
//     const { name, price, category, company } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: "Invalid product ID" });
//     }

//     try {
//         // Validate input
//         if (!name || !price || !category || !company) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Find the product by ID and ensure the user is authorized
//         const product = await Product.findOne({ _id: id, userId: req.user.id });
//         if (!product) {
//             return res.status(404).json({ message: "Product not found or not authorized" });
//         }

//         // Update product fields
//         product.name = name;
//         product.price = price;
//         product.category = category;
//         product.company = company;

//         // Save updated product to database
//         await product.save();
//         res.status(200).json({ message: "Product updated successfully", updatedProduct: product });
//     } catch (error) {
//         console.error("Update product error:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// // Delete Product Route
// app.delete("/products/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;

//     const product = await Product.findOneAndDelete({ _id: id, userId: req.user.id });
//     if (!product) {
//       return res.status(404).json({ message: "Product not found or not authorized" });
//     }

//     res.status(200).json({ message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Search Products Route
// app.get("/search/:key", authMiddleware, async (req, res) => {
//     const key = req.params.key.trim(); // Ensure no trailing spaces
//     if (!key) {
//       return res.status(400).json({ success: false, message: "Search key is required" });
//     }
  
//     try {
//       const products = await Product.find({
//         userId: req.user.id, // Ensure user-specific search
//         $or: [
//           { name: { $regex: key, $options: "i" } },
//           { category: { $regex: key, $options: "i" } },
//           { company: { $regex: key, $options: "i" } },
//         ],
//       });
  
//       // Handle no results found
//       if (!products || products.length === 0) {
//         return res.status(200).json({ success: true, message: "No products found", data: [] });
//       }
  
//       // Respond with the found products
//       res.status(200).json({ success: true, message: "Products fetched successfully", data: products });
//     } catch (error) {
//       console.error("Search products error:", error);
//       res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
//   });
  
  

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config.js";
import User from "./User.js";
import Product from "./Products.js";
import session from "express-session";
import MongoStore from "connect-mongo";  // MongoDB store for sessions


const app = express();
const PORT = process.env.PORT || 5009;

// Middleware   "https://rakesh-crud-operation.onrender.com",
const corsOptions = {
  origin: "https://rakeshcrud-operations.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


// Handle Cache-Control for all responses (optional)
app.use((req, res, next) => {
  res.header("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  next();
});

// Session Store (MongoDB for persistence)
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI, // Your MongoDB URI
  collectionName: "sessions",
});

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET, // Set a session secret (should be in env)
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: process.env.NODE_ENV === "production", httpOnly: true },
//     store: sessionStore, // Store sessions in MongoDB
//   })
// );
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Set a session secret (should be in env)
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookie in production (HTTPS)
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day session timeout
    },
    store: sessionStore, // Store sessions in MongoDB
  })
);

// Add CORS headers and content security headers
app.use((req, res, next) => {
  res.setHeader("x-content-type-options", "nosniff");  // Prevent content-type sniffing
  res.setHeader("Access-Control-Allow-Origin", "https://rakeshcrud-operations.vercel.app"); // Frontend URL
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies)
  next();
});


// Database Connection
connectDB().catch((err) => {
  console.error("Database connection failed:", err.message);
  process.exit(1);
});

// Auth Middleware (using session)
const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized: No session found" });
  }
  next();
};

// Routes

// Signup Route
app.post("/auth/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login Route
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.userId = user._id;  // Save user ID in session
    req.session.email = user.email;  // Save email (optional)
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Logout Route
app.post("/auth/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to logout" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.json({ message: "Logged out successfully" });
  });
});

// Authentication Check Route
app.get("/auth/check", (req, res) => {
  if (!req.session.userId) {
    return res.json({ isAuthenticated: false });
  }
  res.json({ isAuthenticated: true });
});

// Get User Info Route
app.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    res.json({ name: user.name });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Products Route
app.get("/products", authMiddleware, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.session.userId });
    res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add Product Route
app.post("/products", authMiddleware, async (req, res) => {
  try {
    const { name, price, category, company } = req.body;

    const product = new Product({
      name,
      price,
      category,
      company,
      userId: req.session.userId, // Attach the user ID to the product
    });
    await product.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Product by ID Route
app.get("/products/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findOne({ _id: id, userId: req.session.userId });
    if (!product) {
      return res.status(404).json({ message: "Product not found or not authorized" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Product Route
app.put("/products/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, price, category, company } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findOne({ _id: id, userId: req.session.userId });
    if (!product) {
      return res.status(404).json({ message: "Product not found or not authorized" });
    }

    product.name = name;
    product.price = price;
    product.category = category;
    product.company = company;

    await product.save();
    res.status(200).json({ message: "Product updated successfully", updatedProduct: product });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete Product Route
app.delete("/products/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({ _id: id, userId: req.session.userId });
    if (!product) {
      return res.status(404).json({ message: "Product not found or not authorized" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Search Products Route
app.get("/search/:key", authMiddleware, async (req, res) => {
  const key = req.params.key.trim();
  if (!key) {
    return res.status(400).json({ success: false, message: "Search key is required" });
  }

  try {
    const products = await Product.find({
      userId: req.session.userId,
      $or: [
        { name: { $regex: key, $options: "i" } },
        { category: { $regex: key, $options: "i" } },
        { company: { $regex: key, $options: "i" } },
      ],
    });

    if (!products || products.length === 0) {
      return res.status(200).json({ success: true, message: "No products found", data: [] });
    }

    res.status(200).json({ success: true, message: "Products fetched successfully", data: products });
  } catch (error) {
    console.error("Search products error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// git add .
// git commit -m "Reinstall dependencies and remove node_modules"
// git push 


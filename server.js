const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const customerRoutes = require("./routes/customerRoutes"); // ✅ Added line

const connectDB = require("./db");

require("dotenv").config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// ✅ CORS configuration to allow Vercel frontend
const allowedOrigins = [
  "http://localhost:3000", // for development
  "https://customer-lilac-ten.vercel.app" // for Vercel deployment
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// middleware
app.use(express.json());

// ✅ Root route to avoid "Cannot GET /" on Render
app.get("/", (req, res) => {
  res.send("🚀 Backend API is running successfully!");
});

// api endpoints
app.use("/images", express.static("upload/images"));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/customers", customerRoutes); // ✅ Added line

// error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    error: message,
  });
});

// connect to db
connectDB();

app.listen(port, () => {
  // console.log(`server is listening at port ${port}.`);
});

const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const customerRoutes = require("./routes/customerRoutes");

const connectDB = require("./db");

require("dotenv").config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
const corsOptions = {
  origin: "https://consultancy-project-vmj1.vercel.app",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// api endpoints
app.use("/images", express.static("upload/images"));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/customers", customerRoutes);

// test route for Render to verify server is running
app.get("/", (req, res) => {
  res.send("API is running successfully! 🚀");
});

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

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

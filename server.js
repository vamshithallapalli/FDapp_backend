const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const merchantRoutes = require("./routes/merchantRoutes");
const bodyParser = require("body-parser");
const restaurantRoutes = require("./routes/restaurantRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 4000;

dotEnv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB coonected successfully!"))
  .catch((error) => console.log(error));
app.use(cors());
app.use(bodyParser.json());

app.use("/merchant", merchantRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/product", productRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

app.use("/", (req, res) => {
  res.send("<h1>Welcome to FoodDeliveryApp</h1>");
});

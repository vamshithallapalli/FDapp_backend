const mongoose = require("mongoose");
const Restaurant = require("./Restaurant");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    require: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },
  image: {
    type: String,
  },
  bestSeller: {
    type: String,
  },
  description: {
    type: String,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

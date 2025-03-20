const mongoose = require("mongoose");
const Product = require("./Product");

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
    unique: true,
  },

  area: {
    type: String,
    required: true,
  },

  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg"],
      },
    ],
  },

  region: {
    type: [
      {
        type: String,
        enum: ["south-indian", "north-indian", "chinese"],
      },
    ],
  },

  offer: {
    type: String,
  },

  image: {
    type: String,
    required: true,
  },

  merchant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;

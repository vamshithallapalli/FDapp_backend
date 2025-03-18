const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  restaurant: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    }
  ]
});

const merchant = mongoose.model("Merchant", merchantSchema);
module.exports = merchant;

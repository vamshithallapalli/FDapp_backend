const Merchant = require("../models/Merchant");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");

dotEnv.config();
const secretKey = process.env.WhatIsYourName;

const merchantRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const merchantEmail = await Merchant.findOne({ email });
    if (merchantEmail) {
      return res.status(400).json({ message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMerchant = new Merchant({
      username,
      email,
      password: hashedPassword,
    });

    await newMerchant.save();

    res.status(201).json({ message: "Merchant Registered Successfully" });
    console.log("registered");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

const merchantLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const merchant = await Merchant.findOne({ email });
    if (!merchant || !(await bcrypt.compare(password, merchant.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ merchantId: merchant._id }, secretKey, {
      expiresIn: "1h",
    });

    const merchantId = merchant._id;

    res.status(200).json({ message: "Login Successful", token, merchantId });
    console.log(email, "this is token", token);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

const getAllMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.find().populate("restaurant");
    res.json({ merchants });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

const getMerchantById = async (req, res) => {
  const merchantId = req.params.id;

  try {
    const merchant = await Merchant.findById(merchantId).populate("restaurant");
    if (!merchant) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    const merchantrestaurantId = merchant.restaurant[0]._id;

    return res.status(200).json({ merchantId, merchantrestaurantId, merchant });
    console.log(merchant, merchantrestaurantId);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

module.exports = {
  merchantRegister,
  merchantLogin,
  getAllMerchants,
  getMerchantById,
};

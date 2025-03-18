const Merchant = require("../models/Merchant");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");

const secretKey = process.env.WhatIsYourName;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    res.status(401).json({ error: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const merchant = await Merchant.findById(decoded.merchantId);

    if (!merchant) {
      return res.status(404).json({ error: "Merchant not found!" });
    }
    req.merchantId = merchant._id;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Invalid Token" });
  }
};

module.exports = verifyToken;
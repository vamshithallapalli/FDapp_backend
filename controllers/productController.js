const Product = require("../models/Product");
const multer = require("multer");
const Restaurant = require("../models/Restaurant");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestseller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "No restaurant  found" });
    }

    const product = new Product({
      productName,
      price,
      category,
      bestseller,
      description,
      image,
      restaurant: restaurant._id,
    });

    const savedProduct = await product.save();
    restaurant.products.push(savedProduct);
    await restaurant.save();
    res.status(200).json({ savedProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

const getProductByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: "no restaurant found" });
    }
    const restaurantName = restaurant.restaurantName;
    const products = await Product.find({ restaurant: restaurantId });
    res.status(200).json({ restaurantName, products });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "no product found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductByRestaurant,
  deleteProductById,
};

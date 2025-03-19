const Restaurant = require("../models/Restaurant");
const Merchant = require("../models/Merchant");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const addRestaurant = async (req, res) => {
  try {
    const { restaurantName, area, offer } = req.body;
    const category = JSON.parse(req.body.category);
    const region = JSON.parse(req.body.region);

    const image = req.file ? req.file.filename : undefined;

    const merchant = await Merchant.findById(req.merchantId);

    if (!merchant) {
      return res.status(404).json({ error: "Merchant not Found" });
    }

    if (merchant.restaurant.length > 0) {
      res
        .status(400)
        .json({ message: "Merchant can have only one Restaurant" });
    }

    const restaurant = new Restaurant({
      restaurantName,
      area,
      category,
      region,
      offer,
      image,
      merchant: merchant._id,
    });

    const savedRestaurant = await restaurant.save();

    const restaurantId = savedRestaurant._id;
    merchant.restaurant.push(savedRestaurant);
    await merchant.save();

    res
      .status(200)
      .json({ message: "Restaurant added successfully", restaurantId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: "no product found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
};

module.exports = {
  addRestaurant: [upload.single("image"), addRestaurant],
  deleteRestaurantById,
};

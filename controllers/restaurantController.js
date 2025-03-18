const Restaurant = require("../models/Restaurant");
const Merchant = require("../models/Merchant");
const multer = require("multer");

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
    const { restaurantName, area, category, region, offer } = req.body;

    const image = req.file ? req.file.filename : undefined;

    const merchant = await Merchant.findById(req.merchantId);

    if (!merchant) {
      return res.status(404).json({ error: "merchant not found" });
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
    merchant.restaurant.push(savedRestaurant);
    await merchant.save();
    res.status(200).json({ message: "Restaurant added successfully" });
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

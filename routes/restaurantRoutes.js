const restaurantController = require("../controllers/restaurantController");
const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/add-restaurant", verifyToken, restaurantController.addRestaurant);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", image / jpeg);
  res.sendFile(Path.join(__dirname, "..", "uploads", imageName));
});

router.delete("/:restaurantId", restaurantController.deleteRestaurantById);

module.exports = router;

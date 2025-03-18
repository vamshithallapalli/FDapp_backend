const productController = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.post("/add-product/:restaurantId", productController.addProduct);
router.get("/:restaurantId/products", productController.getProductByRestaurant);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", image / jpeg);
  res.sendFile(Path.join(__dirname, "..", "uploads", imageName));
});

router.delete('/:productId', productController.deleteProductById);

module.exports = router;

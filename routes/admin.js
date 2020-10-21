const express = require("express");
const {
  ADMIN_DELETE_PRODUCT,
  ADMIN_EDIT_PRODUCT_ID,
  ADMIN_EDIT_PRODUCT,
  ADMIN_ADD_PRODUCT,
  ADMIN_GET_PRODUCTS,
} = require("../constants/pathNames");

const router = express.Router();

const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/adminController");

//GET  /admin/product-page
router.get("/product-page", (req, res, next) => {
  console.log(req.body); //Will show undefined w/o body parser
  res.redirect("/");
});

router.post(ADMIN_DELETE_PRODUCT, postDeleteProduct);

//GET /admin/edit-product
router.get(ADMIN_EDIT_PRODUCT_ID, getEditProduct);

//POST /admin/edit-product
router.post(ADMIN_EDIT_PRODUCT, postEditProduct);

//GET /admin/add-product
router.get(ADMIN_ADD_PRODUCT, getAddProduct);

//Only handle post request here
//POST /admin/add-product
router.post(ADMIN_ADD_PRODUCT, postAddProduct);

//GET /admin/getProducts
router.get(ADMIN_GET_PRODUCTS, getProducts);

module.exports = router;

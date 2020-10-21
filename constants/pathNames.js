exports.ROOT = "/";
exports.LOGIN = "/login";
exports.SIGNUP = "/signup";

exports.PRODUCTS = "/products";
exports.PRODUCT_DETAILS = "/product-details/:productId";

exports.CART = "/cart";
exports.DELETE_CART_ITEM_PRODUCTID = "/cart-item-delete/:productId";

exports.ORDERS = "/orders";
exports.CREATE_ORDER = "/create-order";

exports.ADMIN_ADD_PRODUCT = "/admin/add-product";
exports.ADMIN_DELETE_PRODUCT = "/admin/delete-product";
exports.ADMIN_EDIT_PRODUCT_ID = "/admin/edit-product/:productId";
exports.ADMIN_EDIT_PRODUCT = "/admin/edit-product";
exports.ADMIN_GET_PRODUCTS = "/admin/products";

// ***** THE ORDER OF THE ELEMENTS IN THE ARRAY MATTERS *****
exports.CLOSED_PATHS = [
  this.CREATE_ORDER,
  this.ORDERS,
  this.DELETE_CART_ITEM_PRODUCTID,
  this.CART,
  this.ADMIN_GET_PRODUCTS,
  this.ADMIN_ADD_PRODUCT,
  this.ADMIN_DELETE_PRODUCT,
  this.ADMIN_EDIT_PRODUCT,
  this.ADMIN_EDIT_PRODUCT_ID,
];

exports.OPEN_PATHS = [
  this.LOGIN,
  this.SIGNUP,
  this.PRODUCT_DETAILS,
  this.PRODUCTS,
  this.ROOT, //Always leave this at the end
];

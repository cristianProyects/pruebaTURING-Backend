const router = require("express").Router();
const user = require("../controllers/user");
const shop = require("../controllers/shop");
const component = require("../controllers/component");
const category = require("../controllers/category");
//VALIDATE LOGIN
const login = require("../controllers/login");
const passport = require("passport");
require("../passport");
router.post("/api/login", login);
router.use("/api", passport.authenticate("jwt", { session: false })); //MIDDLEWARE FOR PROTECT ENDPOINTS

//CRUD TABLE USER
router.get("/api/user/select/:id", user.read);
router.post("/api/user/create", user.create);
router.delete("/api/user/remove/:id", user.remove);
router.put("/api/user/update/:id", user.update);
//CRUD TABLE SHOP
router.get("/api/shop/select/:id", shop.read);
router.post("/api/shop/create", shop.create);
router.delete("/api/shop/remove/:id", shop.remove);
// router.put("/api/shop/update/:id", shop.update);
//CRUD TABLE COMPONENT
router.get("/api/component/selectAll/data", component.dateAll);
router.get("/api/component/selectAll/:id", component.readAll);
router.get("/api/component/select/:id", component.read);
router.post("/api/component/create", component.create);
router.delete("/api/component/remove/:id", component.remove);
router.put("/api/component/update/:id", component.update);
//CRUD TABLE CATEGORY
router.get("/api/category/selectAll", category.readAll);
router.get("/api/category/select/:id", category.read);
router.get("/api/category/select/all/:id", category.readAllDataForCategory);
router.post("/api/category/create", category.create);
router.delete("/api/category/remove/:id", category.remove);
router.put("/api/category/update/:id", category.update);

module.exports = router;

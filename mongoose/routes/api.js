const Food = require("../models/Food_info");
const Category = require("../models/Order");
const express = require("express");
const router = express.Router();
const FoodController = require("../controller/FoodController");
const UserController = require("../controller/UserController")
const OrderController = require("../controller/OrderController")
const AuthController = require("../controller/AuthController")
const validator = require("../middleware/validator")
const auth = require("../middleware/auth")

// Foods ENDPOINT
router.get("/foods", FoodController.get_foods);
router.get("/food/name/:name", FoodController.findOne);
router.post("/foodCreate",validator.createfood(), FoodController.create
);
router.put("/foodUpdate/id/:id",auth, FoodController.update);
router.delete("/foodDelete/id/:id", FoodController.delete_food);

//Category ENDPOINT
router.get("/category");
router.post("/categoryCreate");
router.post("/categoryUpdate/catId/:id");
router.post("/categoryDelete/catId/:id");

//User ENDPOINT
router.get("/users",UserController.get_users);
router.post("/userCreate",validator.createUser(), UserController.create);
router.put("/userUpdate/userId/:id",UserController.update);
router.delete("/userDelete/userId/:id",UserController.delete_users);


//Order ENDPOINT
router.get("/orders",auth, OrderController.get_orders);
router.post("/orderCreate",validator.createOrder() ,OrderController.create);
router.put("/orderUpdate/orderId/:id",OrderController.update);
router.delete("/orderDelete/orderId/:id",OrderController.delete_orders);

module.exports = router;

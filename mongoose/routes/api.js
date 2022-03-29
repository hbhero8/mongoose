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
router.get("/foods",auth, FoodController.get_foods);
router.get("/food/name/:name", FoodController.findOne);
router.post("/foodCreate",validator.createfood(), FoodController.create
);
router.post("/foodUpdate/id/:id",auth, FoodController.update);
router.post("/foodDelete/id/:id", FoodController.delete_food);

//Category ENDPOINT
router.get("/category");
router.post("/categoryCreate");
router.post("/categoryUpdate/catId/:id");
router.post("/categoryDelete/catId/:id");

//User ENDPOINT
router.get("/users",UserController.get_users);
router.post("/userCreate",UserController.create);
router.post("/userUpdate/userId/:id",UserController.update);
router.post("/userDelete/userId/:id",UserController.delete_users);


//Order ENDPOINT
router.get("/orders", OrderController.get_orders);
router.post("/orderCreate",OrderController.create);
router.post("/orderUpdate/orderId/:id",OrderController.update);
router.post("/orderDelete/orderId/:id",OrderController.delete_orders);

module.exports = router;

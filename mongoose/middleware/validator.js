const { body, validationResult } = require("express-validator");

const createfood = () => {
  return [
    body("name").not().isEmpty(),
    body("price").not().isEmpty().withMessage("Price empty!"),
    body("discount")
      .isNumeric()
      .isFloat({ min: 0, max: 100 })
      .withMessage("0-100% sale possible"),
    body("stock")
      .isNumeric()
      .isLength({ min: 0 })
      .withMessage("Can't be less than 0"),
    body("category_id.name").notEmpty().withMessage('Fill category name')
  ];
};

const createUser = () => {
  return [
    body("name").not().isEmpty(),
    body("email").not().isEmpty().withMessage("Email empty!"),
    body("phone")
      .isNumeric()
      .isFloat({ min: 10000000, max: 99999999 }),
    body("password")
      .not().isEmpty(),
    body("role").notEmpty().withMessage('Fill role')
  ];
};

const createOrder = () => {
  return [
    body("customer_id").not().isEmpty(),
    body("deliveryman_id").not().isEmpty()
  ];
};


module.exports = {createfood, createUser, createOrder};
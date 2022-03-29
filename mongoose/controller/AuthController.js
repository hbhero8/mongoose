const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

const register = async (req, res, next) => {
  const data = req.body;
  const oldUser = await User.findOne({ email: data.email });
  if (oldUser) {
    return res.status(400).json({
      success: false,
      status: "you have registered already",
    });
  } else {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    data.role == 0 ? (data.role_id = 2) : (data.role_id = data.role);
    data.created_date = Date("Y-m-d");
    data.last_activity = Date("Y-m-d h:m:s");
    User.create(data, function (err, data) {
      if (err) {
        return res.status(400).json({
          success: false,
          data: err,
        });
      } else {
        email = data.email;
        const token = jwt.sign(
          { user_id: data._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          success: true,
          data: data,
          token: token,
        });
        return;
      }
    });

    
  }
};const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({
        success: false,
        status: "Please fill all fields.",
      });
      return;
    } else {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            user_id: user._id,
            email,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        res.status(200).json({
          success: true,
          status: "Login successful.",
          data: user,
          token: token,
        });
        return;
      } else {
        return res.status(400).json({
          success: false,
          status: "Username or password incorrect!",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { register, login };

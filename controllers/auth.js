const bcrypt = require("bcrypt");

const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup route handler

exports.signup = async (req, res) => {
  try {
    // get data
    const { firstName, lastName, email, password, role } = req.body;
    // cheak if user is already found

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    // scure password

    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }
    // entry for user

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    });
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      deta: user,
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "user cannot be register please try again leter",
    });
  }
};

// login route handler

exports.login = async (req, res) => {
  try {
    // deta fetch

    const { email, password } = req.body;
    // validation on email and password

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the details carefully",
      });
    }
    // cheak for registered user
    let user = await User.findOne({ email });
    console.log('user1', user);
    // if user is not register
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "please signUp first",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    // verify password and generate jwt token

    if (await bcrypt.compare(password, user.password)) {
      // if password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      //   console.log (token)
      user = user.toObject();
      // console.log( 'user2', user)
      user.token = token;
      user.password = undefined;
      // console.log( 'user3', user)

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        massage: "user logged in successfully",
      });
    } else {
      // if password is not matched
      return res.status(403).json({
        success: false,
        message: "incorrect password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "login failure",
    });
  }
};

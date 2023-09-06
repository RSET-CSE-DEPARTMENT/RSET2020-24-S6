const router = require("express").Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");


router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const users = await userModel.find({});
    const userarray = Object.values(users).map(ob=>ob)
    const size = userarray.length;

    const newUser = new userModel({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
      nationality: req.body.nationality,
      gender: req.body.gender,
      userindex: size,
      cart: {}
    });
    const User = await newUser.save();
    res.status(200).json(User);
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await userModel.findOne({ name: req.body.name });
    let flag = -1;
    if (req.body.name === "admin" && req.body.password === "admin") {
      res.status(200).json(user);
       flag=1;
    }
    if (!user) {
      flag = 1;
      user = { name: "User not found" };
      res.status(200).json(user);
    }
    if (flag == -1) {
      let validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        user = { name: "Wrong password" };
        res.status(200).json(user);
        flag = 0;
      }
    }
    if (flag == -1) res.status(200).json(user);
  } catch (err) {
    res.status(200).json("user doesn't exist");
  }
});

module.exports = router;

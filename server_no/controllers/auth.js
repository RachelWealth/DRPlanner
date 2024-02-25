import bcrypt from "bcrypt";
import User from "../models/user.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    console.log("salt:", salt);
    const hash = bcrypt.hashSync(req.body.pw, salt);
    const newUser = new User({ ...req.body, pw: hash });

    await newUser.save();
    res.status(200).send(newUser._doc);
  } catch (err) {
    //catch (err) {
    //     next(createError(404,"not found sorry!"))
    // }
    next(err);
  }
};
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not exists"));
    const isCorrect = await bcrypt.compare(req.body.pw, user.pw);
    if (!isCorrect) return next(createError(404, "Password not correct"));
    //res.status(200).send("User has been create!")
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { pw, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { pw, ...others } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnlp: true,
        })
        .status(200)
        .json(others);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnlp: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

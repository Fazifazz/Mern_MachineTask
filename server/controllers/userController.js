const CatchAsync = require("../util/CatchAsync");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const otpTemplate = require("../util/otpTemplate");
const Mail = require("../util/otpMailer");
const jwt = require('jsonwebtoken')

exports.registerUser = CatchAsync(async (req, res) => {
  const { name, email, mobile, address, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.json({ error: "User already exists" });
  }

  //hash password
  const hashPassword = await bcrpt.hash(password, 10);
  const newOtp = generateOTP(4);

  const user = new User({
    name,
    mobile,
    email,
    address,
    password: hashPassword,
    otp: {
      code: newOtp,
      generatedAt: Date.now(),
    },
  });
  const newUser = await user.save();
  if (newUser) {
    const options = {
      from: process.env.EMAIL,
      to: email,
      subject: "User verification OTP",
      html: otpTemplate(newOtp),
    };
    await Mail.sendMail(options);
    return res.status(200).json({ success: "otp sented to mail", email });
  }
});

function generateOTP(length) {
  const digits = "0123456789";
  let OTP = "";

  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  return OTP;
}

exports.verifyOtp = CatchAsync(async (req, res) => {
  if (!req.body.otp) {
    return res.json({ error: "please enter otp" });
  }
  const user = await User.findOne({ email: req.body.email });
  const generatedAt = new Date(user.otp.generatedAt).getTime();
  if (Date.now() - generatedAt <= 60 * 5 * 1000) {
    if (req.body.otp === user.otp.code) {
      user.isVerified = true;
      user.otp.code = "";
      user.otp.generatedAt = null;
      await user.save();
      return res
        .status(200)
        .json({ success: "Otp verified successfully", email: req.body.email });
    } else {
      return res.json({ error: "otp is invalid" });
    }
  } else {
    return res.json({ error: "otp expired!" });
  }
});


exports.ResendOtp = CatchAsync(async (req, res) => {
    if (!req.body.email) {
      return res.json({ error: "email not found!" });
    }
    const user = await User.findOne({ email: req.body.email });
    const newOtp = generateOTP(4)
    const options = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "verification otp",
      html: otpTemplate(newOtp),
    };
    await Mail.sendMail(options)
      .then((res) => console.log("otp sended"))
      .catch((err) => console.log(err.message));
  
    user.otp.code = newOtp;
    user.otp.generatedAt = Date.now();
    await user.save();
    return res
      .status(200)
      .json({ success: "Otp Resended", email: req.body.email });
  });
  

  exports.verifyLogin = CatchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    const samePass = await bcrypt.compare(password, user.password);
    if (!samePass) {
      return res.json({ error: "invalid password" });
    }
    if (!user.isVerified) {
      await User.findOneAndDelete({ email: email });
      return res.json({ error: "sorry,you are not verified!, sign up again" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ success: "Login Successfull", token, user });
  });

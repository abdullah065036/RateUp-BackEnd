const nodemailer = require("nodemailer");
const Code = require("../../models/Code");
const User = require("../../models/User");
const sendCode = async (request, response) => {
  const existingAccount = await User.findOne({ email: request.body.email });
  if (existingAccount) {
    return response.status(400).json({
      message: "Username not available, Please enter a different username",
    });
  }
  const code = Math.floor(100000 + Math.random() * 900000);
  const body = {
    email: request.body.email,
    code: `${code}`,
    isActive: true,
  };
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.userEmail,
      pass: process.env.emailPassword,
    },
  });
  await transporter.sendMail({
    from: process.env.userEmail,
    to: request.body.email,
    subject: "Email verification",
    text: `Verification code for Rate My Professor Portal is: ${code}`,
  });
  const verificationCode = new Code({ ...body });
  verificationCode.save().then((res) => {
    response
      .status(200)
      .json({ data: "Verification code sent to your email address" });
  });
};

module.exports = sendCode;

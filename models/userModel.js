import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your Name!"], 
    minLength: [3, "Name must contain at least 3 Characters!"],
    /*Or Some minimum Length value of charaters*/
    maxLength: [30, "Name cannot exceed 30 Characters!"],
    /*Or Some Maximum value of characters*/
  },
  email: {
    type: String,
    required: [true, "Please enter your Email!"],
    validate: [validator.isEmail, "Please provide a valid Email!"],
    unique: [true, "Pleasen provide a unique email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter the Password"],
    minLength: [6, "Password must contain at least 6 Characters!"],
    maxLength: [10, "Password cannot exceed 10 Characters!"],
    select: false,
  },
  accountType: {
    type: String,
    required: [true, "Please Select The account type"],
  },
  number: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
    // validate: {
    //   validator: function (v) {
    //     // Validating that the contact number is exactly 10 digits
    //     return /^\d{10}$/.test(v);
    //   },
    //   message: (props) =>
    //     `${props.value} is not a valid 10-digit phone number!`,
    // },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });
};
export const User = mongoose.model("Users", userSchema, "Users");

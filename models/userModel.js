const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const saltRounds = 10;

const user = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  token: {
    type: String,
    default: "",
  },
});

user.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

const User = mongoose.model("user", user);

module.exports = {
  User,
};

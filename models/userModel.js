const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { handleMongooseError } = require("../helpers/handleMongooseError");

const saltRounds = 10;

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const user = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegExp,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 4,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

user.post("save", handleMongooseError);

user.pre("save", async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

const User = mongoose.model("user", user);

module.exports = {
  User,
};

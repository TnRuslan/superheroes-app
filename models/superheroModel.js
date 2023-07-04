const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hero = new Schema(
  {
    nikname: {
      type: String,
      required: [true, "Set nikname"],
    },
    name: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },
    superPowers: {
      type: String,
      required: true,
    },
    catchPhrase: {
      type: String,
      required: false,
    },
    images: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Hero = mongoose.model("hero", hero);

module.exports = { Hero };

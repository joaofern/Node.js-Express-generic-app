const mongoose = require("mongoose");
require("mongoose-type-email");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
      select: false
    },
    role: {
      type: Number,
      default: 2,
      validate: {
        validator: value => {
          return [1, 2].indexOf(value) > -1;
        },
        message: "Invalid role."
      }
    },
    country: {
      type: String,
      required: true,
      validate: {
        validator: value => {
          return ["PT"].indexOf(value) > -1;
        },
        message: "Invalid country."
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);

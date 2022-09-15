const { Schema, model } = require("mongoose");
const { generateJWTAuthToken } = require("../../utils/helpers");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  isActive: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.methods.getAuthToken = () =>
  generateJWTAuthToken({
    id: this._id,
    email: this.email,
    isAdmin: this.isAdmin,
  });

const User = model("Users", UserSchema);

exports.User = User;

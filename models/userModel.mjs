import mongoose from "mongoose";
import hashPasswordMiddleware from "../middleware/hashPasswordMiddleware.mjs";

// Core User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true, default: "" },
  email: { type: String, trim: true, unique: true, required: true, index: true },
  username: {
    type: String,
    trim: true,
    unique: true,
    index: true,
    default: function () {
      return this.email;
    },
  },
  phone: { type: String, trim: true, default: "" },
  password: { type: String, trim: true, required: true },
  recoveryEmail: { type: String, trim: true, default: "" },

  // Verification
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },

  // Profile Media
  profilePicture: { type: String, trim: true, default: "" },
  coverPhoto: { type: String, trim: true, default: "" },

  // Account
  accountStatus: {
    type: String,
    trim: true,
    enum: ["active", "suspended", "deleted"],
    default: "active",
  },
  accountRole: { type: String, trim: true, enum: ["admin", "moderator", "user"], default: "user" },
  accountType: { type: String, trim: true, enum: ["public", "private", "business"], default: "public" },
}, { timestamps: true });

userSchema.pre("save", hashPasswordMiddleware);
const User = mongoose.model("User", userSchema);
export default User;

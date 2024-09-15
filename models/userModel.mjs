import mongoose from "mongoose";
import hashPasswordMiddleware from "../middleware/hashPasswordMiddleware.mjs";
import SocialUser from '../models/socialModel.mjs';
import Portfolio from '../models/portfolio.mjs';

// Core User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true, default: "" },
  email: { type: String, trim: true, unique: true, required: true, index: true },
  bio: {type: String , trim:true, default :""},
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

// userSchema.post("save", async function(doc) {
//   try {
//     // Create a default SocialUser entry
//     await SocialUser.create({
//       userId: doc._id,
//       // other fields can be default or omitted as needed
//     });

    // Create a default Portfolio entry
//     await Portfolio.create({
//       userId: doc._id,
//       personalInfo: {
//         name : doc.firstName + ' ' + doc.lastName,
//         contact: {
//           email: doc.email,
//           phone: doc.phone,
//         },
//         image: '',
//         bio: '',
//         languages: []
//       },
//       sections: []
//     });

//   } catch (error) {
//     console.error("Error creating default entries for new user:", error);
//   }
// });

const User = mongoose.model("User", userSchema);
export default User;

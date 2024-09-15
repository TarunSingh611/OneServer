import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email : {type:String, default : ""},
    token: { type: String, trim: true },
  });
  const VerificationToken = mongoose.model("VerificationToken", verificationTokenSchema);
  export default VerificationToken;
  
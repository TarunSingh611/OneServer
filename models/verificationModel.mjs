const verificationTokenSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    token: { type: String, trim: true },
  });
  const VerificationToken = mongoose.model("VerificationToken", verificationTokenSchema);
  export default VerificationToken;
  
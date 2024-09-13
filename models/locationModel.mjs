const locationSchema = new mongoose.Schema({
    country: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    privacy: {
      type: String,
      trim: true,
      enum: ["public", "private", "followers", "friends"],
      default: "public",
    },
  });
  const Location = mongoose.model("Location", locationSchema);
  export default Location;
  
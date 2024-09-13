const socialUserSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    friendsCount: { type: Number, default: 0 },
    postsCount: { type: Number, default: 0 },
    pendingFollowersCount: { type: Number, default: 0 },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    pendingFollowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  });
  
  const SocialUser = mongoose.model("SocialUser", socialUserSchema);
  export default SocialUser;
  
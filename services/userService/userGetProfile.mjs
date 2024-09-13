import userModel from "../../models/userModel.mjs";

const getSelf = async(userId)=> {

    if(!userId) return null
    const user = await userModel.findOne({ _id: userId })
    if(!user) return null
    return {
      id:user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      phone: user.phone,
      profilePicture: user.profilePicture,
      coverPhoto: user.coverPhoto,
      accountStatus: user.accountStatus,
      accountRole: user.accountRole,
      accountType: user.accountType,
      following: user.following,
      followers: user.followers,
      friends: user.friends,
      pendingFollowers: user.pendingFollowers,
      followingCount: user.followingCount,
      followersCount: user.followersCount,
      friendsCount: user.friendsCount,
      pendingFollowersCount: user.pendingFollowersCount,
      postsCount: user.postsCount,
      bio: user.bio,
      website: user.website,
      birthday: user.birthday,
      gender: user.gender,
      recoveryEmail: user.recoveryEmail,
      location: user.location,
      userVerified: user.userVerified,
      emailVerified: user.emailVerified,
      phoneVerified: user.phoneVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
  
    }
  }

  const  getUser = async (userId) => {
    if(!userId) return null
    const user = await userModel.findOne({ _id: userId })
    if(!user) return null
    return {
      id:user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      phone: user.phone,
      profilePicture: user.profilePicture,
      userVerified: user.userVerified,
      coverPhoto: user.coverPhoto,
      accountStatus: user.accountStatus,
      accountRole: user.accountRole,
      accountType: user.accountType,
      following: user.following,
      followers: user.followers,
      friends: user.friends,
      pendingFollowers: user.pendingFollowers,    
      gender: user.gender,
      birthday: user.birthday,
      accountType: user.accountType,
    }
  }

  export { getSelf, getUser }

export const getNavController = (req, res) => {
  const message = "This is Nav misc";
 const navData = []
 if(req.session && req.session.user){
    const user = req.session.user
    navData.push([ "Profile", "Post", "Notifications", "Explore", "Setting", ])
    if(user.accountRole === "admin" || user.accountRole === "moderator"){
        navData.push(["Post"])
    }
 }
  res.status(200).json({
      message,
      navData: navData
  });
};






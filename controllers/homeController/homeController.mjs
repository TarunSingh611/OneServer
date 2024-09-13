
export const homeController = (req, res) => {
  const message = "This is Home Page";
  res.status(200).json({
      message,
  });
};

export const postHomeController = (req, res) => {
  const message = "This is Post Home Page";
  res.status(200).json({
      message,
  });
}

export const patchHomeController = (req, res) => {
  const message = "This is Patch Home Page";
  res.status(200).json({
      message,
  });
}

export const putHomeController = (req, res) => {
  const message = "This is Put Home Page";
  res.status(200).json({
      message,
  })

}

export const deleteHomeController = (req, res) => {
  const message = "This is Delete Home Page";
}






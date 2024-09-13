import resume from "../../jsonStore/resume.json" assert { type: "json" };

export const getResumeController = (req, res) => {
  const message = "This is resume Page";
  const resumeData = resume;
  res.status(200).json({
      message,
      resumeData,
  });
};

export const postResumeController = (req, res) => {
  const message = "This is Post Resume Page";
  res.status(200).json({
      message,
  });
}

export const getResumeByIdController = (req, res) => {
  const message = "This is Get Resume Page";
  res.status(200).json({
      message,
  });
}

export const patchResumeController = (req, res) => {
  const message = "This is Patch Resume Page";
  res.status(200).json({
      message,
  });
}

export const putResumeController = (req, res) => {
  const message = "This is Put Resume Page";
  res.status(200).json({
      message,
  })

}

export const deleteResumeController = (req, res) => {
  const message = "This is Delete Resume Page";
}







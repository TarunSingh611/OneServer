import Project from "../../models/projectModel.mjs";

export const projectController = async (req, res) => {
  try {
    const { page = 1, limit = 4 } = req.query;
      const projects = await Project.find().skip(page-1).limit(limit);
      res.status(200).json(projects);
  } catch (error) {
      res.status(500).json({ message: "Server Error", message: error.message });
  }
};
export const postProjectController = async (req, res) => {
    try {
        const { title, description, details, link , images = [] } = req.body;
        const newProject = new Project({
            title,
            description,
            details,
            link,
            images,
            updatedAt: new Date(),
            createdAt: new Date(),
        });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Server Error", message: error.message });
    }
};

export const getProjectController = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: "Server Error", message: error.message });
    }
};

export const putProjectController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, details, link } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { title, description, details, link, updatedAt: new Date() },
            { new: true, overwrite: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: "Server Error", message: error.message });
    }
};

export const deleteProjectController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", message: error.message });
    }
};

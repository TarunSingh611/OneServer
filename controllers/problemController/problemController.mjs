// controllers/problemController.js
import Problem from "../../models/problemModel.mjs";
import { getProblemList } from "../../utils/problemList.mjs";

export const getProblemsController = async (req, res) => {
  const { searchTerm, filters , sort, page = 1, limit = 9 } = req.body;

  try{
    const ProblemSearchResult = await getProblemList(searchTerm, filters, sort, page, limit);
    res.status(200).json(ProblemSearchResult);
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};


// Create a new problem
export const createProblemController = async (req, res) => {
  try {
    const { title, description, constraints, testCases, examples, difficulty, tags, link } = req.body;
    if(!title || !description || !difficulty) {
      return res.status(400).json({ statusCode: 400, message: "title, description and difficulty are required" });
    }
    else{
      const data = { title , description, constraints, testCases : testCases || [], examples : examples || [], difficulty, algorithm: tags?.algorithm || [] , dataStructure :tags?.dataStructure || [], link : link || "" };
      const newProblem = new Problem(data);
      await newProblem.save();
      res.status(201).json({ statusCode: 200, message: "Problem created successfully", data: newProblem._id });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

// Get a specific problem by ID
export const getProblemByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findById(id);
    if (!problem) {
      return res.status(404).json({statusCode: 404, message: "Problem not found" });
    }
    res.status(200).json({statusCode: 200, question: problem});
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

// Update a specific problem by ID
export const updateProblemController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, constraints, testCases, examples, link, difficulty, tags } = req.body;

    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      { title, description, constraints, testCases, examples, link, difficulty, tags, updatedAt: new Date() },
      { new: true }
    );
    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

// Delete a specific problem by ID
export const deleteProblemController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProblem = await Problem.findByIdAndDelete(id);
    if (!deletedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({ message: "Problem deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", message: error.message });
  }
};

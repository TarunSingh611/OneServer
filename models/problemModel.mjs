// models/Problem.js
import mongoose from 'mongoose';

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  constraints: {
    type: [String],
  },
  testCases: {
    type: [{ input: String, output: String }],
  },
  examples: {
    type: [String],
  },
  numberOfSolutions: {
    type: Number,
    default: 0,
  },
  link: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: {0: "Easy", 1: "Medium", 2: "Hard", 3: "Extreme"},
    required: true,
  },
  algorithm: {
    type: [String],
  },
  dataStructure: {
    type: [String],
  },
  approaches: {
    type : [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Problem = mongoose.model('Problem', ProblemSchema);
export default Problem;

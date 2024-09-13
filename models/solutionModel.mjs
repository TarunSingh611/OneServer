// models/Solution.js
import mongoose from "mongoose";

const SolutionSchema = new mongoose.Schema({
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
    },
    discussion: [
        {
            user: String,
            comment: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    optimality: {
        type: String,
        default: "none",
        enum: ["none", "star", "Space-Manager", "Time-Manager"],
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

const Solution = mongoose.model("Solution", SolutionSchema);
export default Solution;

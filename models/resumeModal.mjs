import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  user_id : { type: String, trim: true },
  description: { type: String, trim: true },
  technologies: [{ type: String, trim: true }],
  images: [{ type: String, trim: true }],
  links: [{
    url: { type: String, trim: true },
    type: { type: String, enum: ['code', 'live', 'video'] },
  }],
});

const ResumeTemplateSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  description: { type: String, trim: true },
  image: { type: String, trim: true },
  type: { type: String, trim: true },
  url: { type: String, trim: true },
  sections: {
    personalInfo: { type: Boolean, default: true, },
    projects: { type: Boolean, default: true, },
    experience: { type: Boolean, default: true, },
    education: { type: Boolean, default: true, },
    skills: { type: Boolean, default: true, },
    certifications: { type: Boolean, default: true, },
    awards: { type: Boolean, default: true, },
    achievements: { type: Boolean, default: true, },
  },
});

// Main Resume Schema
const ResumeSchema = new mongoose.Schema({
  personalInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  experience: [{
    title: { type: String, trim: true },
    company: { type: String, trim: true },
    location: { type: String, trim: true },
    description: [{ type: String, trim: true }],
    start_date: { type: Date },
    end_date: { type: Date },
  }],
  education: [{
    field: { type: String, trim: true },
    institution: { type: String, trim: true },
    location: { type: String, trim: true },
    description: { type: String, trim: true },
    start_date: { type: Date },
    end_date: { type: Date },
  }],
  skills: [{
    name: { type: String, trim: true },
    score: { type: Number, min: 0, max: 100 },
  }],
  certifications: [{
    title: { type: String, trim: true },
    issuer: { type: String, trim: true },
    date_issued: { type: Date },
    description: { type: String, trim: true },
  }],
  awards: [{ type: String, trim: true }],
  achievements: [{ type: String, trim: true }],
}, { timestamps: true });

const Project = mongoose.model('Project', ProjectSchema);
const ResumeTemplate = mongoose.model('ResumeTemplate', ResumeTemplateSchema);
const Resume = mongoose.model('Resume', ResumeSchema);

export { Project, ResumeTemplate, Resume };
import mongoose from "mongoose";

const portfolioPersonalInfoSchema = new mongoose.Schema({
    personalInfo: {
      firstName: { type: String, trim: true },
      lastName : { type: String, trim: true },
      contact: {
        email: { type: String, trim: true, lowercase: true },
        phone: { type: String, trim: true },
        location: { type: String, trim: true },
        social_links: {
          linkedin: { type: String, trim: true },
          github: { type: String, trim: true },
        },
      },
      image: { type: String, trim: true },
      bio: { type: String, trim: true },
      languages: [
        {
          language: { type: String, trim: true },
          proficiency: { type: String, enum: ["Basic", "Intermediate", "Advanced", "Native"] },
        },
      ],
    },
  });
  
  const portfoliioSectionSchema = new mongoose.Schema({
    order: { type: Number, default: 0 },
    name: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    buttonText: { type: String, trim: true, default: "" },
    images: [
      {
        type: String,
        trim: true,
        default: "",
        order: { type: Number, default: 0 },
      },
    ],
  });
  
  const portfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    personalInfo: { type: mongoose.Schema.Types.ObjectId, ref: "portfolioPersonalInfoSchema" },
    sections: [portfoliioSectionSchema],
  });
  
  const Portfolio = mongoose.model("Portfolio", portfolioSchema);
  export default Portfolio;
  
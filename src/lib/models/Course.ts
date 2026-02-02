import mongoose, { Schema, model, models } from "mongoose";

const CourseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true, 
    enum: [
      "CORE Programming", 
      "Advanced IT Technologies", 
      "Trending & Future-Ready Technologies", 
      "Specialized Training Programs"
    ] 
  },
  description: { type: String, required: true },
  duration: { type: String, required: true }, // Based on your FAQ 2-6 months
  image: { type: String }, // NEW: To store the image path (e.g., /Images/course1.webp)
  updatedAt: { type: Date, default: Date.now },
});

export const Course = models.Course || model("Course", CourseSchema);
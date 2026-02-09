import { Schema, model, models } from "mongoose";
import { COURSE_CATEGORIES } from "@/lib/course-categories";

const CourseSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: COURSE_CATEGORIES,
    },
    description: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Course = models.Course || model("Course", CourseSchema);

import { Schema, model, models } from "mongoose";
import { COURSE_CATEGORIES } from "@/lib/course-categories";

const ModuleSchema = new Schema({
  moduleTitle: { type: String, required: true },
  topics: [{ type: String, required: true }],
});



const CourseSchema = new Schema(
  {
    // Basic Info
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    shortDescription: { type: String, required: true, maxlength: 150 },
    fullDescription: { type: String, required: true, trim: true },
    // Legacy compatibility for older clients still sending `description`.
    description: { type: String, trim: true, default: "" },
    category: {
      type: String,
      required: true,
      enum: COURSE_CATEGORIES,
    },
    duration: { type: String, required: true },
    level: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    language: {
      type: String,
      required: true,
      enum: ["English", "Hindi", "Mixed"],
      default: "English",
    },
    mode: {
      type: String,
      required: true,
      enum: ["Online", "Offline", "Hybrid"],
      default: "Online",
    },

    // Media
    thumbnail: { type: String, required: true },
    previewVideo: { type: String, default: "" },

    // Curriculum
    modules: [ModuleSchema],

    

    // Meta / Highlights
    keyHighlights: [{ type: String }],
    toolsCovered: [{ type: String }],

    // Placement & Career
    placementSupport: { type: Boolean, default: false },
    averagePackage: { type: String, default: "" },
    hiringPartners: [{ type: String }],

    // Pricing & CTA
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    seatsAvailable: { type: Number, default: 20 },

    // SEO
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

CourseSchema.pre("validate", function () {
  const doc = this as unknown as { fullDescription?: string; description?: string };

  if (!doc.fullDescription && doc.description) {
    doc.fullDescription = doc.description;
  }

  if (!doc.description && doc.fullDescription) {
    doc.description = doc.fullDescription;
  }
});

export const Course = models.Course || model("Course", CourseSchema);

import { Schema, model, models } from "mongoose";

const PlacementSchema = new Schema(
  {
    studentName: { type: String, required: true, trim: true },
    course: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    packageOffered: { type: String, default: "", trim: true },
    year: { type: Number, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Placement = models.Placement || model("Placement", PlacementSchema);

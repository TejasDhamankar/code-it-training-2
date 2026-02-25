import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Course } from "@/lib/models/Course";
import { isAdminAuthorized } from "@/lib/admin-auth";
import { COURSE_CATEGORIES } from "@/lib/course-categories";

const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
const COURSE_LANGUAGES = ["English", "Hindi", "Mixed"] as const;
const COURSE_MODES = ["Online", "Offline", "Hybrid"] as const;

function toNonEmptyString(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function toDate(value: unknown) {
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}

function toStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function toModules(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const moduleItem = item as { moduleTitle?: unknown; topics?: unknown };
      const moduleTitle = toNonEmptyString(moduleItem.moduleTitle);
      const topics = toStringArray(moduleItem.topics);

      if (!moduleTitle) return null;

      return { moduleTitle, topics };
    })
    .filter(Boolean);
}

export async function GET() {
  try {
    await connectToDatabase();
    const courses = await Course.find({}).sort({ updatedAt: -1 });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authorized = await isAdminAuthorized(req);
    if (!authorized) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const body = (await req.json()) as Record<string, unknown>;

    const title = toNonEmptyString(body.title);
    const slug = toNonEmptyString(body.slug);
    const shortDescription = toNonEmptyString(body.shortDescription);
    const fullDescription = toNonEmptyString(body.fullDescription ?? body.description);
    const description = fullDescription;
    const category = toNonEmptyString(body.category);
    const duration = toNonEmptyString(body.duration);
    const level = toNonEmptyString(body.level);
    const language = toNonEmptyString(body.language || "English");
    const mode = toNonEmptyString(body.mode || "Online");
    const thumbnail = toNonEmptyString(body.thumbnail);

    

    const validationErrors: string[] = [];

    if (!title) validationErrors.push("`title` is required.");
    if (!slug) validationErrors.push("`slug` is required.");
    if (!shortDescription) validationErrors.push("`shortDescription` is required.");
    if (!fullDescription) validationErrors.push("`fullDescription` is required.");
    if (!thumbnail) validationErrors.push("`thumbnail` is required.");
    if (!duration) validationErrors.push("`duration` is required.");
    

    if (!COURSE_CATEGORIES.includes(category as (typeof COURSE_CATEGORIES)[number])) {
      validationErrors.push("`category` has an invalid value.");
    }

    if (!COURSE_LEVELS.includes(level as (typeof COURSE_LEVELS)[number])) {
      validationErrors.push("`level` has an invalid value.");
    }

    if (!COURSE_LANGUAGES.includes(language as (typeof COURSE_LANGUAGES)[number])) {
      validationErrors.push("`language` has an invalid value.");
    }

    if (!COURSE_MODES.includes(mode as (typeof COURSE_MODES)[number])) {
      validationErrors.push("`mode` has an invalid value.");
    }

    const price = toNumber(body.price);
    const discountPrice = body.discountPrice === undefined ? 0 : toNumber(body.discountPrice);
    const seatsAvailable = body.seatsAvailable === undefined ? 20 : toNumber(body.seatsAvailable);
    const startDate = toDate(body.startDate);

    if (!Number.isFinite(price) || price < 0) {
      validationErrors.push("`price` must be a valid non-negative number.");
    }

    if (!Number.isFinite(discountPrice) || discountPrice < 0) {
      validationErrors.push("`discountPrice` must be a valid non-negative number.");
    }

    if (!Number.isFinite(seatsAvailable) || seatsAvailable < 0) {
      validationErrors.push("`seatsAvailable` must be a valid non-negative number.");
    }

    if (!startDate) {
      validationErrors.push("`startDate` must be a valid date.");
    }

    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    const payload = {
      title,
      slug,
      shortDescription,
      fullDescription,
      description,
      category,
      duration,
      level,
      language,
      mode,
      thumbnail,
      previewVideo: toNonEmptyString(body.previewVideo),
      modules: toModules(body.modules),
      
      keyHighlights: toStringArray(body.keyHighlights),
      toolsCovered: toStringArray(body.toolsCovered),
      placementSupport: Boolean(body.placementSupport),
      averagePackage: toNonEmptyString(body.averagePackage),
      hiringPartners: toStringArray(body.hiringPartners),
      price,
      discountPrice,
      isPopular: Boolean(body.isPopular),
      startDate,
      seatsAvailable,
      metaTitle: toNonEmptyString(body.metaTitle),
      metaDescription: toNonEmptyString(body.metaDescription),
    };

    const newCourse = await Course.create(payload);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error: unknown) {
    console.error("Failed to create course:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "ValidationError" &&
      "errors" in error &&
      typeof error.errors === "object"
    ) {
      const validationDetails = Object.values(error.errors as Record<string, { message?: string }>)
        .map((err) => err?.message)
        .filter(Boolean);

      return NextResponse.json(
        { error: "Validation failed", details: validationDetails },
        { status: 400 }
      );
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "MongoServerError" &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { error: "A course with the same unique field already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}

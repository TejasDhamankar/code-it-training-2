export const COURSE_CATEGORIES = [
  "CORE Programming",
  "Advanced IT Technologies",
  "Trending & Future-Ready Technologies",
  "Specialized Training Programs",
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];

export const COURSE_CATEGORY_LABELS: Record<CourseCategory, string> = {
  "CORE Programming": "Core Programming",
  "Advanced IT Technologies": "Advanced IT",
  "Trending & Future-Ready Technologies": "Trending Tech",
  "Specialized Training Programs": "Specialized",
};

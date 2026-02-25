import {
  BookCopy,
  Briefcase,
  LayoutGrid,
  Activity,
  User,
  Building,
  AlertTriangle,
} from "lucide-react";
import React, { Suspense } from "react";
import { Course } from "@/lib/models/Course";
import { Placement } from "@/lib/models/Placement";
import connectToDatabase from "@/lib/mongodb";

// --- Data Fetching Service ---

async function getDashboardData() {
  try {
    await connectToDatabase();

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [
      courseCount,
      placementCount,
      distinctCategories,
      recentActivityCount,
      recentCourses,
      recentPlacements,
    ] = await Promise.all([
      Course.countDocuments(),
      Placement.countDocuments(),
      Course.distinct("category"),
      Placement.countDocuments({ createdAt: { $gte: oneDayAgo } }),
      Course.find().sort({ createdAt: -1 }).limit(5).lean(),
      Placement.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return {
      courseCount,
      placementCount,
      categoryCount: distinctCategories.length,
      recentActivityCount,
      recentCourses,
      recentPlacements,
      error: null,
    };
  } catch (error: any) {
    console.error("Database error while fetching dashboard data:", error);
    return {
      courseCount: 0,
      placementCount: 0,
      categoryCount: 0,
      recentActivityCount: 0,
      recentCourses: [],
      recentPlacements: [],
      error: "Failed to load dashboard data. Please check the database connection.",
    };
  }
}

// --- UI Components ---

const StatCard = ({ icon: Icon, title, value, detail }: { icon: React.ElementType, title: string, value: string | number, detail: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-start gap-4">
    <div className="bg-gray-100 p-3 rounded-full">
      <Icon className="w-6 h-6 text-gray-600" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{detail}</p>
    </div>
  </div>
);

const EmptyState = ({ message, description }: { message: string; description: string }) => (
    <div className="text-center py-10">
      <h3 className="text-lg font-semibold text-gray-800">{message}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
);

const RecentCoursesTable = ({ courses }: { courses: any[] }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm min-h-[300px]">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Courses</h3>
    {courses.length > 0 ? (
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={course._id} className={`flex items-center gap-4 ${index < courses.length - 1 ? 'pb-2 border-b border-gray-100' : ''}`}>
            <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-lg font-bold text-sm">
              {course.title.charAt(0)}
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-700">{course.title}</p>
              <p className="text-sm text-gray-500">{course.category}</p>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <EmptyState message="No courses added yet" description="Create new courses to see them here." />
    )}
  </div>
);

const RecentPlacementsTable = ({ placements }: { placements: any[] }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm min-h-[300px]">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Placements</h3>
      {placements.length > 0 ? (
      <div className="space-y-4">
        {placements.map((placement, index) => (
          <div key={placement._id} className={`flex items-start gap-4 ${index < placements.length - 1 ? 'pb-3 border-b border-gray-100' : ''}`}>
             <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full">
                <User className="w-5 h-5"/>
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-700">{placement.studentName}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <Building className="w-3 h-3"/> <span>{placement.company} - {placement.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <EmptyState message="No placements added yet" description="Add new placements to see them here." />
      )}
    </div>
  );

const DataErrorState = ({ error }: { error: string }) => (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md my-8">
        <div className="flex">
            <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Fetching Data</h3>
                <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                </div>
            </div>
        </div>
    </div>
);
  

// --- Main Page Component ---

export default async function AdminDashboardPage() {
    const data = await getDashboardData();

    if (data.error) {
        return (
            <main className="flex-1 bg-gray-50 p-6 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
                    <DataErrorState error={data.error} />
                </div>
            </main>
        );
    }
  
    return (
        <main className="flex-1 bg-gray-50 p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={BookCopy} title="Total Courses" value={data.courseCount} detail="Managed in CMS" />
                    <StatCard icon={Briefcase} title="Total Placements" value={data.placementCount} detail="Successful careers" />
                    <StatCard icon={LayoutGrid} title="Course Categories" value={data.categoryCount} detail="From distinct courses" />
                    <StatCard icon={Activity} title="Recent Activity" value={data.recentActivityCount} detail="Placements in last 24h" />
                </div>
                
                {/* Recent Activity Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Suspense fallback={<p>Loading recent courses...</p>}>
                        <RecentCoursesTable courses={data.recentCourses} />
                    </Suspense>
                    <Suspense fallback={<p>Loading recent placements...</p>}>
                        <RecentPlacementsTable placements={data.recentPlacements} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

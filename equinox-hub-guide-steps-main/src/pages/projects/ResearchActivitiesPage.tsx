
import MainLayout from "@/components/layout/MainLayout";
import ProjectYearGrid from "@/components/projects/ProjectYearGrid";

const ResearchActivitiesPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-purple-100">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">Research Activities</h1>
          <p className="text-gray-600 mb-6">
            Browse research activities by year. Click on a year to manage documents, photos, and other resources.
          </p>
          
          <ProjectYearGrid 
            projectType="research-activities"
            years={[2019, 2020, 2021, 2022, 2023, 2024, 2025]} 
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ResearchActivitiesPage;

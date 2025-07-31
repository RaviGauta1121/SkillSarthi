import DiaryList from "@/components/DairyList";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
  return (
    <ProtectedRoute>
    <div className="mt-20">
      
      <DiaryList />
    </div>
    </ProtectedRoute>
  );
};

export default Page;
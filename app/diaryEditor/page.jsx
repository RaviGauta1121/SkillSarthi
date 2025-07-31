import DiaryEditor from "@/components/DiaryEditor";
import ProtectedRoute from "@/components/ProtectedRoute";
const YourPage = () => {
  return (
    <ProtectedRoute>
    <div className="mt-20">
      
      <DiaryEditor/>
    </div>
    </ProtectedRoute>
  );
};

export default YourPage;

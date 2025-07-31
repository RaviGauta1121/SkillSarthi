import DiaryEditor from "@/components/DiaryEditor";
import ProtectedRoute from "@/components/ProtectedRoute";
const YourPage = () => {
  return (
    <ProtectedRoute>
    <div className="mt-10">
      <h1>Write Your Diary</h1>
      <DiaryEditor/>
    </div>
    </ProtectedRoute>
  );
};

export default YourPage;

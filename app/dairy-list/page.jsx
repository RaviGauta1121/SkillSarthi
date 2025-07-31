import DiaryList from "@/components/DairyList";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
  return (
    <ProtectedRoute>
    <div>
      <h1 className="text-3xl font-bold p-4 ">Diary Entries</h1>
      <DiaryList />
    </div>
    </ProtectedRoute>
  );
};

export default Page;
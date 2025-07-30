import DiaryList from "@/components/DairyList";

const Page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold p-4">Diary Entries</h1>
      <DiaryList />
    </div>
  );
};

export default Page;
import DiaryList from "@/components/DairyList";

const Page = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold p-4 mt-20">Diary Entries</h1>
      <DiaryList />
    </div>
  );
};

export default Page;
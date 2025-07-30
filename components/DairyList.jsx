"use client";
import React, { useEffect, useState } from 'react';

const DiaryList = () => {
  const [diaries, setDiaries] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Fetch diaries from the API
    const fetchDiaries = async () => {
      try {
        const response = await fetch('/api/getDiaries');
        const data = await response.json();
        setDiaries(data.diaries);
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };

    fetchDiaries();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredDiaries = diaries.filter(diary => selectedDate ? diary.date === selectedDate : true);

  // Get recent entries
  const recentDiaries = diaries.slice(0, 3);

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-gray-800 text-white">
        <h2 className="text-lg font-bold">Recent Entries</h2>
        <ul>
          {recentDiaries.map((diary) => (
            <li key={diary._id} className="mb-2">
              <strong>{diary.date}</strong> - {diary.time}
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-bold mt-4">Filter by Date</h2>
        <input
          type="date"
          onChange={handleDateChange}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </aside>
      <main className="w-3/4 p-4">
        {filteredDiaries.map((diary) => (
          <div key={diary._id} className="mb-4 p-4 border border-gray-700 rounded">
            <h3 className="text-xl font-semibold">{diary.date}</h3>
            <div className="text-gray-400">{diary.time}</div>
            <div className="mt-2 prose" dangerouslySetInnerHTML={{__html: diary.content}} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default DiaryList;

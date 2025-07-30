"use client";
import { useState } from 'react';

const DiaryModal = ({ userId, onClose }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const diaryData = {
      userId, // Reference to the userId
      date: currentDate,
      time: currentTime,
      content: content, // HTML content from the editor or textarea
    };

    try {
      const response = await fetch('/api/saveDiary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diaryData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Diary saved successfully:', result);
        onClose(); // Close modal on successful save
      } else {
        console.error('Failed to save diary:', result.message);
      }
    } catch (error) {
      console.error('Error while saving diary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl mb-4">Add a Diary Entry</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your diary entry here..."
        />
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryModal;

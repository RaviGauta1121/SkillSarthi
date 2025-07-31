"use client";
import { useState, useEffect } from 'react';
import DiaryModal from '../../models/tiny'; // Adjust path as needed

const DiaryPage = () => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('default-user');
  const [refreshing, setRefreshing] = useState(false);

  // Fetch diary entries
  const fetchDiaries = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setRefreshing(!showLoading);
      
      const response = await fetch(`/api/getDiary?userId=${selectedUserId}`);
      const data = await response.json();
      
      if (response.ok) {
        setDiaries(data.diaries || []);
        setError(null);
      } else {
        setError(data.message || 'Failed to fetch diaries');
        setDiaries([]);
      }
    } catch (err) {
      setError('Network error: ' + err.message);
      setDiaries([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filter diaries based on search term
  const filteredDiaries = diaries.filter(diary =>
    diary.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    diary.date.includes(searchTerm) ||
    diary.time.includes(searchTerm)
  );

  // Handle modal close and refresh data
  const handleModalClose = () => {
    setShowModal(false);
    fetchDiaries(false); // Refresh without showing loading
  };

  // Delete diary entry
  const deleteDiary = async (diaryId) => {
    if (!confirm('Are you sure you want to delete this diary entry?')) {
      return;
    }

    try {
      const response = await fetch(`/api/deleteDiary`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: diaryId }),
      });

      if (response.ok) {
        setDiaries(diaries.filter(diary => diary._id !== diaryId));
      } else {
        alert('Failed to delete diary entry');
      }
    } catch (err) {
      alert('Error deleting diary: ' + err.message);
    }
  };

  // Strip HTML tags for preview
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Load diaries on component mount and when userId changes
  useEffect(() => {
    fetchDiaries();
  }, [selectedUserId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 mt-16">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Digital Diary</h1>
              <p className="mt-1 text-gray-600">Capture your thoughts and memories</p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => fetchDiaries(false)}
                disabled={refreshing}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                <svg className={`-ml-1 mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                New Entry
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Entries
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by content, date, or time..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="sm:w-48">
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter user ID"
              />
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
            <span>Total Entries: <span className="font-semibold">{diaries.length}</span></span>
            <span>Filtered Results: <span className="font-semibold">{filteredDiaries.length}</span></span>
            <span>Current User: <span className="font-semibold">{selectedUserId}</span></span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-sm p-12">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-indigo-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <p className="text-gray-600">Loading your diary entries...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700 font-medium">Error: {error}</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredDiaries.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12">
            <div className="text-center">
              <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No diary entries found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? `No entries match "${searchTerm}"` : 'Start documenting your journey by creating your first diary entry.'}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Create First Entry
              </button>
            </div>
          </div>
        )}

        {/* Diary Entries Grid */}
        {!loading && filteredDiaries.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiaries.map((diary) => (
              <div key={diary._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm opacity-90">Entry from</p>
                      <p className="font-semibold">{diary.date}</p>
                      <p className="text-sm opacity-90">{diary.time}</p>
                    </div>
                    <button
                      onClick={() => deleteDiary(diary._id)}
                      className="text-white hover:text-red-200 transition-colors"
                      title="Delete entry"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                  {/* Rich text content */}
                  <div 
                    className="prose prose-sm max-w-none text-gray-800 mb-4 line-clamp-6"
                    dangerouslySetInnerHTML={{ __html: diary.content }}
                  />
                  
                  {/* Content preview for long entries */}
                  {stripHtml(diary.content).length > 200 && (
                    <div className="text-sm text-gray-500 italic">
                      {stripHtml(diary.content).length > 200 ? '...view full entry above' : ''}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 bg-gray-50 border-t">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>User: {diary.userId}</span>
                    {diary.createdAt && (
                      <span title={`Created: ${new Date(diary.createdAt).toLocaleString()}`}>
                        {new Date(diary.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Diary Modal */}
      {showModal && (
        <DiaryModal
          userId={selectedUserId}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default DiaryPage;
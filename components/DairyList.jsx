"use client";
import React, { useEffect, useState } from 'react';

const DiaryList = () => {
  const [diaries, setDiaries] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch diaries from the API
    const fetchDiaries = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/getDiaries');
        const data = await response.json();
        setDiaries(data.diaries || []);
      } catch (error) {
        console.error('Error fetching diaries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiaries();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const clearFilters = () => {
    setSelectedDate('');
    setSearchTerm('');
  };

  const filteredDiaries = diaries.filter(diary => {
    const matchesDate = selectedDate ? diary.date === selectedDate : true;
    const matchesSearch = searchTerm ? 
      diary.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diary.date.includes(searchTerm) ||
      diary.time.includes(searchTerm) : true;
    return matchesDate && matchesSearch;
  });

  // Get recent entries
  const recentDiaries = diaries.slice(0, 5);

  // Strip HTML for preview
  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          </div>
          <p className="text-slate-600 text-lg">Loading your memories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="w-80 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">My Diary</h1>
                <p className="text-slate-400 text-sm">Personal Journal</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                <div className="text-2xl font-bold text-blue-400">{diaries.length}</div>
                <div className="text-xs text-slate-400">Total Entries</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
                <div className="text-2xl font-bold text-purple-400">{filteredDiaries.length}</div>
                <div className="text-xs text-slate-400">Filtered</div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Search Entries
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search content, dates..."
                  className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 pl-10"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Filter by Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200"
              />
            </div>

            {/* Clear Filters */}
            {(selectedDate || searchTerm) && (
              <button
                onClick={clearFilters}
                className="w-full p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Clear Filters</span>
              </button>
            )}

            {/* Recent Entries */}
            <div>
              <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Entries
              </h2>
              {recentDiaries.length > 0 ? (
                <div className="space-y-3">
                  {recentDiaries.map((diary) => (
                    <div key={diary._id} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{diary.date}</span>
                        <span className="text-xs text-slate-400">{diary.time}</span>
                      </div>
                      <p className="text-sm text-slate-400 line-clamp-2">
                        {stripHtml(diary.content).substring(0, 80)}...
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No entries yet</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">
                  {selectedDate ? `Entries for ${selectedDate}` : 'All Entries'}
                </h1>
                <p className="text-slate-600">
                  {filteredDiaries.length} {filteredDiaries.length === 1 ? 'entry' : 'entries'} found
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0v6m6-6v6M3 15a3 3 0 003 3h12a3 3 0 003-3V9a3 3 0 00-3-3H6a3 3 0 00-3 3v6z" />
                  </svg>
                  <span className="text-sm font-medium">Journal View</span>
                </div>
              </div>
            </div>
          </div>

          {/* Entries */}
          {filteredDiaries.length > 0 ? (
            <div className="space-y-8">
              {filteredDiaries.map((diary) => (
                <article key={diary._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden group">
                  {/* Entry Header */}
                  <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold">{diary.date}</h3>
                          <p className="text-white/80 text-sm">{diary.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/60 text-xs">Entry #{diaries.indexOf(diary) + 1}</div>
                        {diary.createdAt && (
                          <div className="text-white/60 text-xs">
                            {new Date(diary.createdAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Entry Content */}
                  <div className="p-8">
                    <div 
                      className="prose prose-lg max-w-none text-slate-900 leading-relaxed prose-headings:text-slate-900 prose-strong:text-slate-900 prose-p:text-slate-900 prose-em:text-slate-900 prose-italic:text-slate-900"
                      style={{color: '#0f172a'}}
                      dangerouslySetInnerHTML={{__html: diary.content}} 
                    />
                  </div>

                  {/* Entry Footer */}
                  <div className="px-8 py-4 bg-slate-50 border-t border-slate-100">
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center space-x-4">
                        <span>📝 {stripHtml(diary.content).split(' ').length} words</span>
                        <span>⏱️ ~{Math.ceil(stripHtml(diary.content).split(' ').length / 200)} min read</span>
                      </div>
                      <div className="text-xs">
                        ID: {diary._id?.substring(0, 8)}...
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">No entries found</h3>
                <p className="text-slate-600 mb-6">
                  {selectedDate || searchTerm 
                    ? "No diary entries match your current filters. Try adjusting your search criteria."
                    : "You haven't written any diary entries yet. Start documenting your thoughts and experiences!"
                  }
                </p>
                {(selectedDate || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Clear All Filters</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DiaryList;
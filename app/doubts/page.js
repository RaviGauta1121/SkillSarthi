// app/doubts/page.js
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Meteors } from "@/components/Cards/MeteorCard";

export default function DoubtsPage() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    subject: 'All',
    status: 'All',
    sortBy: 'createdAt',
    order: 'desc'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    pages: 0
  });
  const { data: session } = useSession();

  const subjects = ['All', 'Math', 'Science', 'English', 'History', 'Geography', 'Computer Science', 'Other'];
  const statuses = ['All', 'Open', 'Solved', 'Closed'];
  const priorities = {
    'Low': 'bg-green-500',
    'Medium': 'bg-yellow-500',
    'High': 'bg-orange-500',
    'Urgent': 'bg-red-500'
  };

  const fetchDoubts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...filters
      });

      const response = await fetch(`/api/doubts?${params}`);
      if (response.ok) {
        const data = await response.json();
        setDoubts(data.doubts);
        setPagination(prev => ({ ...prev, ...data.pagination }));
      }
    } catch (error) {
      console.error('Error fetching doubts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, [filters, pagination.page]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-green-400 bg-green-400/10';
      case 'Solved': return 'text-blue-400 bg-blue-400/10';
      case 'Closed': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading doubts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Student Doubts</h1>
            <p className="text-gray-400">Ask questions, get answers, help others learn</p>
          </div>
          {session && (
            <Link
              href="/doubts/add"
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
            >
              Ask Doubt
            </Link>
          )}
        </div>

        {/* Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:ring-2 focus:ring-blue-500"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="createdAt">Date Created</option>
                <option value="updatedAt">Last Updated</option>
                <option value="views">Most Viewed</option>
                <option value="solutions">Most Solutions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
              <select
                value={filters.order}
                onChange={(e) => handleFilterChange('order', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Doubts Grid */}
        {doubts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">No doubts found</div>
            {session && (
              <Link
                href="/doubts/add"
                className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
              >
                Ask Your First Doubt
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doubts.map((doubt) => (
              <div key={doubt._id} className="relative group">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-2xl blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 h-full hover:border-gray-700 transition-colors duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doubt.status)}`}>
                        {doubt.status}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${priorities[doubt.priority]}`}></span>
                    </div>
                    <span className="text-xs text-gray-400">{doubt.subject}</span>
                  </div>

                  {/* Title */}
                  <Link href={`/doubts/${doubt._id}`}>
                    <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors cursor-pointer line-clamp-2">
                      {doubt.title}
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {truncateText(doubt.description, 120)}
                  </p>

                  {/* Tags */}
                  {doubt.tags && doubt.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {doubt.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded">
                          {tag}
                        </span>
                      ))}
                      {doubt.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded">
                          +{doubt.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
                    <div className="flex items-center space-x-4">
                      <span>{doubt.solutions?.length || 0} solutions</span>
                      <span>{doubt.views} views</span>
                    </div>
                    <div className="text-right">
                      <div>by {doubt.authorName}</div>
                      <div>{formatDate(doubt.createdAt)}</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/doubts/${doubt._id}`}
                    className="mt-4 w-full bg-gradient-to-r from-blue-600/20 to-teal-600/20 border border-blue-500/30 text-blue-400 py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600/30 hover:to-teal-600/30 transition-all duration-200 text-center block"
                  >
                    View Details
                  </Link>

                  <Meteors number={10} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              disabled={pagination.page === 1}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Previous
            </button>
            
            <span className="text-gray-400">
              Page {pagination.page} of {pagination.pages}
            </span>
            
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
              disabled={pagination.page === pagination.pages}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
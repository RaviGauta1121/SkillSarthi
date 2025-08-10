// app/my-doubts/page.js
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Meteors } from "@/components/Cards/MeteorCard";

export default function MyDoubtsPage() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const fetchMyDoubts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        author: session.user.id,
        status: filter === 'All' ? '' : filter,
        limit: '100' // Get all user's doubts
      });

      const response = await fetch(`/api/doubts?${params}`);
      if (response.ok) {
        const data = await response.json();
        setDoubts(data.doubts);
      }
    } catch (error) {
      console.error('Error fetching my doubts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchMyDoubts();
    }
  }, [session, filter]);

  const handleDeleteDoubt = async (doubtId) => {
    if (!confirm('Are you sure you want to delete this doubt? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/doubts/${doubtId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDoubts(prev => prev.filter(doubt => doubt._id !== doubtId));
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete doubt');
      }
    } catch (error) {
      console.error('Error deleting doubt:', error);
      alert('Failed to delete doubt');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Solved': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Closed': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const priorities = {
    'Low': 'bg-green-500',
    'Medium': 'bg-yellow-500',
    'High': 'bg-orange-500',
    'Urgent': 'bg-red-500'
  };

  const statuses = ['All', 'Open', 'Solved', 'Closed'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading your doubts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Doubts</h1>
            <p className="text-gray-400">Manage your questions and track solutions</p>
          </div>
          <Link
            href="/doubts/add"
            className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
          >
            Ask New Doubt
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 font-medium">Filter by status:</span>
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {['All', 'Open', 'Solved', 'Closed'].map(status => {
            const count = status === 'All' 
              ? doubts.length 
              : doubts.filter(d => d.status === status).length;
            return (
              <div key={status} className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">{count}</div>
                <div className="text-gray-400 text-sm">{status} Doubts</div>
              </div>
            );
          })}
        </div>

        {/* Doubts List */}
        {doubts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-4">
              {filter === 'All' ? 'No doubts yet' : `No ${filter.toLowerCase()} doubts`}
            </div>
            <Link
              href="/doubts/add"
              className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
            >
              Ask Your First Doubt
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {doubts.map((doubt) => (
              <div key={doubt._id} className="relative group">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.98] rounded-xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(doubt.status)}`}>
                          {doubt.status}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${priorities[doubt.priority]}`}></span>
                        <span className="text-gray-400 text-sm">{doubt.priority}</span>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-400 text-sm">{doubt.subject}</span>
                      </div>

                      {/* Title */}
                      <Link href={`/doubts/${doubt._id}`}>
                        <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors cursor-pointer">
                          {doubt.title}
                        </h3>
                      </Link>

                      {/* Description Preview */}
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {doubt.description.length > 150 
                          ? doubt.description.substring(0, 150) + '...'
                          : doubt.description
                        }
                      </p>

                      {/* Tags */}
                      {doubt.tags && doubt.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {doubt.tags.slice(0, 4).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded">
                              #{tag}
                            </span>
                          ))}
                          {doubt.tags.length > 4 && (
                            <span className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded">
                              +{doubt.tags.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Stats */}
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>{doubt.solutions?.length || 0} solutions</span>
                        <span>{doubt.views} views</span>
                        <span>Created {formatDate(doubt.createdAt)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2 ml-4">
                      <Link
                        href={`/doubts/${doubt._id}`}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors text-center"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDeleteDoubt(doubt._id)}
                        className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// app/doubts/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Meteors } from "@/components/Cards/MeteorCard";

export default function DoubtDetailPage({ params }) {
  const [doubt, setDoubt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submittingSolution, setSubmittingSolution] = useState(false);
  const [deletingDoubt, setDeletingDoubt] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { data: session } = useSession();
  const router = useRouter();

  const priorities = {
    'Low': 'bg-green-500',
    'Medium': 'bg-yellow-500',
    'High': 'bg-orange-500',
    'Urgent': 'bg-red-500'
  };

  const fetchDoubt = async () => {
    try {
      const response = await fetch(`/api/doubts/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched doubt data:', data); // Debug log
        setDoubt(data);
      } else if (response.status === 404) {
        router.push('/doubts');
      }
    } catch (error) {
      console.error('Error fetching doubt:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoubt();
  }, [params.id]);

  const handleDeleteDoubt = async () => {
    if (!confirm('Are you sure you want to delete this doubt? This action cannot be undone.')) {
      return;
    }

    setDeletingDoubt(true);
    try {
      const response = await fetch(`/api/doubts/${params.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/doubts');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete doubt');
      }
    } catch (error) {
      console.error('Error deleting doubt:', error);
      alert('Failed to delete doubt');
    } finally {
      setDeletingDoubt(false);
    }
  };

  const handleSolutionSubmit = async (data) => {
    if (!session) {
      alert('Please sign in to submit a solution');
      return;
    }

    setSubmittingSolution(true);
    try {
      const response = await fetch(`/api/doubts/${params.id}/solutions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: data.solution,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setDoubt(result.doubt);
        reset();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit solution');
      }
    } catch (error) {
      console.error('Error submitting solution:', error);
      alert('Failed to submit solution');
    } finally {
      setSubmittingSolution(false);
    }
  };

  const handleUpvote = async (solutionId) => {
    if (!session) {
      alert('Please sign in to upvote');
      return;
    }

    try {
      const response = await fetch(`/api/doubts/${params.id}/solutions/${solutionId}/upvote`, {
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        // Update the solution in the doubt
        setDoubt(prev => ({
          ...prev,
          solutions: prev.solutions.map(sol => 
            sol._id === solutionId 
              ? { ...sol, upvotes: result.upvotes, hasUpvoted: result.hasUpvoted }
              : sol
          )
        }));
      }
    } catch (error) {
      console.error('Error upvoting solution:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading doubt...</div>
      </div>
    );
  }

  if (!doubt) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Doubt not found</div>
          <Link href="/doubts" className="text-blue-400 hover:underline">
            Back to doubts
          </Link>
        </div>
      </div>
    );
  }

  // Fixed author ID comparison with multiple fallback options
  const getAuthorId = () => {
    if (!doubt.author) return null;
    // Try different possible field names for the author ID
    return doubt.author._id || doubt.author.id || doubt.author;
  };

  const isAuthor = session?.user?.id === getAuthorId();
  
  const hasUpvoted = (solution) => {
    return solution.upvotedBy?.includes(session?.user?.id);
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/doubts" className="text-blue-400 hover:underline text-sm">
            ← Back to doubts
          </Link>
        </div>

        {/* Main Doubt Card */}
        <div className="relative mb-8">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.98] rounded-2xl blur-3xl opacity-20" />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(doubt.status)}`}>
                  {doubt.status}
                </span>
                <span className={`w-3 h-3 rounded-full ${priorities[doubt.priority]}`}></span>
                <span className="text-gray-400 text-sm">{doubt.priority} Priority</span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-400 text-sm">{doubt.subject}</span>
              </div>
              {isAuthor && (
                <button
                  onClick={handleDeleteDoubt}
                  disabled={deletingDoubt}
                  className="text-red-400 hover:text-red-300 text-sm disabled:opacity-50"
                >
                  {deletingDoubt ? 'Deleting...' : 'Delete'}
                </button>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-4">{doubt.title}</h1>

            {/* Description */}
            <div className="text-gray-300 mb-6 whitespace-pre-wrap">
              {doubt.description}
            </div>

            {/* Image */}
            {doubt.imageUrl && (
              <div className="mb-6">
                <img
                  src={doubt.imageUrl}
                  alt="Doubt illustration"
                  className="max-w-full h-auto rounded-lg border border-gray-700"
                />
              </div>
            )}

            {/* Tags */}
            {doubt.tags && doubt.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {doubt.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Metadata */}
            <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-4">
              <div className="flex items-center space-x-4">
                <span>{doubt.solutions?.length || 0} solutions</span>
                <span>{doubt.views} views</span>
              </div>
              <div className="text-right">
                <div>Asked by {doubt.author?.name || 'Unknown'}</div>
                <div>{formatDate(doubt.createdAt)}</div>
              </div>
            </div>

            <Meteors number={15} />
          </div>
        </div>

        {/* Solutions Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Solutions ({doubt.solutions?.length || 0})
          </h2>

          {doubt.solutions && doubt.solutions.length > 0 ? (
            <div className="space-y-6">
              {doubt.solutions
                .sort((a, b) => b.upvotes - a.upvotes)
                .map((solution, index) => (
                <div key={solution._id} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    {/* Upvote Button */}
                    <div className="flex flex-col items-center space-y-1">
                      <button
                        onClick={() => handleUpvote(solution._id)}
                        disabled={!session}
                        className={`p-2 rounded-lg transition-colors ${
                          hasUpvoted(solution)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <span className="text-sm font-medium text-gray-400">{solution.upvotes}</span>
                    </div>

                    {/* Solution Content */}
                    <div className="flex-1">
                      <div className="text-gray-300 mb-4 whitespace-pre-wrap">
                        {solution.content}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          {solution.author?.image && (
                            <img
                              src={solution.author.image}
                              alt={solution.authorName}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <span>by {solution.authorName}</span>
                        </div>
                        <div>{formatDate(solution.createdAt)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No solutions yet. Be the first to help!</p>
            </div>
          )}
        </div>

        {/* Add Solution Form */}
        {session && doubt.status === 'Open' && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Your Solution</h3>
            <form onSubmit={handleSubmit(handleSolutionSubmit)} className="space-y-4">
              <div>
                <textarea
                  rows="6"
                  placeholder="Provide your solution here..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  {...register("solution", { 
                    required: "Solution content is required",
                    minLength: { value: 10, message: "Solution must be at least 10 characters" }
                  })}
                />
                {errors.solution && (
                  <span className="text-sm text-red-400 block mt-1">{errors.solution.message}</span>
                )}
              </div>
              <button
                type="submit"
                disabled={submittingSolution}
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingSolution ? 'Submitting...' : 'Submit Solution'}
              </button>
            </form>
          </div>
        )}

        {!session && (
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-4">Sign in to submit a solution</p>
            <Link
              href="/auth/signin"
              className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
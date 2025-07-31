"use client";
import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const DiaryEditor = () => {
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    if (!editorContent.trim() || editorContent === '<p>Start writing...</p>') {
      setSaveStatus('Please write something before saving!');
      return;
    }

    setLoading(true);
    setSaveStatus('Saving to database...');
    
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const diaryData = {
      userId: 'default-user', // You can make this dynamic later
      date: currentDate,
      time: currentTime,
      content: editorContent,
    };

    try {
      const response = await fetch('/api/saveDiary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diaryData),
      });

      if (!response.ok) throw new Error('Failed to save diary');

      const data = await response.json();
      console.log('Diary saved:', data);
      
      setSaveStatus('✅ Diary saved successfully!');
      
      // Wait a moment to show success message, then redirect
      setTimeout(() => {
        router.push('/dairy-list'); // Redirect to diary list page
      }, 2000);
      
    } catch (error) {
      console.error('Error saving diary:', error);
      setSaveStatus('❌ Failed to save diary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/dairy-list');
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 p-4">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">✍️ Write Your Diary</h1>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          disabled={loading}
        >
          ← Back to Diary
        </button>
      </div>

      {/* Editor Container */}
      <div className="bg-slate-700 p-4 rounded-lg shadow-lg">
        <Editor
          apiKey="eeme41m12gdi5laxpd35hwgkw8yvixa7rvsjzkae4ybafyw6"
          initialValue="<p>Start writing...</p>"
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help',
            content_style: `
              body {
                background-color: #374151;
                color: white;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
              }
            `,
            skin: 'oxide-dark',
            content_css: 'dark',
          }}
          onEditorChange={(content) => setEditorContent(content)}
          disabled={loading}
        />

        {/* Status Message */}
        {saveStatus && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            saveStatus.includes('✅') ? 'bg-green-100 text-green-700' : 
            saveStatus.includes('❌') ? 'bg-red-100 text-red-700' : 
            'bg-blue-100 text-blue-700'
          }`}>
            {saveStatus}
          </div>
        )}

        {/* Save Button Container */}
        <div className="mt-4 bg-black p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="text-white text-sm">
              {editorContent && editorContent !== '<p>Start writing...</p>' ? (
                <span>Ready to save • Characters: {editorContent.length}</span>
              ) : (
                <span>Start writing to enable save</span>
              )}
            </div>
            
            <button
              onClick={handleSave}
              disabled={loading || !editorContent.trim() || editorContent === '<p>Start writing...</p>'}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                loading 
                  ? 'bg-blue-400 text-white cursor-not-allowed' 
                  : (editorContent.trim() && editorContent !== '<p>Start writing...</p>')
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </div>
              ) : (
                '💾 Save Diary'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        Your diary will be automatically saved to the database when you click save.
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(DiaryEditor), { ssr: false });
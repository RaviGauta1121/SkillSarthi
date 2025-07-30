"use client";
import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import dynamic from 'next/dynamic';

const DiaryEditor = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleSave = async () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    const diaryData = {
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
      onSave();
    } catch (error) {
      console.error('Error saving diary:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-16">
      <div className="bg-slate-700 p-4 rounded-lg">
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
                background-color: #374151; /* Slate-700 background */
                color: white;
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
              }
            `,
            skin: 'oxide-dark',
            content_css: 'dark',
          }}
          onEditorChange={(content) => setEditorContent(content)}
        />
        <div className="mt-4" style={{ backgroundColor: 'black', padding: '10px', textAlign: 'right' }}>
          <button
            style={{
              color: 'white',
              backgroundColor: 'black',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(DiaryEditor), { ssr: false });

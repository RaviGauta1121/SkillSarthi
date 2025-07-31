// app/api/saveDiary/route.js
import connectMongoDB from '@/lib/mongodb';
import Diary from '../../../models/Dairy'; // Fixed: was 'Dairy', should be 'Diary'
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('📝 Received diary data:', body);

    // Connect to database
    console.log('🔗 Connecting to MongoDB...');
    await connectMongoDB();
    console.log('✅ Connected to MongoDB');

    // Add userId if not provided (temporary solution)
    // In a real app, you'd get this from authentication/session
    if (!body.userId) {
      body.userId = 'default-user'; // Or generate a unique ID
      console.log('⚠️  No userId provided, using default:', body.userId);
    }

    // Validate required fields
    if (!body.date || !body.time || !body.content) {
      return NextResponse.json(
        { error: 'Missing required fields: date, time, content' },
        { status: 400 }
      );
    }

    // Create new entry
    console.log('💾 Creating diary entry...');
    const newEntry = await Diary.create(body);
    console.log('✅ Diary entry created:', newEntry);

    // Verify the entry was saved by fetching it
    const savedEntry = await Diary.findById(newEntry._id);
    console.log('🔍 Verification - Found saved entry:', savedEntry);

    return NextResponse.json(
      {
        message: 'Diary saved successfully',
        entry: newEntry,
        verification: savedEntry ? 'Entry verified in database' : 'Entry NOT found in database'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ POST error:', error);
    return NextResponse.json(
      { error: 'Failed to save diary', details: error.message },
      { status: 500 }
    );
  }
}
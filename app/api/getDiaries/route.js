// app/api/getDiary/route.js
import connectMongoDB from '@/lib/mongodb';
import Diary from '../../../models/Dairy'; // Fixed: was 'Dairy', should be 'Diary'
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('🔗 Connecting to MongoDB for GET...');
    await connectMongoDB();
    console.log('✅ Connected to MongoDB');

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default-user';

    console.log('📖 Fetching diary entries for userId:', userId);
    
    // Fetch entries for specific user, sorted by newest first
    const diaries = await Diary.find({ userId })
      .sort({ createdAt: -1 }) // Sort by creation time instead of date string
      .lean(); // Use lean() for better performance
    
    console.log('📊 Found entries:', diaries.length);
    console.log('📋 First few entries:', diaries.slice(0, 2));

    return NextResponse.json({ 
      diaries, 
      count: diaries.length,
      userId 
    }, { status: 200 });
  } catch (error) {
    console.error('❌ GET error:', error);
    return NextResponse.json({
      message: 'Error fetching diaries',
      error: error.message
    }, { status: 500 });
  }
}
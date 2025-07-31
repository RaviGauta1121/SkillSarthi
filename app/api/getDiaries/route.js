// app/api/getDiary/route.js
export const dynamic = 'force-dynamic'; // 🔧 Tells Next.js this route is dynamic

import connectMongoDB from '@/lib/mongodb';
import Diary from '../../../models/Dairy'; // Assuming typo is fixed to 'Diary'
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    console.log('🔗 Connecting to MongoDB for GET...');
    await connectMongoDB();
    console.log('✅ Connected to MongoDB');

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || 'default-user';

    console.log('📖 Fetching diary entries for userId:', userId);
    
    const diaries = await Diary.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    
    console.log('📊 Found entries:', diaries.length);

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

import connectMongoDB from '@/lib/mongodb';
import Diary from '@/models/Dairy';
import { NextResponse } from 'next/server';


// Handle the GET request
export async function GET() {
  try {
    // Connect to the database
    await connectMongoDB();

    // Fetch all diary entries
    const diaries = await Diary.find().sort({ date: -1, time: -1 });

    // Return the diary entries as a response
    return NextResponse.json({ diaries }, { status: 200 });
  } catch (error) {
    console.error('Error fetching diaries:', error);
    return NextResponse.json({ message: 'Error fetching diaries', error: error.message }, { status: 500 });
  }
}

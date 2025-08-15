// app/api/doubts/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectMongoDB from "@/lib/mongodb";
import Doubt from "@/models/Doubt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET - Fetch all doubts
export async function GET(request) {
  try {
    await connectMongoDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const subject = searchParams.get('subject');
    const status = searchParams.get('status');
    const author = searchParams.get('author'); // Add author filter
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';
    
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    if (subject && subject !== 'All') filter.subject = subject;
    if (status && status !== 'All') filter.status = status;
    if (author) filter.author = author; // Add author filter
    
    // Build sort object
    const sort = {};
    sort[sortBy] = order === 'desc' ? -1 : 1;
    
    const doubts = await Doubt.find(filter)
      .populate('author', 'name email image')
      .populate('solutions.author', 'name email image')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Doubt.countDocuments(filter);
    
    return NextResponse.json({
      doubts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching doubts:", error);
    return NextResponse.json({ error: "Failed to fetch doubts" }, { status: 500 });
  }
}

// POST - Create a new doubt
export async function POST(request) {
  try {
    // Get session using NextAuth's getServerSession
    const session = await getServerSession(authOptions);
    
    console.log("🔍 Session check:", session);
    
    if (!session || !session.user) {
      console.log("❌ No session found");
      return NextResponse.json({ error: "Unauthorized - Please sign in" }, { status: 401 });
    }

    await connectMongoDB();
    
    const body = await request.json();
    const { title, description, imageUrl, subject, priority, tags } = body;
    
    console.log("📝 Creating doubt with data:", { title, description, subject, priority });
    console.log("👤 User info:", { id: session.user.id, name: session.user.name });
    
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" }, 
        { status: 400 }
      );
    }
    
    // Ensure we have author ID
    if (!session.user.id) {
      console.log("❌ No user ID in session");
      return NextResponse.json({ error: "User ID not found in session" }, { status: 401 });
    }
    
    const doubtData = {
      title,
      description,
      imageUrl: imageUrl || "",
      author: session.user.id,
      authorName: session.user.name || session.user.email || "Anonymous",
      subject: subject || 'Other',
      priority: priority || 'Medium',
      tags: tags || [],
    };
    
    console.log("💾 About to create doubt with:", doubtData);
    
    const newDoubt = await Doubt.create(doubtData);
    
    console.log("✅ Doubt created successfully:", newDoubt._id);
    
    // Populate the author field for the response
    await newDoubt.populate('author', 'name email image');
    
    return NextResponse.json({ 
      message: "Doubt created successfully", 
      doubt: newDoubt 
    }, { status: 201 });
    
  } catch (error) {
    console.error("❌ Error creating doubt:", error);
    return NextResponse.json({ 
      error: "Failed to create doubt", 
      details: error.message 
    }, { status: 500 });
  }
}
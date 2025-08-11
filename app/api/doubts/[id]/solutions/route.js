// app/api/doubts/[id]/solutions/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectMongoDB from "@/lib/mongodb";
import Doubt from "../../../models/Doubt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

// POST - Add solution to a doubt
export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    
    const { id } = params;
    const body = await request.json();
    const { content } = body;
    
    if (!content || content.trim() === '') {
      return NextResponse.json({ error: "Solution content is required" }, { status: 400 });
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid doubt ID" }, { status: 400 });
    }
    
    const doubt = await Doubt.findById(id);
    if (!doubt) {
      return NextResponse.json({ error: "Doubt not found" }, { status: 404 });
    }
    
    // Create new solution
    const newSolution = {
      content,
      author: session.user.id,
      authorName: session.user.name,
      createdAt: new Date(),
      upvotes: 0,
      upvotedBy: [],
    };
    
    // Add solution to doubt
    doubt.solutions.push(newSolution);
    await doubt.save();
    
    // Populate the updated doubt with author information
    const updatedDoubt = await Doubt.findById(id)
      .populate('author', 'name email image')
      .populate('solutions.author', 'name email image');
    
    return NextResponse.json({ 
      message: "Solution added successfully", 
      doubt: updatedDoubt 
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error adding solution:", error);
    return NextResponse.json({ error: "Failed to add solution" }, { status: 500 });
  }
}
// app/api/doubts/[id]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectMongoDB from "@/lib/mongodb";
import Doubt from "@/models/Doubt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

// GET - Fetch single doubt by ID
export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid doubt ID" }, { status: 400 });
    }
    
    const doubt = await Doubt.findById(id)
      .populate('author', 'name email image')
      .populate('solutions.author', 'name email image');
    
    if (!doubt) {
      return NextResponse.json({ error: "Doubt not found" }, { status: 404 });
    }
    
    // Increment view count
    await Doubt.findByIdAndUpdate(id, { $inc: { views: 1 } });
    
    return NextResponse.json(doubt);
  } catch (error) {
    console.error("Error fetching doubt:", error);
    return NextResponse.json({ error: "Failed to fetch doubt" }, { status: 500 });
  }
}

// PUT - Update doubt (only by author)
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    
    const { id } = params;
    const body = await request.json();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid doubt ID" }, { status: 400 });
    }
    
    const doubt = await Doubt.findById(id);
    if (!doubt) {
      return NextResponse.json({ error: "Doubt not found" }, { status: 404 });
    }
    
    // Check if user is the author
    if (doubt.author.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    const updatedDoubt = await Doubt.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true }
    ).populate('author', 'name email image');
    
    return NextResponse.json({ 
      message: "Doubt updated successfully", 
      doubt: updatedDoubt 
    });
    
  } catch (error) {
    console.error("Error updating doubt:", error);
    return NextResponse.json({ error: "Failed to update doubt" }, { status: 500 });
  }
}

// DELETE - Delete doubt (only by author)
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid doubt ID" }, { status: 400 });
    }
    
    const doubt = await Doubt.findById(id);
    if (!doubt) {
      return NextResponse.json({ error: "Doubt not found" }, { status: 404 });
    }
    
    // Check if user is the author
    if (doubt.author.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    await Doubt.findByIdAndDelete(id);
    
    return NextResponse.json({ message: "Doubt deleted successfully" });
    
  } catch (error) {
    console.error("Error deleting doubt:", error);
    return NextResponse.json({ error: "Failed to delete doubt" }, { status: 500 });
  }
}
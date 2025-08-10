// app/api/doubts/[id]/solutions/[solutionId]/upvote/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectMongoDB from "@/lib/mongodb";
import Doubt from "@/models/Doubt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

// POST - Toggle upvote on a solution
export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();
    
    const { id, solutionId } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(solutionId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    
    const doubt = await Doubt.findById(id);
    if (!doubt) {
      return NextResponse.json({ error: "Doubt not found" }, { status: 404 });
    }
    
    const solution = doubt.solutions.id(solutionId);
    if (!solution) {
      return NextResponse.json({ error: "Solution not found" }, { status: 404 });
    }
    
    const userId = session.user.id;
    const hasUpvoted = solution.upvotedBy.includes(userId);
    
    if (hasUpvoted) {
      // Remove upvote
      solution.upvotedBy.pull(userId);
      solution.upvotes = Math.max(0, solution.upvotes - 1);
    } else {
      // Add upvote
      solution.upvotedBy.push(userId);
      solution.upvotes += 1;
    }
    
    await doubt.save();
    
    return NextResponse.json({ 
      message: hasUpvoted ? "Upvote removed" : "Solution upvoted",
      upvotes: solution.upvotes,
      hasUpvoted: !hasUpvoted
    });
    
  } catch (error) {
    console.error("Error toggling upvote:", error);
    return NextResponse.json({ error: "Failed to toggle upvote" }, { status: 500 });
  }
}
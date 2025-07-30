import connectMongoDB from "@/lib/mongodb";
import Topic from "@/models/doubt";
import { NextResponse } from "next/server";

// Create a new topic
export async function POST(request) {
  try {
    const { title, description, author } = await request.json();

    if (!title || !description || !author) {
      return NextResponse.json({ message: "Title, description, and author are required" }, { status: 400 });
    }

    await connectMongoDB();
    await Topic.create({ title, description, author });
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating topic", error: error.message }, { status: 500 });
  }
}

// Get all topics
export async function GET() {
  try {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching topics", error: error.message }, { status: 500 });
  }
}

// Delete a topic
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await connectMongoDB();
    const deletedTopic = await Topic.findByIdAndDelete(id);

    if (!deletedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting topic", error: error.message }, { status: 500 });
  }
}

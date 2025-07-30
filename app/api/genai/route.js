import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Generative AI with API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY not found in environment variables" },
        { status: 500 }
      );
    }

    // Parse the request body
    const { message } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Load the Gemini model (updated model name)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate the content
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });

  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    
    // Handle specific API key errors
    if (error.message?.includes("API key not valid")) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your GEMINI_API_KEY in environment variables." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}

// Optional: Add GET method for health check
export async function GET() {
  return NextResponse.json({ 
    status: "Gemini API route is working",
    hasApiKey: !!process.env.GEMINI_API_KEY
  });
}
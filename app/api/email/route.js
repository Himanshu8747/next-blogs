import { connectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

// Connect to the database
const LoadDB = async () => {
  await connectDB();
};
LoadDB();

// API route to handle POST requests
export async function POST(request) {
  try {
    const { email } = await request.json();

    // Check if email is provided
    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required." });
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address." });
    }

    // Check if the email already exists
    const existingEmail = await EmailModel.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ success: false, message: "Email is already subscribed." });
    }

    // Create a new email document
    const emailData = new EmailModel({ email });
    await emailData.save();

    return NextResponse.json({ success: true, message: "Email subscribed successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error subscribing email!" });
  }
}

export async function GET() {
  try {
    const emails = await EmailModel.find();
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error fetching emails." });
  }
}

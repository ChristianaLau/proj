import { NextResponse } from 'next/server';
import connect from "@/lib/db";
import { currentUser } from '@clerk/nextjs/server';
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;

    await connect();
    console.log("Connected to DB");

    const db = mongoose.connection.db;
    const collection = db.collection("Nutrixa_Users");

    // Find the user by email
    const userDoc = await collection.findOne({ email: email });
    console.log("User Document: ", userDoc);

    if (userDoc) {
      // If the user exists, extract the AI plan
      const aiPlan = userDoc.AIplan;

      if (aiPlan) {
        return NextResponse.json(aiPlan, { status: 200 });
      } else {
        return NextResponse.json({ message: 'AI plan not found' }, { status: 404 });
      }
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

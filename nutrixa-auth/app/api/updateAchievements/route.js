import { NextResponse } from 'next/server';
import connect from "@/lib/db";
import { currentUser } from '@clerk/nextjs/server';
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) {
      console.log("User not authenticated");
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;
    console.log("Authenticated user:", email);

    await connect();
    console.log("Connected to the database");

    const db = mongoose.connection.db;
    const collection = db.collection("Nutrixa_Users");

    // Fetch the user's data
    const userDoc = await collection.findOne({ email });
    if (!userDoc) {
      console.log("User document not found for email:", email);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Log the current achievements
    console.log("Current achievements:", userDoc.achievements);

    const newAchievements = {
      achievement1: userDoc.daysGoalMet > 1, 
      achievement2: userDoc.daysSleepGoalMet > 1,  
      achievement3: userDoc.daysMeditationGoalMet > 1,  
      achievement4: userDoc.achievements?.achievement4 || false, 
      achievement5: userDoc.achievements?.achievement5 || false, 
      achievement6: userDoc.achievements?.achievement6 || false, 
      achievement7: userDoc.achievements?.achievement7 || false, 
      achievement8: userDoc.achievements?.achievement8 || false, 
      achievement9: userDoc.achievements?.achievement9 || false, 
      achievement10: userDoc.achievements?.achievement10 || false, 
      achievement11: userDoc.achievements?.achievement11 || false,
      achievement12: userDoc.achievements?.achievement12 || false, 
    };

    console.log("New achievements to be set:", newAchievements);

    // Update the achievements only if they have changed
    const updateResult = await collection.updateOne(
      { email },
      { $set: { achievements: newAchievements } }
    );

    // Always return the achievements, even if no update was necessary
    return NextResponse.json({ success: true, achievements: newAchievements }, { status: 200 });

  } catch (error) {
    console.error('Error updating achievements:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.toString() }, { status: 500 });
  }
}

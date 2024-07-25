// app/api/dashboard/route.js
import { NextResponse } from 'next/server';
import connect from "@/lib/db";
import { currentUser } from '@clerk/nextjs/server';
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(req) {
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

    const userDoc = await collection.findOne({ email: email });
    console.log("User Document: ", userDoc);

    const diets = userDoc.diets;
    const goal = userDoc.goal;
    const person = userDoc.person;

    console.log("Diets: ", diets);
    console.log("Goal: ", goal);
    console.log("Person: ", person);

    // Initialize Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prepare prompt with user data
    const prompt = `Suggest a workout and meal plan for a person of gender: ${person.gender}, aged: ${new Date().getFullYear() - new Date(person.dob).getFullYear()} years old, 
    weighing: ${person.weight}, height: ${person.height}, with the following dietary restrictions: ${JSON.stringify(diets)} and the goal: ${JSON.stringify(goal)}.
    Return 7 days of sugguestions for both the workout and meal plan. Return it in an array format [ [workout1, workout2, workout3, workout4, workout5, workout6, workout7], [meal1, meal2, meal3, meal4, meal5, meal6, meal7] ]`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    console.log("Response Text:", text);
    const suggestions = JSON.parse(text);
    console.log("Suggestions: ", suggestions);

    if (userDoc) {
      const updatedUserDoc = await collection.findOneAndUpdate(
        { email: email },
        {
          $set: {
            AIplan: {
                plan: suggestions,
            },
          },
        },
        { returnDocument: 'after' }
      );
    client.close();

    return NextResponse.json(suggestions, { status: 200 });
  }}
  catch (error) {
    console.error('Error handling request:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
    
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: 'GET' } });
}
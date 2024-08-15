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

    const { gender,
        height,
        dob,
        weight,
        medicalConditions }
         = await req.json();
    const email = user.emailAddresses[0].emailAddress;

    await connect();
    console.log("Connected to DB");

    const db = mongoose.connection.db;
    const collection = db.collection("Nutrixa_Users");

    const allUsers = await collection.find({}).toArray();
    console.log("All Users in Collection:", allUsers);


    const userDoc = await collection.findOne({ email: email });
    console.log("User Document: ", userDoc);

    if (userDoc) {
      const updatedUserDoc = await collection.findOneAndUpdate(
        { email: email },
        {
          $set: {
            person: {
                gender,
                height,
                dob,
                weight,
                medicalConditions,
                Submitted: true,  
            },
          },
        },
        { returnDocument: 'after' }
      );

      return NextResponse.json(updatedUserDoc._id.toString(), { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
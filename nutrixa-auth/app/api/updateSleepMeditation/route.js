import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

export async function POST(req) {
    console.log("POST request received at /updateSleepMeditation");

    try {
        const user = await currentUser();
        console.log("Fetched current user:", user);

        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { sleep, meditation } = await req.json();
        console.log("Parsed request body:", { sleep, meditation });

        const email = user.emailAddresses[0].emailAddress;
        console.log("User email extracted:", email);

        await connect();
        console.log("Connected to the database");

        const db = mongoose.connection.db;
        const collection = db.collection("Nutrixa_Users");

        const userDoc = await collection.findOne({ email: email });
        console.log("Fetched user document:", userDoc);

        if (userDoc) {
            let daysSleepGoalMet = userDoc.daysSleepGoalMet || 0;
            let daysMeditationGoalMet = userDoc.daysMeditationGoalMet || 0;

            if (sleep > 8) {
                daysSleepGoalMet += 1;
            } else {
                daysSleepGoalMet = 0;
            }

            if (meditation > 1) {
                daysMeditationGoalMet += 1;
            } else {
                daysMeditationGoalMet = 0; 
            }

            console.log("daysSleepGoalMet updated to:", daysSleepGoalMet);
            console.log("daysMeditationGoalMet updated to:", daysMeditationGoalMet);

            const updateResult = await collection.updateOne(
                { email: email },
                {
                    $set: {
                        daysSleepGoalMet: daysSleepGoalMet,
                        daysMeditationGoalMet: daysMeditationGoalMet,
                    },
                }
            );
            console.log("Update operation result:", updateResult);

            // Fetch the updated document after the update operation
            const updatedUserDoc = await collection.findOne({ email: email });
            console.log("User document after update:", updatedUserDoc);

            if (updatedUserDoc) {
                // Ensure that any ObjectId is converted to string before returning
                updatedUserDoc._id = updatedUserDoc._id.toString();
                console.log("Converted _id to string");

                return NextResponse.json(updatedUserDoc, { status: 200 });
            } else {
                console.log("Failed to fetch updated document");
                return NextResponse.json({ message: 'Failed to fetch updated document' }, { status: 500 });
            }
        } else {
            console.log("User not found in the database");
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.toString() }, { status: 500 });
    }
}

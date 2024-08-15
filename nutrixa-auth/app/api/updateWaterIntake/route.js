// app/updateWaterIntake/route.js

import { NextResponse } from 'next/server';
import connect from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

export async function POST(req) {
    console.log("POST request received at /updateWaterIntake");

    try {
        const user = await currentUser();
        console.log("Fetched current user:", user);
        
        if (!user) {
            console.log("Unauthorized access attempt");
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { intake, goal } = await req.json();
        console.log("Parsed request body:", { intake, goal });
        
        const email = user.emailAddresses[0].emailAddress;
        console.log("User email extracted:", email);

        await connect();
        console.log("Connected to the database");

        const db = mongoose.connection.db;
        const collection = db.collection("Nutrixa_Users");

        const userDoc = await collection.findOne({ email: email });
        console.log("Fetched user document:", userDoc);

        if (userDoc) {
            let daysGoalMet = userDoc.daysGoalMet || 0;
            if (intake >= goal) {
                daysGoalMet += 1; 
            } else {
                daysGoalMet = 0; 
            }
            console.log("daysGoalMet updated to:", daysGoalMet);

            const updateResult = await collection.updateOne(
                { email: email },
                {
                    $set: {
                        daysGoalMet: daysGoalMet, 
                    },
                }
            );
            console.log("Update operation result:", updateResult);

            return NextResponse.json({ message: 'daysGoalMet updated successfully' }, { status: 200 });
        } else {
            console.log("User not found in the database");
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.toString() }, { status: 500 });
    }
}

export function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: { Allow: 'POST' } });
  }
  import connect from '@/lib/db';
  import { currentUser } from '@clerk/nextjs/server';
  import mongoose from "mongoose";
  import { NextResponse } from 'next/server';
  
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
  
      if (userDoc && userDoc.person && userDoc.person.weight_update) {
        return NextResponse.json({ success: true, data: userDoc.person.weight_update }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'User or weight update data not found' }, { status: 404 });
      }
    } catch (error) {
      console.error('Error handling GET request:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
  
  export function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: { Allow: 'GET' } });
  }
import connect from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    const user = await currentUser();
    if (!user) {
      console.error('Unauthorized access: No user found.');
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const email = user.emailAddresses[0].emailAddress;

    await connect();
    const db = mongoose.connection.db;
    const collection = db.collection("Nutrixa_Users");

    const userDoc = await collection.findOne({ email: email });

    if (userDoc) {
      console.log('User found:', {
        diets: userDoc.diets,
        goal: userDoc.goal,
        person: userDoc.person
      });

      return new Response(JSON.stringify({
        diets: userDoc.diets,
        goal: userDoc.goal,
        person: userDoc.person,
        firstName: userDoc.firstName,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.error('User not found for email:', email);
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

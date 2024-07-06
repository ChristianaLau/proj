import { NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { vegetarian, vegan, halal, kosher, glutenFree, dairyFree, nutFree, other, otherText } = await req.json();
    const email = user.emailAddresses[0].emailAddress;

    await connectDB();
    console.log("Connected to DB");


    //issue w/ email & collection
    const db = mongoose.connection.db;
    const collection = db.collection("users");

    const userDoc = await collection.findOne({ email: email });
    console.log("User Document: ", userDoc);

    if (userDoc) {
      const updatedUserDoc = await collection.findOneAndUpdate(
        { email: email },
        {
          $set: {
            diets: {
              vegetarian,
              vegan,
              halal,
              kosher,
              glutenFree,
              dairyFree,
              nutFree,
              other,
              otherText,
            },
          },
        },
        { returnDocument: 'after' }
      );

      return NextResponse.json(updatedUserDoc.value, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

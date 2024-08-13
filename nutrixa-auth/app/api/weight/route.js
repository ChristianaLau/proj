import connect from '@/lib/db';
import WeightUpdate from '../../trackers/weight/weighttrack'
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
      const { weight } = await req.json();
  
      await connect();
      console.log("Connected to DB");
  
      const newWeight = await WeightUpdate.create({ weight });
      console.log("New Weight Entry: ", newWeight);
  
      return NextResponse.json({ success: true, data: newWeight }, { status: 201 });
    } catch (error) {
      console.error('Error handling POST request:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
  }
  
  export function OPTIONS() {
    return NextResponse.json({}, { status: 200, headers: { Allow: 'POST' } });
  }
  
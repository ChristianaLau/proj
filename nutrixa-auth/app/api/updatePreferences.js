import connect from db.js
import { useAuth } from '@clerk/clerk-react';
import { useSession } from 'next-auth/client';

export default async function updatePreferences(req, res, dietaryPreferences) {
    const { user } = useAuth();
    const session = useSession();
    
    if (req.method === 'POST') {
        dietaryPreferences = req.body;
    
        const db = await connect();
        const collection = db.collection('users');
    
        const userDoc = await collection.findOne({ email: session.user.email });
    
        if (userDoc) {
        const updatedUserDoc = await collection.findOneAndUpdate(
            { email: session.user.email },
            {
            $set: { preferences: dietaryPreferences},
            },
            { returnOriginal: false }
        );
    
        res.status(200).json(updatedUserDoc.value);
        } else {
        res.status(404).json({ message: 'User not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
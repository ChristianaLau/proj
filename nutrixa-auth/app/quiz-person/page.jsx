'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const QuizPage = () => {
  const router = useRouter();

  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [dob, setDob] = useState('');
  const [weight, setWeight] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case 'gender':
        setGender(value);
        break;
      case 'height':
        setHeight(value);
        break;
      case 'dob':
        setDob(value);
        break;
      case 'weight':
        setWeight(value);
        break;
      case 'medicalConditions':
        setMedicalConditions(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/updatePerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gender,
          height,
          dob,
          weight,
          medicalConditions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Image className="mx-auto" src="/person.png" width={300} height={300} alt="Fitness" />
      <div className="bg-blue-500 rounded-2xl mx-8 p-4 m-4"      
        style={{
          width: '700px',
          height: '600px',
          display: 'flex',
          flexDirection: 'column', // Ensure items stack vertically
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
          marginTop: '40px',
          backgroundColor: "#F9F9F9",
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          textAlign: 'center' // Center aligns content horizontally
        }}>
        <h1 style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', fontSize: '30px', marginBottom: '20px' }}>Select Your Information:</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl p-4">
          <div className="bg-blue-800 rounded-2xl p-4 flex flex-col justify-center" style={{ backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <label htmlFor="gender" className="text-black mb-2">Gender</label>
            <select id="gender" value={gender} onChange={handleFormChange} className="p-2 border border-gray-300 rounded" required>
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 flex flex-col justify-center" style={{ backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <label htmlFor="height" className="text-black mb-2">Height</label>
            <input type="text" id="height" value={height} onChange={handleFormChange} className="p-2 border border-gray-300 rounded" required  placeholder="e.g., 5'8''" />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 flex flex-col justify-center" style={{ backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <label htmlFor="dob" className="text-black mb-2">Date of Birth</label>
            <input type="date" id="dob" value={dob} onChange={handleFormChange} className="p-2 border border-gray-300 rounded" />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 flex flex-col justify-center" style={{ backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <label htmlFor="weight" className="text-black mb-2">Weight</label>
            <input type="text" id="weight" value={weight} onChange={handleFormChange} className="p-2 border border-gray-300 rounded" required  placeholder="e.g., 70kg" />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 flex flex-col justify-center col-span-1 md:col-span-2" style={{ backgroundColor: "#FEFEFE", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <label htmlFor="medicalConditions" className="text-black mb-2">Medical Conditions</label>
            <textarea id="medicalConditions" value={medicalConditions} onChange={handleFormChange} className="p-2 border border-gray-300 rounded" placeholder="Please specify any medical conditions" required></textarea>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button type="submit" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: "#5DB075", width: '300px', height: '40px', marginTop: '30px' }}>Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizPage;

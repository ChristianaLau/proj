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
    <div className="">
      <Image className="mx-auto" src="/person.png" width={300} height={300} alt="Fitness" />
      <h1 className="font-serif text-3xl text-center">Provide Your Information:</h1>
      <div className="bg-blue-500 rounded-2xl mx-8 p-4 m-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="gender" className="text-white mr-4">Gender</label>
            <select id="gender" value={gender} onChange={handleFormChange} className="mt-2 p-2 w-full border border-gray-300 rounded">
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="height" className="text-white mr-4">Height</label>
            <input type="text" id="height" value={height} onChange={handleFormChange} className="mt-2 p-2 w-full border border-gray-300 rounded" placeholder="e.g., 5'8''" />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="dob" className="text-white mr-4">Date of Birth</label>
            <input type="date" id="dob" value={dob} onChange={handleFormChange} className="mt-2 p-2 w-full border border-gray-300 rounded" />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="weight" className="text-white mr-4">Weight</label>
            <input type="text" id="weight" value={weight} onChange={handleFormChange} className="mt-2 p-2 w-full border border-gray-300 rounded" placeholder="e.g., 70kg" />
          </div>
          <div className="bg-blue-800 rounded-2xl p-4 mx-auto">
            <label htmlFor="medicalConditions" className="text-white mr-4">Medical Conditions</label>
            <textarea id="medicalConditions" value={medicalConditions} onChange={handleFormChange} className="mt-2 p-2 w-full border border-gray-300 rounded" placeholder="Please specify any medical conditions"></textarea>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button type="submit" className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizPage;

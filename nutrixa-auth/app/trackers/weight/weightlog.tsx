'use client'
import { useState } from 'react';
import styles from './weight.module.css'

export default function WeightLog() {
  const [weight, setWeight] = useState('');
  const [save, setSave] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const res = await fetch(('/api/weight'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight }),
      });

      const data = await res.json();
      if (data.success) {
        setSave('Weight saved successfully!');
        setWeight('');

    } else {
        setSave('Failed to save weight.');
      }
    } catch (error) {
      setSave('Error occurred while saving weight.');
    }
}
;

return (
    <div className='flex flex-col items-center justify-center' >
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter your weight"
          required
          className={styles.input}
        />
        <button type="submit"
        className=" p-2 px-4 bg-green-300 text-white rounded-lg hover:bg-green-400 transition duration-300"
        >Update Your Weight</button>
      </form>
      {save && 
      <p>{save}</p>}
    </div>
  );
}
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter your weight"
          required
          className={styles.input}
        />
        <button type="submit">Update Your Weight</button>
      </form>
      {save && 
      <p>{save}</p>}
    </div>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import './achievements.css'; 

const Achievements = () => {
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [boxVisible, setBoxVisible] = useState(true);
  const router = useRouter(); 

  const handleFadeOut = () => {
    setFadeClass('fade-out');
  };

  useEffect(() => {
    if (fadeClass === 'fade-out') {
      const timer = setTimeout(() => {
        setBoxVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [fadeClass]);

  const goToDashboard = () => {
    router.push("/dashboard"); 
  };


  const gridItems = [
    { imageSrc: '/achievement1.png', description: 'Log into Nutrixa every day for a week' },
    { imageSrc: '/achievement4.png', description: 'Follow your diet plan for a week' },
    { imageSrc: '/achievement2.png', description: 'Follow your diet plan for three weeks' },
    { imageSrc: '/achievement3.png', description: 'Drink 12 cups of water every day for two weeks' },
    { imageSrc: '/achievement5.png', description: 'Follow your workout routine for three weeks' },
    { imageSrc: '/achievement6.png', description: 'Complete the quiz completely and review your goals' },
    { imageSrc: '/achievement7.png', description: 'Complete all health tasks for a month' },
    { imageSrc: '/achievement8.png', description: 'Sleep 7-8 hours for a week' },
    { imageSrc: '/achievement9.png', description: 'Complete a personal goal' },
    { imageSrc: '/achievement10.png', description: 'Spend 1 hour a day to meditate for a month' },
    { imageSrc: '/achievement12.png', description: 'Complete all personal goals' },
    { imageSrc: '/achievement11.png', description: 'Complete all achievements' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>

      {boxVisible && (
        <div className={`container ${fadeClass}`}>
          <h1>Complete Tasks, Get Medals!</h1>
          <Image
            src="/bling.jpg"
            alt="Medal"
            width={300}
            height={300}
            className={fadeClass}
          />
          <button onClick={handleFadeOut} className={fadeClass}>Got it</button>
        </div>
      )}

      {!boxVisible && (
        <div className="hidden-text visible">
          <h2 className="achievement-title">Christiana's Achievements</h2>
          <div className="grid-container">
            <div className="grid-item">
              <Image
                src="/bronze.png"
                alt="Bronze Medal"
                width={200}
                height={200}
                className='medal'
              />
            </div>
            <div className="grid-item">
              <Image
                src="/ruby.png"
                alt="Ruby Medal"
                width={200}
                height={200}
                className='medal'
              />
            </div>
            <div className="grid-item">
              <Image
                src="/platinum.png"
                alt="Platinum Medal"
                width={200}
                height={200}
                className='medal'
              />
            </div>
          </div>

          {/*Vertical container section */}
          <div className="vertical-container">
            <div className="vertical-section">
              <h3>Medals Obtained</h3>
              <p>3</p>
            </div>
            <div className="vertical-section">
              <h3 className='quests'>Quests Completed</h3>
              <p>5</p>
            </div>
            <div className="vertical-section">
              <h3>Personal Goals Completed</h3>
              <p>2</p>
            </div>
          </div>

          <h2 className='total-quests'>Total Quests</h2>
          <div className="empty-grid-container">
            {gridItems.map((item, index) => (
              <div key={index} className="empty-grid-item">
                <Image
                  src={item.imageSrc}
                  alt={`Achievement ${index + 1}`}
                  width={250}
                  height={250}
                />
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;

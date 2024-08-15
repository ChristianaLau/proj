"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useUser } from '@clerk/nextjs'; 
import './achievements.css'; 

interface AchievementsData {
  achievement1?: boolean;
  achievement2?: boolean;
  achievement3?: boolean;
  achievement4?: boolean;
  achievement5?: boolean;
  achievement6?: boolean;
  achievement7?: boolean;
  achievement8?: boolean;
  achievement9?: boolean;
  achievement10?: boolean;
  achievement11?: boolean;
  achievement12?: boolean;
}

const Achievements = () => {
  const { user } = useUser(); // Fetch the user
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [boxVisible, setBoxVisible] = useState(true);
  const [achievements, setAchievements] = useState<AchievementsData>({});
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

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch('/api/updateAchievements', {
          method: 'POST',
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched Achievements Data: ", data.achievements);  // Log the entire response
          setAchievements(data.achievements || {});  // Ensure the state is set even if no changes were made
        } else {
          console.error('Failed to fetch achievements');
        }
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };
  
    fetchAchievements();
  }, []);
  
  // Count the number of achievements completed
  const completedCount = Object.values(achievements).filter(Boolean).length;

  // Log the achievements state whenever it updates
  useEffect(() => {
    console.log("Achievements State: ", achievements);  // Log the state of achievements
  }, [achievements]);

  const gridItems = [
    { imageSrc: '/achievement1.png', description: 'Log into Nutrixa every day for a week',achieved: achievements?.achievement11 },
    { imageSrc: '/achievement4.png', description: 'Follow your diet plan for a week', achieved: false }, 
    { imageSrc: '/achievement2.png', description: 'Follow your diet plan for three weeks', achieved: false },
    { imageSrc: '/achievement3.png', description: 'Meet your water goal every day for a month', achieved: achievements?.achievement1 }, 
    { imageSrc: '/achievement5.png', description: 'Follow your workout routine for three weeks', achieved: false },
    { imageSrc: '/achievement6.png', description: 'Complete the quiz completely and review your goals', achieved: achievements?.achievement6  },
    { imageSrc: '/achievement7.png', description: 'Complete all health tasks for a month', achieved: false },
    { imageSrc: '/achievement8.png', description: 'Sleep 7-8 hours for a week', achieved: achievements?.achievement2 }, 
    { imageSrc: '/achievement9.png', description: 'Complete a personal goal', achieved: false },
    { imageSrc: '/achievement10.png', description: 'Spend 1 hour a day to meditate for a month', achieved: achievements?.achievement3 }, 
    { imageSrc: '/achievement12.png', description: 'Complete all personal goals', achieved: false },
    { imageSrc: '/achievement11.png', description: 'Complete all achievements', achieved: false },
  ];

  return (
    <div className="parent">
      <div className="hidden-text visible">
        <h2 className="achievement-title">{user?.firstName || "User"}'s Achievements</h2>
        <div className="grid-container">
          {completedCount >= 1 && (
            <div className="grid-item">
              <Image
                src="/bronze.png"
                alt="Bronze Medal"
                width={200}
                height={200}
                className='medal'
              />
            </div>
          )}
          {completedCount >= 2 && (
            <div className="grid-item">
              <Image
                src="/ruby.png"
                alt="Ruby Medal"
                width={200}
                height={200}
                className='medal'
              />
            </div>
          )}
          {completedCount >= 3 && (
            <div className="grid-item">
              <Image
                src="/platinum.png"
                alt="Platinum Medal"
                width={200}
                height={200}
                className='medal'
              />
            </div>
          )}
        </div>

        <div className="vertical-container">
          <div className="vertical-section">
            <h3 className="vertical-section-title">Medals Obtained</h3>
            <p className="vertical-section-text">{completedCount >= 3 ? 3 : completedCount}</p>
          </div>
          <div className="vertical-section">
            <h3 className="vertical-section-title quests">Quests Completed</h3>
            <p className="vertical-section-text">{completedCount}</p>
          </div>
          <div className="vertical-section">
            <h3 className="vertical-section-title">Personal Goals Completed</h3>
            <p className="vertical-section-text">2</p>
          </div>
        </div>

        <h2 className="total-quests">Total Quests</h2>
        <div className="empty-grid-container">
          {gridItems.map((item, index) => (
            <div key={index} className={`empty-grid-item ${item.achieved ? 'achieved' : ''}`}>
              <Image
                src={item.imageSrc}
                alt={`Achievement ${index + 1}`}
                width={250}
                height={250}
              />
              <p className={`grid-item-text ${item.achieved ? 'strikethrough' : ''}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;

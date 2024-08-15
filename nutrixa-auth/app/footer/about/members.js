import React from 'react';
import styles from './about.module.css';

const Members = () => {
  const frontend = [
    { name: 'Christina Nembang', image: '/about4.png' },
    { name: 'Valery Romelus', image: '/about3.jpg' },
  ];
  const backend = [
    { name: 'Christiana Lau', image: '/about2.png' },
    { name: 'William McPhail', image: '/about1.png' },
  ];

  return (
    <div>
      <h3>Frontend</h3>
      <div className={styles.container}>
        {frontend.map((member, index) => (
          <div key={index} className={styles.member}>
            <img src={member.image} alt={member.name} className={styles.image} />
            <span className={styles.name}>{member.name}</span>
          </div>
        ))}
      </div>
      
      <h3>Backend</h3>
      <div className={styles.container}>
        {backend.map((member, index) => (
          <div key={index} className={styles.member}>
            <img src={member.image} alt={member.name} className={styles.image} />
            <span className={styles.name}>{member.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
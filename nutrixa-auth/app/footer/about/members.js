import React from 'react';
import styles from './about.module.css';

const Members = () => {
  const members = [
    { name: 'Christina Nembang', image: '/about4.png' },
    { name: 'Christiana Lau', image: '/about2.png' },
    { name: 'Valery Romelus', image: '/about3.jpg' },
    { name: 'William McPhail', image: '/about1.png' },
  ];

  return (
    <div className={styles.container}>
      {members.map((member, index) => (
        <div key={index} className={styles.member}>
          <img src={member.image} alt={member.name} className={styles.image} />
          <span className={styles.name}>{member.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Members;
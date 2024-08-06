import React from 'react'; 
import './page.css';
import './programs.css';
import './header.css';

import header from './header';
import Image from "next/image";
import Link from "next/link";

const programsData = [
  {
    image: '/dumbell.png',
    heading: "Strength Training",
    details: "In this program, you'll be able to target different muscle groups. Be ready to improve your body composition or simply get stronger!",
  },
  {
    image: '/running.png',
    heading: "Cardio Training",
    details: "In this program, be ready to boost your cardiovascular health, increase endurance, and burn calories effectively. ",
  },
  {
    image: '/flame.png',
    heading: "Fat Burning",
    details: "This program is suitable for you who wants to get rid of your stubborn fat and lose their weight. Full of high-intensity interval training (HIIT) workouts.",
  },
  {
    image: '/heart.png',
    heading: "Health Fitness",
    details: "This programs is designed for those who want to improve your overall well-being and longevity. Enjoy better energy levels, reduced stress, and improved mood.",
  },
];

const Page = () => {
  return (
    
    <div className="page" id="home">
      <div className="blur-dot blur-dot-1"></div>
      <div className="blur-dot blur-dot-2"></div>
      <div className="blur-dot blur-dot-3"></div>
      <div className="blur-dot blur-dot-4"></div>

      <div className="left-h">
        <header/>

        <div className="page-text">
          <div><span>Feel Good,</span></div>
          <div><span>Get Fit,</span></div>
          <div><span>Start today!</span></div>
        </div>

        <img src='/woman.png' alt="" className="woman-image"/>
      </div>

      <div className="right-h"></div>

      <div className="Programs" id="programs">
        <div className="programs-header">
          <span className="stroke-text">Programs</span>
          <span>Built Just</span>
          <span className="stroke-text">For You</span>
        </div>
 
        <div className="program-categories">
          {programsData.map((program, index) => (
            <div className="category" key={index}>
              <img src={program.image} alt={program.heading} />
              <span>{program.heading}</span>
              <span>{program.details}</span>
              <div className="join-now"><span> </span></div>
            </div>
          ))}
        </div>
      </div>

      

       {/*Strength Training More Info */}
       <Link href='more-info' className='px-4 py-2 text-white  rounded-3xl hover:bg-lime-400 transition duration-600' style={{ position: 'relative', top: '1060px', right: '1370px', whiteSpace: 'nowrap' }}>
          More Info
        </Link>

        {/*Cardio Training More Info */}
        <Link href='more-info2' className='px-4 py-2 text-white  rounded-3xl hover:bg-lime-400 transition duration-600' style={{ position: 'relative', top: '1060px', right: '1130px', whiteSpace: 'nowrap' }}>
          More Info
        </Link>

        {/*Fat Burning More Info */}
        <Link href='more-info3' className='px-4 py-2 text-white rounded-3xl hover:bg-lime-400 transition duration-600' style={{ position: 'relative', top: '1060px', right: '885px', whiteSpace: 'nowrap' }}>
          More Info
        </Link>

        {/*Health Fitness More Info */}
        <Link href='more-info4' className='px-4 py-2 text-white  rounded-3xl hover:bg-lime-400 transition duration-600' style={{ position: 'relative', top: '1060px', right: '645px', whiteSpace: 'nowrap' }}>
          More Info
        </Link>

      <div className="Reasons" id="reasons">
        <div className="left-r">
          <img src='/gym.png' alt="Gym" />
        </div>
        <div className="right-r">
          <span>some reasons</span>
          <div>
            <span>Why</span>
            <span> choose us?</span>
          </div>
          <div className="details-r">
            <div><img src='/check.png' alt="Check" /><span> Tailored workouts for you personally </span></div>
            <div><img src='/check.png' alt="Check" /><span> Real-time feedback </span></div>
            <div><img src='/check.png' alt="Check" /><span> Eliminates the need for hours of research </span></div>
            <div><img src='/check.png' alt="Check" /><span> We offer a variety of workouts and meal plans</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;


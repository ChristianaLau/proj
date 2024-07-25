import React from 'react' 
import './page.css'
import './programs.css';

import header from './header'
import Image from "next/image";
import Link from "next/link";

const programsData = [
  {
    image: '/dumbell.png',
    heading: "Strength Training",
    details:
      "In this program, you'll be able to target different muscle groups. Be ready to improve your body composition or simply get stronger!",
  },
  {
    image: '/running.png',
    heading: "Cardio Training",
    details:
      "In this program, be ready to boost your cardiovascular health, increase endurance, and burn calories effectively. ",
  },
  {
    image: '/flame.png',
    heading: "Fat Burning",
    details:
      "This program is suitable for you who wants to get rid of your stubborn fat and lose their weight. Full of high-intensity interval training (HIIT) workouts.",
  },
  {
    image: '/heart.png',
    heading: "Health Fitness",
    details:
      "This programs is designed for those who want to improve your overall well-being and longevity. Enjoy better energy levels, reduced stress, and improved mood.",
  },
];


const Page = () => {
  /*const mobile = window.innerWidth<= 768 ? true: false;*/
  return (
    <div className="page"id="home">

        <div className="blur page-blur"></div>

        <div className="left-h">
          <header/>

{/* Nutrixa Slogan Heading */}
    <div className="page-text">
        <div><span>
        Feel Good,
        </span></div>

        <div><span>
        Get Fit,
        </span></div>

        <div><span>
        Start today!
        </span></div>

    </div>

        {/* Woman image */}
        <img src='/woman.svg' alt="" className="woman-image"/>

        </div>
        <div className="blur page2-blur"></div>

        <div className="right-h"></div>

  

    {/* Programs Section */}
    <div className="Programs" id="programs">
    {/* header */}
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
          <div className="join-now"><span>More Info</span></div>
        </div>
      ))}
    </div>
  </div>

      {/* Reasons Section */}
        <div className="Reasons" id="reasons">
            <div className="blur reasons-blur"></div>
            <div className="blur reasons2-blur"></div>

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

export default Page

import React from 'react';
import { MoreInfo3 } from '@clerk/nextjs';


const MoreInfo3Page = () => {
  return (
    

    <div className="mt-24">
      <img src="/fatBurning.png" alt="Cardio Training" style={{ width: '190%', height: 'auto' , position: 'relative', top: '50px'}} />
      
      <h2 style={{ position: 'absolute', top: '165px', left: '70px', color: 'black', padding: '5px', fontSize: "40px", fontWeight: 'semi-bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Fat Burning
      </h2> 

      <h2 style={{ position: 'absolute', top: '760px', left: '0px', color: 'black', padding: '5px', fontSize: "22px", textAlign: 'center' }}>
      These exercises, with their variations, can be combined into a comprehensive
      fat-burning workout routine that targets multiple muscle groups and keeps your 
      metabolism elevated.
      </h2> 

      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[250px] ml-[100px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-4 mb-6">
          <span className="uppercase font-bold text-lg">BURPEES</span>
        </div>
      
       
        <img src="/burpee.png" alt="Burpee" className="w-3/5 h-auto -mb-5 mt-10 ml-[40px]" />
        <div>
          {/* Your content here */}
          Target: Full body, especially legs, core, and cardiovascular system<br />
          Variations: Standard Burpees, Half Burpees, Burpee Box Jump
        </div>
      </div>

      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[-627px] ml-[700px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-7">
          <span className="uppercase font-bold text-lg">KETTLEBALL SWINGS</span>
        </div>

        <img src="/kettlebell.png" alt="Kettlebell" className="w-3/5 h-auto mb-1 -mt-10 ml-[40px]" />
       
        <div className="mb-[-5px] mt-5" >
            Target: Legs, glutes, core, and cardiovascular system<br />
            Variations: Two-Handed Kettlebell Swing, Single-Handed
            Kettlebell Swing, American Kettlebell Swing
        </div>
      </div>


      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[70px] ml-[100px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-20 -mt-20">
          <span className="uppercase font-bold text-lg">ROWING</span>
        </div>

        <img src="/rowing.png" alt="Rowing" className="w-4/5 h-auto mb-10 -mt-50 ml-[10px]" />
       
        <div className="mb-[-90px] -mt-3">
          Target: Full body, especially legs, back, arms, and cardiovascular system<br />
          Variations:Steady-State Rowing, Interval Rowing, Power Strokes
        </div>
      </div>




      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[-630px] ml-[700px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-20 -mt-20">
          <span className="uppercase font-bold text-lg ">MOUNTAIN CLIMBERS</span>
        </div>

        <img src="/mountain.png" alt="Mountain" className="w-4/5 h-auto mb-4 -mt-10 ml-[10px]" />
       
        <div className="mb-[-90px] mt-10">
          Target: Hamstrings, glutes, lower back, core<br />
          Variation: Conventional deadlifts, sumo deadlifts, Romanian deadlifts 
        </div>
      </div>



      
    </div>
  );
};
export default MoreInfo3Page;

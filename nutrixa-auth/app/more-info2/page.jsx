import React from 'react';
import { MoreInfo2 } from '@clerk/nextjs';


const MoreInfo2Page = () => {
  return (
    <div className="mt-24">
      <img src="/cardioTraining.png" alt="Cardio Training" style={{ width: '190%', height: 'auto' , position: 'relative', top: '20px'}} />
      
      <h2 style={{ position: 'absolute', top: '150px', left: '70px', color: 'black', padding: '5px', fontSize: "40px", fontWeight: 'semi-bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Cardio Training
      </h2> 

      <h2 style={{ position: 'absolute', top: '740px', left: '50px', color: 'black', padding: '5px', fontSize: "22px", textAlign: 'center' }}>
      These exercises can be mixed and matched to create a varied and enjoyable cardio routine, 
      keeping your workouts interesting and challenging.
      </h2> 

      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[250px] ml-[100px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-4 -mb-9">
          <span className="uppercase font-bold text-lg">STAIRS</span>
        </div>
      
       
        <img src="/stairmaster.png" alt="Stairs" className="w-3/5 h-auto mb-2 mt-5 ml-[5px]" />
        <div className="mb-[40px] mt-1">
          {/* Your content here */}
          Target: Cardiovascular system, legs, and glutes <br />
          Variations: Staircase, Stair Climber Machine, Step Aerobics
        </div>
      </div>

      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[-627px] ml-[700px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 -mb-7">
          <span className="uppercase font-bold text-lg">BIKING</span>
        </div>

        <img src="/bike.png" alt="Bike" className="w-3/5 h-auto mb-2 mt-3 ml-[2px]" />
       
        <div className="mb-[40px] mt-1" >
          Target: Cardiovascular system, legs, and core<br />
          Variations: Outdoor Cycling, Stationary Bike, Spin Class
        </div>
      </div>


      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[70px] ml-[100px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-1 -mt-20">
          <span className="uppercase font-bold text-lg">ELLIPTICAL</span>
        </div>

        <img src="/elliptical.png" alt="Eliptical" className="w-3/5 h-auto mb-1 -mt-30 ml-[10px]" />
       
        <div className="mb-[-90px] mt-10">
          Target: Hamstrings, glutes, lower back, core<br />
          Variation: Conventional deadlifts, Sumo deadlifts, Romanian deadlifts 
        </div>
      </div>




      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[-630px] ml-[700px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-1">
          <span className="uppercase font-bold text-lg">JUMP ROPE</span>
        </div>

        <img src="/jumpRope.png" alt="Jump Rope" className="w-3/5 h-auto mb-3 -mt-10 ml-[40px]" />
       
        <div>
          Target: Cardiovascular system, legs, and coordination<br />
          Variations: Basic Jump, Double Unders, High Knees
        </div>
      </div>



      
    </div>
  );
};
export default MoreInfo2Page;

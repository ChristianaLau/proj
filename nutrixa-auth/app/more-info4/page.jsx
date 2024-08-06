import React from 'react';
import { MoreInfo4 } from '@clerk/nextjs';


const MoreInfo4Page = () => {
  return (

    <div className="mt-24">
      <img src="/healthFitness.jpg" alt="Cardio Training" style={{ width: '190%', height: 'auto' , position: 'relative', top: '20px'}} />
      
      <h2 style={{ position: 'absolute', top: '150px', left: '70px', color: 'black', padding: '5px', fontSize: "40px", fontWeight: 'semi-bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Health Fitness
      </h2> 

      <h2 style={{ position: 'absolute', top: '830px', left: '50px', color: 'black', padding: '5px', fontSize: "22px", textAlign: 'center' }}>
      These exercises can be adapted to various fitness levels and can be
      done at home or in a gym setting. Incorporating a mix of these 
      activities into your routine can promote overall health and wellness.
      </h2> 

      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[250px] ml-[100px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-4 -mt-5 -mb-7">
          <span className="uppercase font-bold text-lg">CALF RAISES</span>
        </div>
      
       
        <img src="/calfRaise.png" alt="Calf Raise" className="w-2/5 h-auto mb-1 mt-5 ml-[40px]" />
        <div>
          {/* Your content here */}
          Target: Quadriceps, hamstrings, glutes<br />
          Variation: Barbell squats, dumbbell squats, body weight squats
        </div>
      </div>

      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[-627px] ml-[700px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-20 -mt-10">
          <span className="uppercase font-bold text-lg">CRUNCHES</span>
        </div>

        <img src="/crunch.png" alt="Crunches" className="w-3/5 h-auto mb-1 -mt-1 ml-[40px]" />
       
        <div className="mb-[-1px] mt-20" >
          Target: Biceps<br />
          Variation: Barbell curls, dumbbell curls, hammer curls
        </div>
      </div>


      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[70px] ml-[100px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-10 -mt-20">
          <span className="uppercase font-bold text-lg">JUMPING JACKS</span>
        </div>

        <img src="/jumpingJack.png" alt="Jumping Jacks" className="w-3/5 h-auto -mb-10 -mt-10 ml-[10px]" />
       
        <div className="mb-[-90px] mt-10">
          Target: Hamstrings, glutes, lower back, core<br />
          Variation: Conventional deadlifts, sumo deadlifts, Romanian deadlifts 
        </div>
      </div>




      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[-630px] ml-[700px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-20 -mt-10">
          <span className="uppercase font-bold text-lg">LUNGES</span>
        </div>

        <img src="/lunge.png" alt="Lunges" className="w-3/5 h-auto mb-10 -mt-10 ml-[10px]" />
       
        <div className="mb-[-80px] -mt-4">
          Target: Hamstrings, glutes, lower back, core<br />
          Variation: Conventional deadlifts, sumo deadlifts, Romanian deadlifts 
        </div>
      </div>

    </div>
  );
};
export default MoreInfo4Page;

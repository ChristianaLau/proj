import React from 'react';
import { MoreInfo } from '@clerk/nextjs';


const MoreInfoPage = () => {
  return (
    <div className="mt-24">
      <img src="/strengthTraining1.png" alt="Strength Training" style={{ width: '170%', height: 'auto' , top: '100px'}} />
      
      <h2 style={{ position: 'absolute', top: '150px', left: '100px', color: 'black', padding: '5px', fontSize: "40px", fontWeight: 'semi-bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Strength Training
      </h2> 

      <h2 style={{ position: 'absolute', top: '650px', left: '50px', color: 'black', padding: '5px', fontSize: "22px", textAlign: 'center' }}>
      These exercises can be performed with various equipment such as barbells, 
      dumbbells, resistance bands, or body weight, depending on your preference 
      and available resources.
      </h2> 

      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[250px] ml-[150px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-4">
          <span className="uppercase font-bold text-lg">SQUATS</span>
        </div>
      
       
        <img src="/squat.png" alt="Squat" className="w-3/5 h-auto mb-10 mt-5 ml-[40px]" />
        <div>
          {/* Your content here */}
          Target: Quadriceps, hamstrings, glutes<br />
          Variation: Barbell squats, dumbbell squats, body weight squats
        </div>
      </div>

      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[-627px] ml-[750px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-7">
          <span className="uppercase font-bold text-lg">BICEP CURLS</span>
        </div>

        <img src="/bicepCurl.png" alt="Squat" className="w-4/5 h-auto mb-4 -mt-6 ml-[40px]" />
       
        <div className="mb-[-5px] mt-1" >
          Target: Biceps<br />
          Variation: Barbell curls, dumbbell curls, hammer curls
        </div>
      </div>


      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[70px] ml-[150px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-10 -mt-20">
          <span className="uppercase font-bold text-lg">PLANKS</span>
        </div>

        <img src="/plank.png" alt="Plank" className="w-4/5 h-auto mb-20 -mt-30 ml-[10px]" />
       
        <div className="mb-[-90px] mt-10">
          Target: Hamstrings, glutes, lower back, core<br />
          Variation: Conventional deadlifts, sumo deadlifts, Romanian deadlifts 
        </div>
      </div>




      <div className="w-[510px] h-[610px] bg-[#ebfccb] rounded-lg m-5 mt-[-630px] ml-[750px] flex flex-col justify-center items-center text-center p-5">
        <div className="text-center p-5 mb-7">
          <span className="uppercase font-bold text-lg">DEADLIFTS</span>
        </div>

        <img src="/deadlift.png" alt="Deadlift" className="w-4/5 h-auto mb-4 -mt-20 ml-[10px]" />
       
        <div>
          Target: Hamstrings, glutes, lower back, core<br />
          Variation: Conventional deadlifts, sumo deadlifts, Romanian deadlifts 
        </div>
      </div>

      <h2 style={{ position: 'absolute', top: '2240px', left: '100px', color: 'black', padding: '5px', fontSize: "40px", fontWeight: 'semi-bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Nutrition Plan
      </h2> 

      <div className="mt-24 pb-20">
        {/* New Smaller Boxes */}
        <div className="flex justify-between gap-x-4 mt-40 mx-20">
          <div className="w-[400px] h-[300px] bg-[#ebfccb] rounded-lg flex flex-col justify-center items-center text-center p-4">
            <img src="/omlette.png" alt="Description of Image 1" className="w-4/5 h-auto -mb-1 -mt-8" />
            <span className="uppercase font-bold text-sm -mt-5">Breakfast</span>
            <div>Omelette with Spinach, Tomatoes, and Whole-Grain Toast</div>
          </div>

          <div className="w-[400px] h-[300px] bg-[#ebfccb] rounded-lg flex flex-col justify-center items-center text-center p-4">
            <img src="/chicken.png" alt="Description of Image 1" className="w-3/5 h-auto -mb-1 -mt-2" />
            <span className="uppercase font-bold text-sm">Lunch</span>
            <div>Grilled Chicken Salad</div>
          </div>

          <div className="w-[400px] h-[300px] bg-[#ebfccb] rounded-lg flex flex-col justify-center items-center text-center p-4">
            <img src="/salmon.png" alt="Description of Image 1" className="w-4/5 h-auto -mb-7 -mt-1" />
            <span className="uppercase font-bold text-sm">Dinner</span>
            <div>Salmon with Sweet Potatoes and Steamed Broccoli</div>
          </div>
        </div>
      </div>



      
    </div>
  );
};
export default MoreInfoPage;


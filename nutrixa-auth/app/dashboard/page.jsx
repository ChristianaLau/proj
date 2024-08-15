'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useUser } from '@clerk/nextjs';
import WaterLogger from '../trackers/water/waterintake';
import WeightLog from '../trackers/weight/weightlog';
import styles from './dashboardstyle.css';
import Lottie from 'lottie-react';
import wateranime from '../lotties/wateranime.json';
import weightanime from '../lotties/weightanime.json';

export default function Home() {
  const { user } = useUser();
  const [sleep, setSleep] = useState(0);
  const [meditation, setMeditation] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Sidebar state

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen); // Toggle the sidebar open/close state
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/updateSleepMeditation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sleep,
          meditation,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update sleep and meditation");
      } else {
        const data = await response.json();
        console.log("Sleep and meditation data updated:", data);
      }
    } catch (error) {
      console.error("Error updating sleep and meditation data:", error);
    } finally {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/gemini");
        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }
        const result = await response.json();

        const resultString =
          typeof result === "string" ? result : JSON.stringify(result);
        setData(resultString);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   const lastShownDate = localStorage.getItem("popupLastShownDate");
  //   const today = new Date().toISOString().split("T")[0];

  //   if (lastShownDate !== today) {
  //     setShowPopup(true);
  //     localStorage.setItem("popupLastShownDate", today);
  //   } else {
  //     setShowPopup(false);
  //   }
  // }, []);

  const createdAtDate = user
    ? new Date(user.createdAt).toLocaleDateString()
    : "";

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={handleSidebarToggle} />
      <main
        className={`flex-1 transition-all duration-500 ${
          isOpen ? "ml-60" : "ml-20"
        } bg-white`}
      >
        <div className="w-full flex mt-4 ml-10">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back, {user?.firstName || "User"}!
          </h1>
        </div>
        <div className="w-full mt-2 ml-10">
          {user && (
            <h2 className="text-lg text-gray-600">
              Member since: {createdAtDate}
            </h2>
          )}
        </div>
        <div className="w-full mt-4 ml-10"></div>

        <div className="w-full flex flex-wrap justify-between">
          {/* Water Tracker */}
          <div className="w-full md:w-1/2">
            <div className="text-center text-gray-800 font-bold text-lg mb-4">
              Hydration Tracker
            </div>
            <div className="w-full py-6 h-80 bg-pastel-blue border-t border-b border-gray-300">
              <div className="flex items-center justify-center space-x-6">
                <Lottie
                  animationData={wateranime}
                  loop={true}
                  style={{ width: 200, height: 200 }}
                />
                <WaterLogger />
              </div>
            </div>
          </div>

          {/* Weight Tracker */}
          <div className="w-full md:w-1/2">
            <div className="text-center text-gray-700 font-semibold text-lg mb-4">
              Weight Tracker
            </div>
            <div className="w-full py-6 h-80 bg-pastel-green border-t border-b border-gray-300">
              <div className="flex items-center justify-center space-x-6">
                <Lottie
                  animationData={weightanime}
                  loop={true}
                  style={{ width: 200, height: 200 }}
                />
                <WeightLog />
              </div>
            </div>
          </div>

          <div className="my-6 text-center font-semibold text-gray-700 text-lg">
            Reminders
          </div>

          {/* Reminders */}
          <div className="w-full py-6 bg-pastel-pink border-t border-b border-gray-300">
            <div className="flex justify-between items-center">
              {/* Meditation Reminder */}
              <div className="flex items-center space-x-4">
                <img
                  src="/undraw_meditation_re_gll0.svg"
                  alt="Meditation Reminder"
                  className="w-28 h-28"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    Daily Meditation
                  </p>
                  <p className="text-sm text-gray-500">
                    Remember to take time to meditate and relax.
                  </p>
                </div>
              </div>

              {/* Sleep Reminder */}
              <div className="flex items-center space-x-4">
                <img
                  src="/sleep_analysis.svg"
                  alt="Sleep Reminder"
                  className="w-28 h-28"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-700">
                    Healthy Sleep
                  </p>
                  <p className="text-sm text-gray-500">
                    Ensure you get enough rest every night.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pop-up Box */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-12 rounded-lg shadow-lg w-96 max-w-lg">
              <h2 className="text-2xl font-bold">
                Welcome {user?.firstName || "User"}
              </h2>
              <p className="mt-4 text-lg">Please fill out the following:</p>

              <div className="mt-6">
                <label
                  className="block text-gray-700 text-base font-semibold mb-2"
                  htmlFor="sleep"
                >
                  Hours of Sleep:
                </label>
                <input
                  id="sleep"
                  type="number"
                  min="0"
                  value={sleep}
                  onChange={(e) => setSleep(parseFloat(e.target.value))}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full text-lg"
                />
              </div>
              <div className="mt-6">
                <label
                  className="block text-gray-700 text-base font-semibold mb-2"
                  htmlFor="meditation"
                >
                  Hours of Meditation:
                </label>
                <input
                  id="meditation"
                  type="number"
                  min="0"
                  value={meditation}
                  onChange={(e) => setMeditation(parseFloat(e.target.value))}
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full text-lg"
                />
              </div>

              <button
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded text-lg"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

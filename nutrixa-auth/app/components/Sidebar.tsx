"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAnimationControls } from "framer-motion";
import SidebarPage from "./Sidebar-pages";
import {
  CalendarDaysIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/16/solid";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaPenToSquare, FaMedal } from "react-icons/fa6";
import { CgGym } from "react-icons/cg";
import './Sidebar.css';

const Toggle = {
  open: {
    width: "15rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.3,
    },
  },
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.3,
    },
  },
};

const buttonRotate = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBar = useAnimationControls();
  const buttonControl = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      toggleBar.start("open");
      buttonControl.start("open");
    } else {
      toggleBar.start("close");
      buttonControl.start("close");
    }
  }, [isOpen]);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      variants={Toggle}
      animate={toggleBar}
      initial="close"
      className={`sidebar ${isOpen ? '' : 'sidebar-closed'} min-h-screen bg-white flex flex-col z-10 gap-20 p-5 h-full`}
    >
      <div className="flex flex-row w-full justify-between items-center">
        <div className="w-10 h-10 bg-blue rounded-full" />
        <button className="p-1 rounded-full flex" onClick={handleSideBar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-8 h-8 stroke-black"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={buttonRotate}
              animate={buttonControl}
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <SidebarPage name="Calendar" isOpen={isOpen} href="dashboard/calendar">
          <CalendarDaysIcon className="icon-color w-8 h-8" />
        </SidebarPage>
        <SidebarPage name="Chatbot" isOpen={isOpen} href="dashboard/chatbot">
          <ChatBubbleOvalLeftIcon className="icon-color w-8 h-8" />
        </SidebarPage>
        <SidebarPage name="Workouts" isOpen={isOpen} href="dashboard/workouts">
          <CgGym className="icon-color w-8 h-8" />
        </SidebarPage>
        <SidebarPage name="Nutrition" isOpen={isOpen} href="dashboard/nutrition">
          <IoFastFoodOutline className="icon-color w-8 h-8" />
        </SidebarPage>
        <SidebarPage name="Trends" isOpen={isOpen} href="dashboard/trends">
          <ChartBarIcon className="icon-color w-8 h-8" />
        </SidebarPage>
        <SidebarPage name="Achievements" isOpen={isOpen} href="dashboard/achievements">
          <FaMedal className="icon-color w-8 h-8" />
        </SidebarPage>
        <SidebarPage name="Quiz" isOpen={isOpen} href="quiz-diet">
          <FaPenToSquare className="icon-color w-8 h-8" />
        </SidebarPage>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
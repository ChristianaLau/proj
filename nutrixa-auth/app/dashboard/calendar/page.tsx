'use client'
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { generateDate, months } from "../../components/calendar/CalendarDate";
import cal from "../../components/calendar/cal";
import {ChevronLeftIcon, ChevronDoubleLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon,  } from "@heroicons/react/16/solid";
import Detailedcal from '../../components/calendar/popup'


export default function Calendar()
{
    const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);
    const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState('');
	const [mealData, setMealData] = useState('No meals logged for this day.');
    const [workoutData, setWorkoutData] = useState('No workouts logged for this day.');
    const [waterData, setWaterData] = useState('Water Intake has not been logged for this day.');

    const handleDayChange = (days: number) => {
		const newDate = today.add(days, 'day');
		setToday(newDate);
		setSelectDate(newDate);
	};

	const handleMonthChange = (months: number) => {
		const newDate = today.add(months, 'month');
		setToday(newDate);
		setSelectDate(newDate);
	};



    const handleDoubleClick = (date: Date) => {
		setModalData(`Data for ${date.toDateString()}`);
		setShowModal(true);
	};

	const fetchDailyData = () => {
        fetch(`/api/mealget`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success && data.data.length > 0) {
                    const mealsForSelectedDate = data.data.filter((meal: any) => {
                        return dayjs(meal.date).isSame(selectDate, 'day');
                    });
                    if (mealsForSelectedDate.length > 0) {
                        
                        setMealData(mealsForSelectedDate.map((meal: any) => meal.meal).join(', '));
                    } else {
                        setMealData("No meals logged for this day.");
                    }
                } else {
                    setMealData("No meals logged for this day.");
                }
            })
            .catch((error) => {
                console.error('Error fetching meal data:', error);
                setMealData("Error fetching data.");
            });
    };
	const fetchWorkoutData = () => {
        fetch(`/api/workoutget`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success && data.data.length > 0) {
                    const mealsForSelectedDate = data.data.filter((meal: any) => {
                        return dayjs(meal.date).isSame(selectDate, 'day');
                    });
                    if (mealsForSelectedDate.length > 0) {
                        
                        setWorkoutData(mealsForSelectedDate.map((workout: any) => workout.workout).join(', '));
                    } else {
                        setWorkoutData("No workouts logged for this day.");
                    }
                } else {
                    setWorkoutData("No workouts logged for this day.");
                }
            })
            .catch((error) => {
                console.error('Error fetching workout data:', error);
                setWorkoutData("Error fetching data.");
            });
    };
	const fetchWaterData = () => {
        fetch(`/api/waterget`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success && data.data.length > 0) {
                    const mealsForSelectedDate = data.data.filter((meal: any) => {
                        return dayjs(meal.date).isSame(selectDate, 'day');
                    });
                    if (mealsForSelectedDate.length > 0) {
                        
                        setWaterData(mealsForSelectedDate.map((water: any) => water.water).join(', '));
                    } else {
                        setWaterData("Water Intake has not been logged for this day.");
                    }
                } else {
                    setWaterData("Water Intake has not been logged for this day.");
                }
            })
            .catch((error) => {
                console.error('Error fetching water data:', error);
                setWaterData("Error fetching data.");
            });
    };


	useEffect(() => {
        fetchDailyData();
        fetchWorkoutData();
        fetchWaterData();
    }, [selectDate]);

	return (
		<div className="min-h-screen bg-white w-full text-black flex gap-10 justify-center mx-auto h-screen items-center sm:flex-row flex-col">
			<div className="w-full max-w-3xl">
				<div className="flex justify-between items-center">
					<h1 className="select-none font-semibold">
						{months[today.month()]}, {today.year()}
					</h1>
                    
					<div className="flex gap-10 items-center">
						<ChevronDoubleLeftIcon
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
								onClick={() => handleMonthChange(-1)}
							
						/>
                        <ChevronLeftIcon
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => handleDayChange(-1)}
						/>
						<h1
							className="cursor-pointer hover:green hover:scale-105 transition-all"
							onClick={() => {
								setToday(currentDate);
							}}
						>
							Today
						</h1>
						<ChevronRightIcon
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => handleDayChange(1)}
						/>
                        <ChevronDoubleRightIcon
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
							onClick={() => handleMonthChange(1)} 
						/>
					</div>
				</div>
				<div className="grid grid-cols-7">
					{days.map((day, index) => (
						<h1
							key={index}
							className="text-sm text-center h-14 grid place-content-center text-gray-500 select-none"
						>
							{day}
						</h1>
					))}
				</div>

				<div className="grid grid-cols-7">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => (
							<div
								key={index}
								className="p-2 text-center h-14 grid place-content-center text-sm border-t"
							>
								<h1
									className={cal(
										currentMonth ? "" : "text-gray-400",
										today ? "bg-green-600 text-white" : "",
										selectDate.toDate().toDateString() === date.toDate().toDateString()
											? "bg-green-900 text-white"
											: "",
										"h-10 w-10 rounded-full grid place-content-center hover:bg-green-300 hover:text-white transition-all cursor-pointer select-none"
									)}
									onClick={() => {
										setSelectDate(date);
									}}

                                    onDoubleClick={() => 
                                        handleDoubleClick(date.toDate()
                                    )}
								>
									{date.date()}
								</h1>
							</div>
						)
					)}
				</div>
			</div>
			<div className="w-full max-w-sm sm:px-5">
				<h1 className="font-semibold">
					{selectDate.toDate().toDateString()}
				</h1>
				<p className="text-gray-400"> <strong>Meals:</strong> {mealData}</p>
                <p className="text-gray-400"> <strong>Workouts:</strong> {workoutData}</p>
                <p className="text-gray-400"> <strong>Water Intake:</strong> {waterData}</p>
			</div>
            <Detailedcal show={showModal} onClose={() => setShowModal(false)} data={modalData} />
		</div>
	);
}

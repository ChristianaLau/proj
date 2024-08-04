import React from 'react';
import { XMarkIcon } from "@heroicons/react/16/solid";

const Detailedcal = ({ show, onClose, data }) => {
	if (!show) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded shadow-lg relative">
				<button
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
					onClick={onClose}
				>
					<XMarkIcon className="w-6 h-6" />
				</button>
				<h2 className="text-xl font-bold mb-4">Daily Data</h2>
				<p>{data}</p>
			</div>
		</div>
	);
};

export default Detailedcal;
// src/components/FloatingHospitalButton.jsx
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';


const FloatingHospitalButton = () => {
  const handleClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const query = `https://www.google.com/maps/search/hospital/@${latitude},${longitude},14z`;
        window.open(query, '_blank');
      }, (error) => {
        alert("Location access denied or unavailable.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        title="Find Nearest Hospital"
      >
        <FaMapMarkerAlt size={24} />
      </button>
      <span className="mt-1 text-sm text-gray-800 font-medium">Find Nearest Hospital</span>
    </div>
  );
};

export default FloatingHospitalButton;

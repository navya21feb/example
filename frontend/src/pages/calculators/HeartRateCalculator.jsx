// calculators/HeartRateCalculator.jsx
import React, { useState } from 'react';

const HeartRateCalculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [zones, setZones] = useState(null);
  const [message, setMessage] = useState('');

  const calculateHeartRateZones = () => {
    if (!age || !restingHR) return;

    const ageNum = parseInt(age);
    const maxHR = 220 - ageNum;
    const heartRateReserve = maxHR - parseInt(restingHR);

    const zone1 = Math.round(heartRateReserve * 0.5 + parseInt(restingHR));
    const zone2 = Math.round(heartRateReserve * 0.6 + parseInt(restingHR));
    const zone3 = Math.round(heartRateReserve * 0.7 + parseInt(restingHR));
    const zone4 = Math.round(heartRateReserve * 0.8 + parseInt(restingHR));
    const zone5 = Math.round(heartRateReserve * 0.9 + parseInt(restingHR));

    setZones({ maxHR, zone1, zone2, zone3, zone4, zone5 });

    setMessage("Thank you for using our health platform! You're taking great steps toward better heart health. 😊 Explore more tools and insights on our website to stay fit and informed! ❤️");

    setAge('');
    setRestingHR('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Heart Rate Zone Calculator</h2>

      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other / Prefer not to say</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Age (years)</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Resting Heart Rate (bpm)</label>
        <input
          type="number"
          value={restingHR}
          onChange={(e) => setRestingHR(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button onClick={calculateHeartRateZones} className="bg-blue-600 text-white px-4 py-2 rounded">
        Calculate Zones
      </button>

      {zones && (
        <div className="mt-4">
          <p><strong>Max Heart Rate:</strong> {zones.maxHR} bpm</p>
          <p><strong>Heart Rate Zones:</strong></p>
          <ul className="list-disc ml-6">
            <li>Zone 1 (50-60%): {zones.zone1} bpm</li>
            <li>Zone 2 (60-70%): {zones.zone2} bpm</li>
            <li>Zone 3 (70-80%): {zones.zone3} bpm</li>
            <li>Zone 4 (80-90%): {zones.zone4} bpm</li>
            <li>Zone 5 (90-100%): {zones.zone5} bpm</li>
          </ul>
          <p className="mt-2 text-green-700">
            🫀 Regularly monitoring your heart rate helps you tailor workouts effectively, reduce stress, and track cardiovascular health.
          </p>
          <p className="mt-4 text-blue-700">{message}</p>
        </div>
      )}
    </div>
  );
};

export default HeartRateCalculator;

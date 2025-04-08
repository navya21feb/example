// calculators/WaterIntakeCalculator.jsx
import React, { useState } from 'react';

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('low');
  const [climate, setClimate] = useState('moderate');
  const [gender, setGender] = useState('male');
  const [waterIntake, setWaterIntake] = useState(null);
  const [message, setMessage] = useState('');

  const calculateWaterIntake = () => {
    if (!weight) return;

    let baseIntake = weight * 0.033;

    if (activityLevel === 'moderate') {
      baseIntake += 0.3;
    } else if (activityLevel === 'high') {
      baseIntake += 0.6;
    }

    if (climate === 'hot') {
      baseIntake += 0.5;
    }

    setWaterIntake(baseIntake.toFixed(2));

    if (baseIntake < 2) {
      setMessage("You're consuming less water than recommended. Increase intake to avoid dehydration. 🥤💧");
    } else if (baseIntake > 4) {
      setMessage("You're consuming a lot of water! Ensure it's well-balanced with electrolytes. 💦🧂");
    } else {
      setMessage("You're staying well hydrated! Keep it up for energy, skin health, and overall well-being. 🌿✅");
    }

    setWeight('');
    setActivityLevel('low');
    setClimate('moderate');
    setGender('male');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Water Intake Calculator</h2>

      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other / Prefer not to say</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Weight (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Activity Level</label>
        <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="w-full p-2 border rounded">
          <option value="low">Low (little or no exercise)</option>
          <option value="moderate">Moderate (some activity)</option>
          <option value="high">High (intense exercise)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Climate</label>
        <select value={climate} onChange={(e) => setClimate(e.target.value)} className="w-full p-2 border rounded">
          <option value="cool">Cool</option>
          <option value="moderate">Moderate</option>
          <option value="hot">Hot</option>
        </select>
      </div>

      <button onClick={calculateWaterIntake} className="bg-blue-600 text-white px-4 py-2 rounded">
        Calculate Water Intake
      </button>

      {waterIntake && (
        <div className="mt-4">
          <p><strong>Recommended Daily Water Intake:</strong> {waterIntake} liters/day</p>
          <p className="mt-2 text-lg font-medium text-gray-800">{message}</p>
          <p className="mt-4 text-blue-700">
            🧊 Thank you for using our health tools! Staying hydrated is one of the simplest yet most powerful things you can do for your health. 😊<br />
            Be proud of taking this step — now go explore more awesome features on our site to level up your wellness! 🚀💧
          </p>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeCalculator;

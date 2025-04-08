// calculators/BodyFatCalculator.jsx
import React, { useState } from 'react';

const BodyFatCalculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState('');
  const [height, setHeight] = useState('');
  const [bodyFat, setBodyFat] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBodyFat = () => {
    if (!age || !waist || !neck || !height || (gender === 'female' && !hip)) return;

    let result = 0;
    if (gender === 'male') {
      result = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else if (gender === 'female') {
      result = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
    } else {
      const male = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      const female = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
      result = (male + female) / 2;
    }

    result = result.toFixed(2);
    setBodyFat(result);

    if (result < 10) {
      setMessage("Your body fat is very low. Consider increasing healthy fat intake and monitoring hormonal balance. 🥑");
    } else if (result > 30) {
      setMessage("Your body fat is on the higher side. A mix of cardio, strength training, and a balanced diet may help. 🏃‍♀️🥗");
    } else {
      setMessage("You're within a healthy body fat range! This supports heart health, metabolism, and energy. Keep it up! 💪");
    }

    setAge('');
    setWaist('');
    setNeck('');
    setHip('');
    setHeight('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Body Fat Percentage Calculator</h2>

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
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Waist (cm)</label>
        <input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Neck (cm)</label>
        <input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      {gender === 'female' && (
        <div className="mb-4">
          <label className="block mb-1">Hip (cm)</label>
          <input type="number" value={hip} onChange={(e) => setHip(e.target.value)} className="w-full p-2 border rounded" />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1">Height (cm)</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <button onClick={calculateBodyFat} className="bg-indigo-600 text-white px-4 py-2 rounded">
        Calculate Body Fat %
      </button>

      {bodyFat && (
        <div className="mt-4">
          <p><strong>Estimated Body Fat:</strong> {bodyFat}%</p>
          <p className="mt-2 text-lg font-medium text-gray-800">{message}</p>
          <p className="mt-4 text-blue-700">
            🎉 Thanks for using our Body Fat Calculator! You're taking great steps toward a healthier life. 😊<br />
            Explore more health tools on our platform to support your fitness and wellness journey! 🌟💚
          </p>
        </div>
      )}
    </div>
  );
};

export default BodyFatCalculator;

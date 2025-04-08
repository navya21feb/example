// calculators/BMRCalculator.jsx
import React, { useState } from 'react';

const BMRCalculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmr, setBmr] = useState(null);
  const [advice, setAdvice] = useState('');
  const [message, setMessage] = useState('');

  const calculateBMR = () => {
    if (!age || !weight || !height) return;
    let result = 0;
    if (gender === 'male') {
      result = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
      result = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      // Average of male and female formulas for other/non-binary gender
      const maleBMR = 10 * weight + 6.25 * height - 5 * age + 5;
      const femaleBMR = 10 * weight + 6.25 * height - 5 * age - 161;
      result = (maleBMR + femaleBMR) / 2;
    }
    const finalBMR = result.toFixed(2);
    setBmr(finalBMR);

    if (finalBMR < 1200) {
      setAdvice('Your BMR is quite low. Make sure you are eating enough calories to support your basic functions. Consider consulting a nutritionist.');
      setMessage('Thank you for using our website! 😊 Stay strong and take care of your health! 💪');
    } else if (finalBMR > 2500) {
      setAdvice('Your BMR is high. You likely have higher energy needs. Ensure a balanced diet and regular physical activity.');
      setMessage('Thanks for checking in! 😊 You are doing great, keep moving and stay fit! 🏃‍♀️🏋️‍♂️');
    } else {
      setAdvice('Your BMR is within a healthy range. Maintaining this supports a stable metabolism, improved energy levels, and long-term wellness.');
      setMessage('Awesome job! 😊 You are in a great place health-wise. Keep it up and thank you for using our site! 🌟');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">BMR Calculator</h2>
      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border rounded"
        >
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
        <label className="block mb-1">Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={calculateBMR}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate BMR
      </button>

      {bmr && (
        <div className="mt-4">
          <p><strong>BMR:</strong> {bmr} calories/day</p>
          <p className="mt-2 text-sm text-gray-700">{advice}</p>
          <p className="mt-2 text-green-700 font-medium">{message}</p>
        </div>
      )}
    </div>
  );
};

export default BMRCalculator;




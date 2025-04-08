// calculators/BMICalculator.jsx
import React, { useState } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');
  const [advice, setAdvice] = useState('');

  const calculateBMI = () => {
    if (!height || !weight) return;
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setMessage("You are underweight.");
      setAdvice("Consider a balanced, nutrient-rich diet and consult a healthcare provider if needed.");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setMessage("You have a healthy weight! ✅");
      setAdvice("Being in the healthy BMI range lowers your risk for chronic diseases, boosts energy, and supports mental well-being. Great job! 😊 Thanks for using our health tool — you're awesome! 🌟");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setMessage("You are overweight.");
      setAdvice("Focus on physical activity, a balanced diet, and lifestyle changes. Small steps lead to big health wins. You've got this! 💪");
    } else {
      setMessage("You are in the obese range.");
      setAdvice("Consider speaking with a medical professional for a tailored plan. Start with small lifestyle changes and celebrate every progress. 💚");
    }

    setHeight('');
    setWeight('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">BMI Calculator</h2>
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
        onClick={calculateBMI}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Calculate BMI
      </button>

      {bmi && (
        <div className="mt-4">
          <p><strong>BMI:</strong> {bmi}</p>
          <p className="mt-2 text-lg font-medium text-gray-800">{message}</p>
          <p className="mt-1 text-green-700">{advice}</p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;



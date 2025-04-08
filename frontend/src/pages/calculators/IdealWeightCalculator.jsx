// calculators/IdealWeightCalculator.jsx
import React, { useState } from 'react';

const IdealWeightCalculator = () => {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [idealWeight, setIdealWeight] = useState(null);
  const [message, setMessage] = useState('');

  const calculateIdealWeight = () => {
    if (!height) return;

    let result = 0;
    if (gender === 'male') {
      result = 50 + 0.91 * (height - 152.4);
    } else if (gender === 'female') {
      result = 45.5 + 0.91 * (height - 152.4);
    } else {
      const maleWeight = 50 + 0.91 * (height - 152.4);
      const femaleWeight = 45.5 + 0.91 * (height - 152.4);
      result = (maleWeight + femaleWeight) / 2;
    }

    result = result.toFixed(2);
    setIdealWeight(result);

    setMessage(
      `Your ideal weight is approximately ${result} kg. Maintaining an ideal weight reduces the risk of chronic illnesses like diabetes and hypertension, boosts confidence, and enhances overall quality of life. 🌿`
    );

    setHeight('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ideal Weight Calculator</h2>

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
        <label className="block mb-1">Height (cm)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={calculateIdealWeight}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Calculate Ideal Weight
      </button>

      {idealWeight && (
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-800">{message}</p>
          <p className="mt-2 text-green-700">
            🎉 Thanks for using our Ideal Weight Calculator! Keep prioritizing your well-being — you're doing great! 😊<br />
            Don’t forget to explore more tools on our site for your wellness journey. 🌟💚
          </p>
        </div>
      )}
    </div>
  );
};

export default IdealWeightCalculator;

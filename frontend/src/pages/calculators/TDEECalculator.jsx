// calculators/TDEECalculator.jsx
import React, { useState } from 'react';

const TDEECalculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('1.2');
  const [tdee, setTdee] = useState(null);
  const [message, setMessage] = useState('');
  const [advice, setAdvice] = useState('');

  const calculateTDEE = () => {
    if (!age || !weight || !height) return;

    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      const maleBMR = 10 * weight + 6.25 * height - 5 * age + 5;
      const femaleBMR = 10 * weight + 6.25 * height - 5 * age - 161;
      bmr = (maleBMR + femaleBMR) / 2;
    }

    const result = (bmr * parseFloat(activity)).toFixed(2);
    setTdee(result);

    if (result < 1800) {
      setMessage("Your TDEE is on the lower side.");
      setAdvice("Consider increasing your calorie intake through balanced, nutrient-rich foods. Add light physical activity and track your energy levels daily. 🌟🥦");
    } else if (result > 3000) {
      setMessage("You have high energy needs.");
      setAdvice("You might be very active! Ensure you're refueling with complex carbs, protein, and good fats. Don’t forget hydration and sleep. 🏋️‍♂️💧");
    } else {
      setMessage("Your TDEE is in a healthy range ✅");
      setAdvice("Maintaining this energy expenditure can help you manage your weight, improve your focus, and support your immune system. Great job prioritizing your health! 🌿💪");
    }

    setAge('');
    setWeight('');
    setHeight('');
    setActivity('1.2');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">TDEE Calculator</h2>

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
        <label className="block mb-1">Height (cm)</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Weight (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Activity Level</label>
        <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full p-2 border rounded">
          <option value="1.2">Sedentary (little or no exercise)</option>
          <option value="1.375">Lightly active (1-3 days/week)</option>
          <option value="1.55">Moderately active (3-5 days/week)</option>
          <option value="1.725">Very active (6-7 days/week)</option>
          <option value="1.9">Super active (twice per day or heavy training)</option>
        </select>
      </div>

      <button onClick={calculateTDEE} className="bg-green-600 text-white px-4 py-2 rounded">
        Calculate TDEE
      </button>

      {tdee && (
        <div className="mt-4">
          <p><strong>TDEE:</strong> {tdee} calories/day</p>
          <p className="mt-2 text-lg font-medium text-gray-800">{message}</p>
          <p className="mt-1 text-green-700">{advice}</p>
          <p className="mt-4 text-blue-700">
            🎉 Thank you for using our health platform! Your well-being matters, and you’re doing amazing by taking the first step. 😊<br />
            Don't forget to explore more helpful tools on our site — your health journey has just begun! 🌟💚
          </p>
        </div>
      )}
    </div>
  );
};

export default TDEECalculator;

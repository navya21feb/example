// calculators/MacronutrientCalculator.jsx
import React, { useState } from 'react';

const MacronutrientCalculator = () => {
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [result, setResult] = useState(null);

  const calculateMacros = () => {
    const weightKg = parseFloat(weight);
    if (!weightKg) return;

    let calories = 0;
    if (goal === 'lose') calories = weightKg * 22;
    else if (goal === 'gain') calories = weightKg * 30;
    else calories = weightKg * 25;

    let protein = weightKg * 2;
    let fat = (calories * 0.25) / 9;
    let carbs = (calories - (protein * 4 + fat * 9)) / 4;

    setResult({ calories: Math.round(calories), protein: Math.round(protein), fat: Math.round(fat), carbs: Math.round(carbs) });

    // Reset inputs
    setWeight('');
    setGoal('maintain');
    setActivityLevel('moderate');
    setGender('male');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Macronutrient Calculator</h2>

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
        <label className="block mb-1">Goal</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full p-2 border rounded">
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Muscle</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Activity Level</label>
        <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="w-full p-2 border rounded">
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>

      <button onClick={calculateMacros} className="bg-green-600 text-white px-4 py-2 rounded">
        Calculate Macros
      </button>

      {result && (
        <div className="mt-4">
          <p><strong>Daily Caloric Intake:</strong> {result.calories} kcal</p>
          <p><strong>Protein:</strong> {result.protein}g</p>
          <p><strong>Fat:</strong> {result.fat}g</p>
          <p><strong>Carbohydrates:</strong> {result.carbs}g</p>

          <p className="mt-3 text-blue-800 font-medium">
            ✅ Eating a balanced ratio of macronutrients helps maintain energy, build muscle, and support metabolism.
          </p>
          <p className="mt-1 text-green-700">
            💡 To improve results, aim for whole foods like lean meats, legumes, vegetables, whole grains, and healthy fats.
            Avoid excess sugars and fried items.
          </p>
          <p className="mt-4 text-blue-700">
            🎉 Thank you for using our health platform! You're making awesome progress toward a healthier lifestyle. 😊<br />
            Keep exploring our website for more helpful tools on your wellness journey! 🌿💪
          </p>
        </div>
      )}
    </div>
  );
};

export default MacronutrientCalculator;

// calculators/DiabetesRiskCalculator.jsx
import React, { useState } from 'react';

const DiabetesRiskCalculator = () => {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState('');
  const [familyHistory, setFamilyHistory] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const [advice, setAdvice] = useState('');

  const calculateRisk = () => {
    if (!age || !bmi) return;

    let riskScore = 0;
    riskScore += parseInt(age) > 45 ? 2 : 1;
    riskScore += parseFloat(bmi) > 25 ? 2 : 1;
    riskScore += familyHistory ? 2 : 0;

    if (riskScore >= 5) {
      setResult('High Risk');
      setMessage('You may be at high risk for Type 2 Diabetes.');
      setAdvice('Consider a medical consultation. Adopt a low-sugar diet, stay active, and monitor your glucose levels. 🚶‍♀️🥗🩺');
    } else if (riskScore >= 3) {
      setResult('Moderate Risk');
      setMessage('You are at moderate risk of developing diabetes.');
      setAdvice('Introduce healthy lifestyle habits: reduce processed sugar, get regular exercise, and schedule regular check-ups. 🌿💧');
    } else {
      setResult('Low Risk');
      setMessage('Your risk appears to be low. Keep up the good work! ✅');
      setAdvice('A healthy lifestyle now will protect your future. Continue your great habits and encourage others too! 🌟💪');
    }

    setAge('');
    setBmi('');
    setFamilyHistory(false);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Diabetes Risk Calculator</h2>

      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other / Prefer not to say</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Age</label>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">BMI</label>
        <input type="number" value={bmi} onChange={(e) => setBmi(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input type="checkbox" checked={familyHistory} onChange={() => setFamilyHistory(!familyHistory)} className="mr-2" />
          Family History of Diabetes
        </label>
      </div>

      <button onClick={calculateRisk} className="bg-blue-600 text-white px-4 py-2 rounded">
        Calculate Risk
      </button>

      {result && (
        <div className="mt-4">
          <p><strong>Risk Level:</strong> {result}</p>
          <p className="mt-2 text-lg font-medium text-gray-800">{message}</p>
          <p className="mt-1 text-green-700">{advice}</p>
          <p className="mt-4 text-blue-700">
            🎉 Thank you for using our health platform! You're taking charge of your health and that's something to be proud of! 😊<br />
            Keep exploring more tools we’ve created just for you. Your wellness journey starts here. 🌟💚
          </p>
        </div>
      )}
    </div>
  );
};

export default DiabetesRiskCalculator;


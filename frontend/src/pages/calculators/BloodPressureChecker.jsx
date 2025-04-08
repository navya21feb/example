// calculators/BloodPressureChecker.jsx
import React, { useState } from 'react';

const BloodPressureChecker = () => {
  const [gender, setGender] = useState('male');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [message, setMessage] = useState('');
  const [advice, setAdvice] = useState('');

  const checkBloodPressure = () => {
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);

    if (!sys || !dia) return;

    if (sys < 90 || dia < 60) {
      setMessage('Low Blood Pressure (Hypotension)');
      setAdvice("You may feel dizzy or tired. Eat small meals, increase salt intake, and stay hydrated. If symptoms persist, consult a doctor. 🥣💧");
    } else if (sys >= 90 && sys <= 120 && dia >= 60 && dia <= 80) {
      setMessage('Normal Blood Pressure ✅');
      setAdvice("Great job! Keep it up with a healthy diet, regular exercise, and stress management. Regular monitoring is key. 🥦🏃‍♂️🧘‍♀️");
    } else if ((sys > 120 && sys <= 139) || (dia > 80 && dia <= 89)) {
      setMessage('Elevated Blood Pressure');
      setAdvice("Watch your salt intake, maintain a healthy weight, and consider lifestyle changes like yoga or walking. 🧂🚶‍♀️");
    } else {
      setMessage('High Blood Pressure (Hypertension) ⚠️');
      setAdvice("Consult your doctor. Reduce stress, limit sodium, eat more potassium-rich foods (bananas, spinach), and stay active. 🩺🍌");
    }

    setSystolic('');
    setDiastolic('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Blood Pressure Checker</h2>

      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other / Prefer not to say</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Systolic (upper number)</label>
        <input type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Diastolic (lower number)</label>
        <input type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <button onClick={checkBloodPressure} className="bg-red-500 text-white px-4 py-2 rounded">
        Check Blood Pressure
      </button>

      {message && (
        <div className="mt-4">
          <p className="text-lg font-bold text-gray-800">{message}</p>
          <p className="text-green-700 mt-1">{advice}</p>
          <p className="mt-4 text-blue-700">
            🎉 Thank you for using our health platform! You're taking great steps toward a healthier you. 😊<br />
            Be sure to explore more tools on our site for a complete health journey! 🌟❤️
          </p>
        </div>
      )}
    </div>
  );
};

export default BloodPressureChecker;

// calculators/OvulationCalculator.jsx
import React, { useState } from 'react';

const OvulationCalculator = () => {
  const [gender, setGender] = useState('female');
  const [cycleLength, setCycleLength] = useState('');
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [result, setResult] = useState('');

  const calculateOvulation = () => {
    if (gender !== 'female') {
      setResult("Ovulation tracking is primarily relevant for individuals with female reproductive systems.");
    } else {
      const periodDate = new Date(lastPeriodDate);
      const ovulationDate = new Date(periodDate);
      ovulationDate.setDate(periodDate.getDate() + parseInt(cycleLength) - 14);
      const fertileStart = new Date(ovulationDate);
      fertileStart.setDate(ovulationDate.getDate() - 5);
      const fertileEnd = new Date(ovulationDate);
      fertileEnd.setDate(ovulationDate.getDate() + 1);

      setResult(
        `Your estimated ovulation day is ${ovulationDate.toDateString()}.
        Your fertile window is from ${fertileStart.toDateString()} to ${fertileEnd.toDateString()}.

        🌸 Suggestion: Track your cycle regularly to increase accuracy.
        💡 Tip: Maintain a healthy diet and reduce stress for better reproductive health.

        💖 Thank you for using our HealthTech platform! You’re taking a proactive step towards your wellness. 😊
        Don’t forget to explore our other health tools designed just for you! 💪`
      );
    }

    // Clear input fields
    setCycleLength('');
    setLastPeriodDate('');
    setGender('female');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Ovulation Calculator</h2>

      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other / Prefer not to say</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Average Cycle Length (days)</label>
        <input type="number" value={cycleLength} onChange={(e) => setCycleLength(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">First Day of Last Period</label>
        <input type="date" value={lastPeriodDate} onChange={(e) => setLastPeriodDate(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <button onClick={calculateOvulation} className="bg-purple-600 text-white px-4 py-2 rounded">
        Calculate Ovulation
      </button>

      {result && (
        <div className="mt-4 text-green-800 whitespace-pre-line">
          {result}
        </div>
      )}
    </div>
  );
};

export default OvulationCalculator;

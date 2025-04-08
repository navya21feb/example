// calculators/SleepCycleCalculator.jsx
import React, { useState } from 'react';

const SleepCycleCalculator = () => {
  const [gender, setGender] = useState('male');
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [suggestedTimes, setSuggestedTimes] = useState([]);

  const calculateSleepTimes = () => {
    if (!wakeUpTime) return;

    const [wakeHour, wakeMinute] = wakeUpTime.split(":").map(Number);
    const wakeUpDate = new Date();
    wakeUpDate.setHours(wakeHour, wakeMinute, 0);

    const cycles = [6, 5, 4, 3]; // 90 min * 6/5/4/3
    const suggestions = cycles.map((cycle) => {
      const sleepTime = new Date(wakeUpDate.getTime() - cycle * 90 * 60000);
      return sleepTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    setSuggestedTimes(suggestions);
    setWakeUpTime('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Sleep Cycle Calculator</h2>

      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other / Prefer not to say</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Desired Wake-Up Time</label>
        <input type="time" value={wakeUpTime} onChange={(e) => setWakeUpTime(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <button onClick={calculateSleepTimes} className="bg-purple-600 text-white px-4 py-2 rounded">
        Calculate Sleep Time
      </button>

      {suggestedTimes.length > 0 && (
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-800">😴 To wake up refreshed at {wakeUpTime || 'your chosen time'}, consider sleeping at one of these times:</p>
          <ul className="list-disc list-inside mt-2 text-indigo-700">
            {suggestedTimes.map((time, idx) => (
              <li key={idx}>{time}</li>
            ))}
          </ul>
          <p className="mt-4 text-green-700">
            ✅ Sleep cycles typically last about 90 minutes. Completing full cycles helps you feel more rested.
          </p>
          <p className="mt-2 text-yellow-700">
            🛏️ For better sleep: avoid screens before bed, stay consistent with bedtime, and create a calming sleep environment.
          </p>
          <p className="mt-4 text-blue-700">
            🎉 Thank you for using our Sleep Cycle Calculator! Your well-being matters. You're doing great by prioritizing rest 😊<br />
            Don’t forget to explore more tools on our website for a healthier lifestyle! 🌙💤
          </p>
        </div>
      )}
    </div>
  );
};

export default SleepCycleCalculator;

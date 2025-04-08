// calculators/PregnancyDueDateCalculator.jsx
import React, { useState } from 'react';

const PregnancyDueDateCalculator = () => {
  const [gender, setGender] = useState('female');
  const [lmpDate, setLmpDate] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [message, setMessage] = useState('');

  const calculateDueDate = () => {
    if (!lmpDate) return;

    const lmp = new Date(lmpDate);
    const estimatedDueDate = new Date(lmp);
    estimatedDueDate.setDate(estimatedDueDate.getDate() + 280); // 40 weeks = 280 days

    setDueDate(estimatedDueDate.toDateString());

    setMessage(
      "Congratulations! Your pregnancy journey has begun. Stay hydrated, eat well, attend prenatal checkups, and ensure emotional wellness. 💕🤰"
    );

    setLmpDate('');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pregnancy Due Date Calculator</h2>

      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other / Prefer not to say</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Last Menstrual Period (LMP)</label>
        <input type="date" value={lmpDate} onChange={(e) => setLmpDate(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <button onClick={calculateDueDate} className="bg-pink-600 text-white px-4 py-2 rounded">
        Calculate Due Date
      </button>

      {dueDate && (
        <div className="mt-4">
          <p><strong>Estimated Due Date:</strong> {dueDate}</p>
          <p className="mt-2 text-green-700">{message}</p>
          <p className="mt-4 text-blue-700">
            🎉 Thank you for using our health platform! You're doing an amazing job taking care of your health. 😊<br />
            Explore more tools and stay empowered through your journey! 💚🍼
          </p>
        </div>
      )}
    </div>
  );
};

export default PregnancyDueDateCalculator;

// calculators/CholesterolCalculator.jsx
import React, { useState } from 'react';

const CholesterolCalculator = () => {
  const [gender, setGender] = useState('male');
  const [hdl, setHdl] = useState('');
  const [ldl, setLdl] = useState('');
  const [triglycerides, setTriglycerides] = useState('');
  const [totalCholesterol, setTotalCholesterol] = useState(null);
  const [message, setMessage] = useState('');
  const [advice, setAdvice] = useState('');

  const calculateCholesterol = () => {
    if (!hdl || !ldl || !triglycerides) return;

    const total = parseFloat(hdl) + parseFloat(ldl) + (parseFloat(triglycerides) / 5);
    setTotalCholesterol(total.toFixed(2));

    if (total < 200) {
      setMessage("Your cholesterol level is desirable ✅");
      setAdvice("Maintain your healthy lifestyle with regular exercise, balanced diet, and regular checkups. Well done! 🥗🏃‍♂️");
    } else if (total >= 200 && total <= 239) {
      setMessage("Borderline high cholesterol detected ⚠️");
      setAdvice("Consider reducing saturated fat intake and increasing fiber. Add more fruits, veggies, and omega-3s to your meals.");
    } else {
      setMessage("High cholesterol level 🚨");
      setAdvice("Consult a healthcare provider for personalized treatment. Include heart-healthy foods and regular physical activity in your routine.");
    }

    setHdl('');
    setLdl('');
    setTriglycerides('');
    setGender('male');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Cholesterol Risk Estimator</h2>

      <div className="mb-4">
        <label className="block mb-1">Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full p-2 border rounded">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other / Prefer not to say</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">HDL (mg/dL)</label>
        <input type="number" value={hdl} onChange={(e) => setHdl(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">LDL (mg/dL)</label>
        <input type="number" value={ldl} onChange={(e) => setLdl(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Triglycerides (mg/dL)</label>
        <input type="number" value={triglycerides} onChange={(e) => setTriglycerides(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <button onClick={calculateCholesterol} className="bg-blue-600 text-white px-4 py-2 rounded">
        Calculate Cholesterol
      </button>

      {totalCholesterol && (
        <div className="mt-4">
          <p><strong>Total Cholesterol:</strong> {totalCholesterol} mg/dL</p>
          <p className="mt-2 text-lg font-medium text-gray-800">{message}</p>
          <p className="mt-1 text-green-700">{advice}</p>
          <p className="mt-4 text-blue-700">
            😊 Thank you for using our health platform! You're taking steps toward a healthier life!<br />
            Explore more tools on our site and stay on top of your health journey. 🌟❤️
          </p>
        </div>
      )}
    </div>
  );
};

export default CholesterolCalculator;

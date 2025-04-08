// App.jsx
import React, { useState } from 'react';
import BMICalculator from './calculators/BMICalculator';
import BMRCalculator from './calculators/BMRCalculator';
import TDEECalculator from './calculators/TDEECalculator';
import IdealWeightCalculator from './calculators/IdealWeightCalculator';
import BodyFatCalculator from './calculators/BodyFatCalculator';
import WaterIntakeCalculator from './calculators/WaterIntakeCalculator';
import MacronutrientCalculator from './calculators/MacronutrientCalculator';
import HeartRateCalculator from './calculators/HeartRateCalculator';
import PregnancyDueDateCalculator from './calculators/PregnancyDueDateCalculator';
import OvulationCalculator from './calculators/OvulationCalculator';
import DiabetesRiskCalculator from './calculators/DiabetesRiskCalculator';
import CholesterolCalculator from './calculators/CholesterolCalculator';
import BloodPressureChecker from './calculators/BloodPressureChecker';
import SleepCycleCalculator from './calculators/SleepCycleCalculator';

const Calculator = () => {
  const [selectedCalc, setSelectedCalc] = useState('BMI');

  const calculators = {
    BMI: <BMICalculator />,
    BMR: <BMRCalculator />,
    TDEE: <TDEECalculator />,
    IdealWeight: <IdealWeightCalculator />,
    BodyFat: <BodyFatCalculator />,
    WaterIntake: <WaterIntakeCalculator />,
    Macronutrients: <MacronutrientCalculator />,
    HeartRate: <HeartRateCalculator />,
    Pregnancy: <PregnancyDueDateCalculator />,
    Ovulation: <OvulationCalculator />,
    DiabetesRisk: <DiabetesRiskCalculator />,
    Cholesterol: <CholesterolCalculator />,
    BloodPressure: <BloodPressureChecker />,
    SleepCycle: <SleepCycleCalculator />,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🩺 All-in-One Health Calculators</h1>
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {Object.keys(calculators).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedCalc(key)}
            className={`px-4 py-2 rounded-md font-medium ${
              selectedCalc === key ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        {calculators[selectedCalc]}
      </div>
    </div>
  );
};

export default Calculator;


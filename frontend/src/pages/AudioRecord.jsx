// SymptomChecker.jsx
import React, { useState } from "react";

const SYMPTOM_DATA = [
  {
    symptoms: ["fever", "cough", "fatigue"],
    diagnosis: "You may have the flu or COVID-19.",
    advice: "Stay hydrated, rest well, and monitor your temperature. Consider taking paracetamol. If symptoms worsen, consult a doctor."
  },
  {
    symptoms: ["headache", "nausea", "sensitivity to light"],
    diagnosis: "You may be experiencing a migraine.",
    advice: "Rest in a dark room, drink plenty of water, and avoid screen time. Over-the-counter painkillers may help."
  },
  {
    symptoms: ["stomach pain", "diarrhea", "vomiting"],
    diagnosis: "Possible food poisoning or stomach infection.",
    advice: "Avoid solid foods, stay hydrated with ORS, and get adequate rest. Visit a doctor if it lasts more than 2 days."
  },
  {
    symptoms: ["chest pain", "shortness of breath", "dizziness"],
    diagnosis: "Warning: Possible cardiac issue.",
    advice: "Seek emergency medical help immediately. Do not ignore chest pain."
  },
  {
    symptoms: ["sore throat", "runny nose", "sneezing"],
    diagnosis: "Common cold or seasonal allergy.",
    advice: "Gargle with warm salt water, use nasal spray if needed, and rest. Avoid cold drinks."
  },
  {
    symptoms: ["itchy eyes", "sneezing", "runny nose"],
    diagnosis: "Seasonal allergies (hay fever).",
    advice: "Avoid allergens, use antihistamines, and keep your surroundings clean."
  },
  {
    symptoms: ["frequent urination", "burning sensation", "lower abdominal pain"],
    diagnosis: "Possible urinary tract infection (UTI).",
    advice: "Drink plenty of water and consult a doctor for antibiotics."
  },
  {
    symptoms: ["joint pain", "swelling", "stiffness"],
    diagnosis: "You may have arthritis or joint inflammation.",
    advice: "Apply warm compresses, rest the joint, and consider pain relief medication."
  },
  {
    symptoms: ["rash", "itching", "redness"],
    diagnosis: "You might be experiencing a skin allergy or dermatitis.",
    advice: "Apply soothing lotions, avoid allergens, and consult a dermatologist if it spreads."
  },
  {
    symptoms: ["back pain", "stiffness", "numbness"],
    diagnosis: "Lower back strain or slipped disc symptoms.",
    advice: "Rest, apply heat/cold packs, and avoid heavy lifting. Seek physiotherapy if pain persists."
  },
  {
    symptoms: ["weight loss", "increased thirst", "frequent urination"],
    diagnosis: "Possible signs of diabetes.",
    advice: "Consult a doctor for blood sugar testing and dietary guidance."
  },
  {
    symptoms: ["anxiety", "sleeplessness", "racing heart"],
    diagnosis: "Signs of stress or anxiety disorder.",
    advice: "Practice deep breathing, meditation, and talk to a therapist if needed."
  }
];


const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [results, setResults] = useState([]);

  const handleCheck = () => {
    const inputSymptoms = symptoms.toLowerCase().split(/[\s,]+/);
    const matchedResults = [];

    SYMPTOM_DATA.forEach((condition) => {
      const matched = condition.symptoms.some(symptom =>
        inputSymptoms.includes(symptom)
      );
      if (matched) {
        matchedResults.push(condition);
      }
    });

    if (matchedResults.length === 0) {
      setResults([
        {
          diagnosis: "Symptoms unclear 🤔",
          advice: "Please provide more detailed symptoms or consult a healthcare professional.",
        },
      ]);
    } else {
      setResults(matchedResults);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          🩺 Smart Symptom Checker
        </h1>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 text-gray-800"
          rows={4}
          placeholder="Enter your symptoms (e.g. fever, cough, fatigue)"
        />
        <button
          onClick={handleCheck}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Check Diagnosis
        </button>

        {results.length > 0 && (
          <div className="mt-6 space-y-4">
            {results.map((res, idx) => (
              <div
                key={idx}
                className="bg-green-100 border-l-4 border-green-500 p-4 rounded-xl"
              >
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  ✅ {res.diagnosis}
                </h2>
                <p className="text-green-700">{res.advice}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;



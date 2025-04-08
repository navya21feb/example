import React, { useEffect, useState } from "react";
import axios from "axios";

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/prescriptions/list")
      .then((res) => {
        setPrescriptions(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prescriptions</h1>
      {prescriptions.map((pres, index) => (
        <div
          key={index}
          className="border rounded p-4 mb-4 shadow-md bg-white"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-bold">Dr. {pres.doctor.name}</p>
              <p>Reg No: {pres.doctor.regNo}</p>
            </div>
            <img
              src={pres.logo}
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
          </div>

          <p className="mb-1">
            <strong>Patient:</strong> {pres.patient.name} ({pres.patient.age} /{" "}
            {pres.patient.gender})
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {pres.patient.email}
          </p>

          <table className="w-full text-left mb-2">
            <thead>
              <tr>
                <th className="border-b py-1">Medicine</th>
                <th className="border-b py-1">Dosage</th>
                <th className="border-b py-1">Duration</th>
              </tr>
            </thead>
            <tbody>
              {pres.medicines.map((med, i) => (
                <tr key={i}>
                  <td className="py-1">{med.name}</td>
                  <td className="py-1">{med.dosage}</td>
                  <td className="py-1">{med.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Date: {pres.date}</p>
            <img
              src={pres.signature}
              alt="Doctor's Signature"
              className="w-32 h-auto"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionList;


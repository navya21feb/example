import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const medicineList = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Ciprofloxacin", "Metformin"];

const PrescriptionGenerator = () => {
  const [doctor, setDoctor] = useState({ name: '', regNo: '' });
  const [patient, setPatient] = useState({ name: '', age: '', gender: '', email: '' });
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', duration: '' }]);
  const [sigPad, setSigPad] = useState(null);
  const [signatureURL, setSignatureURL] = useState('');
  const [logo, setLogo] = useState(null);
  const contentRef = useRef();

  const handleDoctorChange = (e) => setDoctor({ ...doctor, [e.target.name]: e.target.value });
  const handlePatientChange = (e) => setPatient({ ...patient, [e.target.name]: e.target.value });

  const handleMedicineChange = (index, e) => {
    const updated = [...medicines];
    updated[index][e.target.name] = e.target.value;
    setMedicines(updated);
  };

  const addMedicine = () => setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setLogo(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const saveSignature = () => setSignatureURL(sigPad.getTrimmedCanvas().toDataURL('image/png'));
  const clearSignature = () => sigPad.clear();

  const saveToDatabase = async () => {
    const prescription = {
      doctor,
      patient,
      medicines,
      date: new Date().toISOString(),
      signature: signatureURL,
      logo,
    };

    try {
      const res = await fetch('http://localhost:4000/api/doctor/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prescription),
      });

      if (res.ok) {
        toast.success('Prescription saved to MongoDB!');
      } else {
        toast.error('Failed to save prescription.');
      }
    } catch (err) {
      toast.error('Error saving prescription.');
      console.error(err);
    }
  };

  const sendEmail = () => {
    emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        doctor_name: doctor.name,
        patient_name: patient.name,
        to_email: patient.email,
        message: medicines.map(m => `${m.name} - ${m.dosage} - ${m.duration}`).join('\n'),
      },
      'YOUR_USER_ID'
    ).then(() => {
      toast.success("Email sent!");
    }).catch(err => {
      toast.error("Email failed: " + err.text);
    });
  };

  const printPage = () => {
    window.print();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto" ref={contentRef}>
      <h2 className="text-3xl font-bold mb-4">Prescription Generator</h2>

      <div className="mb-4">
        <h3 className="font-semibold">Doctor Info</h3>
        <input name="name" placeholder="Doctor Name" onChange={handleDoctorChange} className="border p-2 w-full mb-2" />
        <input name="regNo" placeholder="Registration Number" onChange={handleDoctorChange} className="border p-2 w-full" />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Hospital Logo</h3>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
        {logo && <img src={logo} alt="Hospital Logo" className="h-16 mt-2" />}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Patient Info</h3>
        <input name="name" placeholder="Patient Name" onChange={handlePatientChange} className="border p-2 w-full mb-2" />
        <input name="age" placeholder="Age" onChange={handlePatientChange} className="border p-2 w-full mb-2" />
        <input name="gender" placeholder="Gender" onChange={handlePatientChange} className="border p-2 w-full mb-2" />
        <input name="email" placeholder="Patient Email" onChange={handlePatientChange} className="border p-2 w-full" />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Medicines</h3>
        {medicines.map((med, index) => (
          <div key={index} className="mb-2">
            <input
              list="medlist"
              name="name"
              placeholder="Medicine Name"
              value={med.name}
              onChange={(e) => handleMedicineChange(index, e)}
              className="border p-2 w-full mb-1"
            />
            <datalist id="medlist">
              {medicineList.map((med, i) => <option key={i} value={med} />)}
            </datalist>
            <input
              name="dosage"
              placeholder="Dosage"
              value={med.dosage}
              onChange={(e) => handleMedicineChange(index, e)}
              className="border p-2 w-full mb-1"
            />
            <input
              name="duration"
              placeholder="Duration"
              value={med.duration}
              onChange={(e) => handleMedicineChange(index, e)}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button onClick={addMedicine} className="bg-blue-600 text-white px-4 py-1 mt-2 rounded">+ Add Medicine</button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Doctor's Signature</h3>
        <SignatureCanvas
          penColor="black"
          canvasProps={{ width: 500, height: 150, className: 'border border-gray-500' }}
          ref={setSigPad}
        />
        <div className="mt-2">
          <button onClick={saveSignature} className="bg-green-600 text-white px-4 py-1 mr-2 rounded">Save Signature</button>
          <button onClick={clearSignature} className="bg-red-600 text-white px-4 py-1 rounded">Clear</button>
        </div>
        {signatureURL && <img src={signatureURL} alt="Signature" className="h-20 mt-2" />}
      </div>

      <div className="flex gap-4 flex-wrap mt-6">
        <button onClick={saveToDatabase} className="bg-gray-800 text-white px-6 py-2 rounded">Save to DB</button>
        <button onClick={sendEmail} className="bg-yellow-600 text-white px-6 py-2 rounded">Email Prescription</button>
        <button onClick={printPage} className="bg-blue-700 text-white px-6 py-2 rounded">Print</button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PrescriptionGenerator;




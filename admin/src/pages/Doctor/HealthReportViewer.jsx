import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";

const HealthReportViewer = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [uploadedReports, setUploadedReports] = useState([]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (!selected) return;

    if (selected.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = JSON.parse(e.target.result);
        setParsedData(Array.isArray(json) ? json : [json]);
      };
      reader.readAsText(selected);
    } else if (selected.type === "text/csv") {
      Papa.parse(selected, {
        header: true,
        complete: (result) => setParsedData(result.data),
      });
    } else if (selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setParsedData([{ imagePreview: reader.result }]);
      };
      reader.readAsDataURL(selected);
    } else {
      alert("Please upload a CSV, JSON, or image file.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("No file selected");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:4000/api/doctor/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload successful!");
      fetchReports();
    } catch (err) {
      console.error("Upload error:", err.response || err);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    }
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/doctor/reports");
      setUploadedReports(res.data);
    } catch (err) {
      console.error("Error fetching reports", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const isAbnormal = (key, value) => {
    if (typeof value !== "number") return false;
    if (key.toLowerCase().includes("hb")) return value < 12 || value > 18;
    if (key.toLowerCase().includes("wbc")) return value < 4000 || value > 11000;
    if (key.toLowerCase().includes("glucose")) return value < 70 || value > 140;
    return false;
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧾 Health Report Viewer</h1>

      <form onSubmit={handleUpload} className="mb-6">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-2 block"
          accept=".csv, .json, image/*"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">📊 Parsed Report Preview:</h2>
        {parsedData.length > 0 &&
          parsedData.map((item, index) => (
            <div key={index} className="mb-4 p-4 border rounded bg-gray-100">
              {item.imagePreview ? (
                <img src={item.imagePreview} alt="Report preview" className="w-full h-auto" />
              ) : (
                <ul>
                  {Object.entries(item).map(([key, value], i) => (
                    <li
                      key={i}
                      className={isAbnormal(key, +value) ? "text-red-500 font-semibold" : ""}
                    >
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">📁 Uploaded Reports:</h2>
        {uploadedReports.length > 0 ? (
          uploadedReports.map((report, i) => (
            <div key={i} className="p-4 mb-4 border rounded shadow">
              <p>
                <strong>File:</strong> {report.filename}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Uploaded:</strong> {new Date(report.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No reports uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default HealthReportViewer;


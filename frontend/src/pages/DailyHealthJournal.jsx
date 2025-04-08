// DailyHealthJournal.jsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const DailyHealthJournal = () => {
  const [entry, setEntry] = useState({
    date: '',
    mood: '',
    diet: '',
    exercise: '',
    sleep: '',
    symptoms: ''
  });
  const [journal, setJournal] = useState([]);

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setJournal([...journal, entry]);
    setEntry({ date: '', mood: '', diet: '', exercise: '', sleep: '', symptoms: '' });
  };

  const moodToValue = (mood) => {
    const moods = { Happy: 5, Good: 4, Okay: 3, Sad: 2, Angry: 1 };
    return moods[mood] || 0;
  };

  const chartData = journal.map(j => ({
    date: j.date,
    mood: moodToValue(j.mood),
    sleep: parseFloat(j.sleep)
  }));

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">📘 Daily Health Journal</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
        <input name="date" type="date" value={entry.date} onChange={handleChange} className="p-2 border rounded" required />
        <select name="mood" value={entry.mood} onChange={handleChange} className="p-2 border rounded" required>
          <option value="">Select Mood</option>
          <option value="Happy">Happy 😊</option>
          <option value="Good">Good 🙂</option>
          <option value="Okay">Okay 😐</option>
          <option value="Sad">Sad 😢</option>
          <option value="Angry">Angry 😠</option>
        </select>
        <input name="diet" type="text" placeholder="Diet Summary" value={entry.diet} onChange={handleChange} className="p-2 border rounded" required />
        <input name="exercise" type="text" placeholder="Exercise Done" value={entry.exercise} onChange={handleChange} className="p-2 border rounded" required />
        <input name="sleep" type="number" placeholder="Hours of Sleep" value={entry.sleep} onChange={handleChange} className="p-2 border rounded" required />
        <input name="symptoms" type="text" placeholder="Any Symptoms" value={entry.symptoms} onChange={handleChange} className="p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Add Entry</button>
      </form>

      {journal.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">📊 Mood & Sleep Patterns</h3>
          <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mood" stroke="#8884d8" name="Mood" />
            <Line type="monotone" dataKey="sleep" stroke="#82ca9d" name="Sleep (hrs)" />
          </LineChart>
        </div>
      )}

      <p className="mt-6 text-blue-700 font-medium">
        💙 Thank you for tracking your health with us! Keep journaling and discover patterns to stay healthier and happier. 🌿
      </p>
    </div>
  );
};

export default DailyHealthJournal;


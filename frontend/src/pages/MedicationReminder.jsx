// MedicationReminderTool.jsx
import React, { useState, useEffect } from 'react';

const MedicationReminderTool = () => {
  const [reminders, setReminders] = useState([]);
  const [form, setForm] = useState({
    medication: '',
    time: '',
    year: '',
    month: '',
    day: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach((reminder, index) => {
        const [reminderHour, reminderMinute] = reminder.time.split(":").map(Number);
        if (
          reminderHour === now.getHours() &&
          reminderMinute === now.getMinutes() &&
          parseInt(reminder.year) === now.getFullYear() &&
          parseInt(reminder.month) === now.getMonth() + 1 &&
          parseInt(reminder.day) === now.getDate()
        ) {
          if (!reminder.taken) {
            alert(`⚠️ You missed your medication: ${reminder.medication}. Please take it as soon as possible.`);
          }
          if (!reminder.notified) {
            new Notification(`⏰ Time to take your medication: ${reminder.medication}`);
            const updated = [...reminders];
            updated[index].notified = true;
            setReminders(updated);
          }
        }
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReminders([...reminders, { ...form, taken: false, notified: false }]);
    setForm({ medication: '', time: '', year: '', month: '', day: '' });
  };

  const removeReminder = (index) => {
    const updated = [...reminders];
    updated.splice(index, 1);
    setReminders(updated);
  };

  const toggleTaken = (index) => {
    const updated = [...reminders];
    updated[index].taken = !updated[index].taken;
    setReminders(updated);
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">💊 Medication Reminder</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" placeholder="Medication Name" value={form.medication} onChange={(e) => setForm({ ...form, medication: e.target.value })} className="w-full p-2 border rounded" required />
        <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full p-2 border rounded" required />
        <div className="flex space-x-2">
          <input type="number" placeholder="Year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-1/3 p-2 border rounded" required />
          <input type="number" placeholder="Month (1-12)" value={form.month} onChange={(e) => setForm({ ...form, month: e.target.value })} className="w-1/3 p-2 border rounded" required />
          <input type="number" placeholder="Day" value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} className="w-1/3 p-2 border rounded" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Reminder</button>
      </form>

      <h3 className="mt-6 mb-2 font-semibold">🗓️ Active Reminders</h3>
      <ul className="space-y-2">
        {reminders.map((r, index) => (
          <li key={index} className="flex flex-col border p-2 rounded">
            <div className="flex justify-between items-center">
              <span>{r.medication} at {r.time} on {r.day}/{r.month}/{r.year}</span>
              <button onClick={() => removeReminder(index)} className="text-red-600">Remove</button>
            </div>
            <div className="mt-1">
              <input
                type="checkbox"
                checked={r.taken}
                onChange={() => toggleTaken(index)}
                className="mr-2"
              />
              {r.taken ? (
                <span className="text-green-700">✅ Great job! You took your medication on time. Stay strong and healthy! 😊</span>
              ) : (
                <span className="text-yellow-700">⏳ Don't forget to take your medication. Your health is your greatest wealth! 💪</span>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-blue-700 font-medium">
        💙 Thank you for using our health platform. You’re doing an amazing job staying on top of your wellness journey. Keep exploring our site for more helpful tools! 🌟
      </p>
    </div>
  );
};

export default MedicationReminderTool;



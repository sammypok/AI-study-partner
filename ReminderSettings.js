import React, { useState, useEffect } from 'react';

const ReminderSettings = () => {
  const [time, setTime] = useState('09:00');
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    if (enabled) {
      setEnabled(false);
      localStorage.removeItem('studyReminder');
      return;
    }

    setEnabled(true);
    localStorage.setItem('studyReminder', JSON.stringify({ time, enabled: true }));
    alert(`✅ Reminder set for ${time}. (In real app, browser notification would trigger daily)`);
  };

  useEffect(() => {
    const saved = localStorage.getItem('studyReminder');
    if (saved) {
      const { time: savedTime, enabled: savedEnabled } = JSON.parse(saved);
      setTime(savedTime);
      setEnabled(savedEnabled);
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Reminders</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Reminder Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          disabled={enabled}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-700">Enable daily reminder</span>
        <button
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ReminderSettings;
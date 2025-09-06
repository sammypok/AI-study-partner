import React, { useState } from 'react';

const StudyForm = ({ onGenerate, loading }) => {
  const [subjects, setSubjects] = useState([{ name: '', hours: '' }]);
  const [availableHours, setAvailableHours] = useState({ daily: '', weekly: '' });
  const [deadline, setDeadline] = useState('');

  const addSubject = () => {
    setSubjects([...subjects, { name: '', hours: '' }]);
  };

  const updateSubject = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validSubjects = subjects.filter(s => s.name.trim() && s.hours);
    if (validSubjects.length === 0) {
      alert('Please add at least one subject.');
      return;
    }
    if (!availableHours.weekly && !availableHours.daily) {
      alert('Please specify available study time (daily or weekly).');
      return;
    }
    onGenerate({
      subjects: validSubjects,
      availableHours,
      deadline: deadline || null
    });
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Study Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Subjects to Study</label>
          <div className="space-y-3">
            {subjects.map((subject, index) => (
              <div key={index} className="flex space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Subject name (e.g., Calculus, Biology)"
                    value={subject.name}
                    onChange={(e) => updateSubject(index, 'name', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div className="w-32">
                  <input
                    type="number"
                    placeholder="Hours"
                    value={subject.hours}
                    onChange={(e) => updateSubject(index, 'hours', e.target.value)}
                    className="input-field"
                    min="1"
                    required
                  />
                </div>
                {subjects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubject(index)}
                    className="px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                    title="Remove subject"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSubject}
            className="mt-3 text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add another subject
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hours Available Per Day</label>
            <input
              type="number"
              value={availableHours.daily}
              onChange={(e) => setAvailableHours({ ...availableHours, daily: e.target.value })}
              className="input-field"
              placeholder="e.g. 2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hours Available Per Week</label>
            <input
              type="number"
              value={availableHours.weekly}
              onChange={(e) => setAvailableHours({ ...availableHours, weekly: e.target.value })}
              className="input-field"
              placeholder="e.g. 10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline (Optional)</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input-field"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Your Plan...
            </>
          ) : (
            'Generate Study Plan'
          )}
        </button>
      </form>
    </div>
  );
};

export default StudyForm;
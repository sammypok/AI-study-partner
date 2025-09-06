import React, { useState } from 'react';
import StudyForm from '../components/dashboard/StudyForm';
import TodayTasks from '../components/dashboard/TodayTasks';
import PomodoroTimer from '../components/dashboard/PomodoroTimer';
import ReminderSettings from '../components/dashboard/ReminderSettings';
import { generateStudyPlan } from '../services/openaiService';

const Dashboard = () => {
  const [studyPlan, setStudyPlan] = useState(null);
  const [todayTasks, setTodayTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGeneratePlan = async (formData) => {
    setLoading(true);
    setError('');
    
    try {
      const aiPlan = await generateStudyPlan(
        formData.subjects,
        formData.availableHours,
        formData.deadline
      );
      
      setStudyPlan(aiPlan);
      setTodayTasks(aiPlan.todayTasks || []);
    } catch (err) {
      setError('Failed to generate AI study plan. Using mock plan instead.');
      
      // Fallback to mock plan
      const mockTodayTasks = formData.subjects.map((subject, index) => ({
        id: `task-${Date.now()}-${index}`,
        subject: subject.name,
        duration: Math.floor(Math.random() * 60) + 15,
        completed: false,
        priority: index === 0 ? "High" : "Medium"
      }));
      
      setTodayTasks(mockTodayTasks);
      setStudyPlan({ 
        generated: true, 
        summary: { 
          totalHours: formData.subjects.reduce((sum, s) => sum + parseFloat(s.hours), 0) 
        },
        weeklyPlan: {
          Monday: [{ subject: formData.subjects[0]?.name || "General Study", duration: 45, priority: "Medium" }],
          Tuesday: [{ subject: formData.subjects[0]?.name || "General Study", duration: 60, priority: "Low" }],
          Wednesday: [{ subject: formData.subjects[0]?.name || "General Study", duration: 30, priority: "High" }],
          Thursday: [{ subject: formData.subjects[0]?.name || "General Study", duration: 45, priority: "Medium" }],
          Friday: [{ subject: formData.subjects[0]?.name || "General Study", duration: 60, priority: "Low" }],
          Saturday: [{ subject: formData.subjects[0]?.name || "General Study", duration: 90, priority: "Low" }],
          Sunday: [{ subject: formData.subjects[0]?.name || "General Study", duration: 30, priority: "Medium" }]
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTodayTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
      <div className="bg-white dark:bg-dark-200 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI StudyPlanner</h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl">
            {error}
          </div>
        )}
        
        {!studyPlan ? (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Create Your AI-Powered Study Plan</h2>
              <p className="text-gray-600 dark:text-gray-300">Tell us what you need to study, and our AI will create the perfect schedule for you.</p>
            </div>
            <StudyForm onGenerate={handleGeneratePlan} loading={loading} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <TodayTasks tasks={todayTasks} onToggle={toggleTaskCompletion} />
              
              {studyPlan.weeklyPlan && (
                <div className="card">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full mr-2"></span>
                    Weekly Study Plan
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Day</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Study Tasks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(studyPlan.weeklyPlan).map(([day, tasks], index) => (
                          <tr 
                            key={day} 
                            className={`border-b border-gray-100 dark:border-gray-800 ${
                              index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'
                            }`}
                          >
                            <td className="py-4 px-4 font-medium text-gray-900 dark:text-white align-top w-32">
                              {day}
                            </td>
                            <td className="py-4 px-4 align-top">
                              {tasks.length === 0 ? (
                                <span className="text-gray-500 italic">No tasks scheduled</span>
                              ) : (
                                <div className="space-y-2">
                                  {tasks.map((task, i) => (
                                    <div 
                                      key={i} 
                                      className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                                    >
                                      <div className="mt-0.5">
                                        <span className={`tag tag-${task.priority === 'High' ? 'warning' : task.priority === 'Medium' ? 'primary' : 'success'}`}>
                                          {task.priority}
                                        </span>
                                      </div>
                                      <div>
                                        <div className="font-medium text-gray-900 dark:text-white">{task.subject}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">{task.duration} minutes</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <PomodoroTimer />
              <ReminderSettings />
              {studyPlan.summary && (
                <div className="card">
                  <h3 className="font-semibold text-lg mb-4">📊 Plan Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Total Hours:</span>
                      <span className="font-medium">{studyPlan.summary.totalHours} hrs</span>
                    </div>
                    {studyPlan.summary.recommendedDailyHours && (
                      <div className="flex justify-between">
                        <span>Daily Target:</span>
                        <span className="font-medium">{studyPlan.summary.recommendedDailyHours} hrs</span>
                      </div>
                    )}
                    {studyPlan.summary.estimatedCompletionDate && (
                      <div className="flex justify-between">
                        <span>Finish By:</span>
                        <span className="font-medium">{studyPlan.summary.estimatedCompletionDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
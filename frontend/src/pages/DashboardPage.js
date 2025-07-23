import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimelineTodo from '../components/TimelineTodo';
import ScheduleSection from '../components/ScheduleSection';
import NotesSection from '../components/NotesSection';
import WeatherWidget from '../components/WeatherWidget';
import InteractiveCalendar from '../components/InteractiveCalendar';
import ClickSpark from '../components/ClickSpark';
import TopRightTools from '../components/TopRightTools';

const DashboardPage = () => {
    const navigate = useNavigate();
    // Timeline state
    const [timelineTasks, setTimelineTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // Add new task
    const handleAddTask = () => {
        if (inputValue.trim() !== '') {
            setTimelineTasks([
                ...timelineTasks,
                { id: Date.now() + Math.random(), text: inputValue, color: 'bg-btggreen', deleting: false },
            ]);
            setInputValue('');
        }
    };
    // Remove task with animation
    const handleRemoveTask = (id) => {
        setTimelineTasks(tasks => tasks.map(t => t.id === id ? { ...t, deleting: true } : t));
        setTimeout(() => {
            setTimelineTasks(tasks => tasks.filter(t => t.id !== id));
        }, 350);
    };
    // Start editing
    const handleEditTask = (id, text) => {
        setEditingTaskId(id);
        setInputValue(text);
    };
    // Save edit
    const handleSaveEdit = (id) => {
        setTimelineTasks(tasks => tasks.map(t => t.id === id ? { ...t, text: inputValue } : t));
        setEditingTaskId(null);
        setInputValue('');
    };
    // Cancel edit
    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setInputValue('');
    };

    // Timeline component (add/edit at top, list below)
    // Remove: const Timeline = () => (
    // Remove:     <div className="flex flex-col gap-1 mt-2">
    // Remove:         <div className="flex gap-2 mb-2">
    // Remove:             <input
    // Remove:                 type="text"
    // Remove:                 className="flex-1 rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-btgyellow bg-white"
    // Remove:                 placeholder={editingTaskId === null ? 'Add a task for today...' : 'Edit task...'}
    // Remove:                 value={inputValue}
    // Remove:                 onChange={e => setInputValue(e.target.value)}
    // Remove:                 onKeyDown={e => {
    // Remove:                     if (e.key === 'Enter') {
    // Remove:                         if (editingTaskId === null) {
    // Remove:                             handleAddTask();
    // Remove:                         } else {
    // Remove:                             handleSaveEdit(editingTaskId);
    // Remove:                         }
    // Remove:                     }
    // Remove:                     if (e.key === 'Escape' && editingTaskId !== null) handleCancelEdit();
    // Remove:                 }}
    // Remove:             />
    // Remove:             {editingTaskId === null ? (
    // Remove:                 <button
    // Remove:                     className="bg-btggreen text-white rounded-lg px-3 py-1 text-xs md:text-sm"
    // Remove:                     onClick={handleAddTask}
    // Remove:                 >
    // Remove:                     Add
    // Remove:                 </button>
    // Remove:             ) : (
    // Remove:                 <>
    // Remove:                     <button
    // Remove:                         className="bg-btggreen text-white rounded-lg px-3 py-1 text-xs md:text-sm"
    // Remove:                         onClick={() => handleSaveEdit(editingTaskId)}
    // Remove:                     >
    // Remove:                         Save
    // Remove:                     </button>
    // Remove:                     <button
    // Remove:                         className="bg-btgorange text-white rounded-lg px-3 py-1 text-xs md:text-sm"
    // Remove:                         onClick={handleCancelEdit}
    // Remove:                     >
    // Remove:                         Cancel
    // Remove:                     </button>
    // Remove:                 </>
    // Remove:             )}
    // Remove:         </div>
    // Remove:         <div className="flex flex-col gap-1">
    // Remove:             {timelineTasks.map(task => (
    // Remove:                 <div
    // Remove:                     key={task.id}
    // Remove:                     className={`flex items-center gap-1 text-xs md:text-sm group transition-all duration-350 ${task.deleting ? 'opacity-0 translate-x-8 pointer-events-none' : 'opacity-100'}`}
    // Remove:                     style={{ transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)' }}
    // Remove:                 >
    // Remove:                     <span className={`w-2 h-2 rounded-full ${task.color}`}></span>
    // Remove:                     <span>{task.text}</span>
    // Remove:                     <button
    // Remove:                         className="ml-1 text-btgyellow hover:text-btgorange text-xs transition-colors"
    // Remove:                         onClick={() => handleEditTask(task.id, task.text)}
    // Remove:                         title="Edit task"
    // Remove:                     >
    // Remove:                         <span className="material-symbols-outlined text-base">edit</span>
    // Remove:                     </button>
    // Remove:                     <button
    // Remove:                         className="ml-1 text-btgorange hover:text-red-600 text-xs transition-transform duration-200 transform hover:scale-125"
    // Remove:                         onClick={() => handleRemoveTask(task.id)}
    // Remove:                         title="Delete task"
    // Remove:                     >
    // Remove:                         <span className="material-symbols-outlined text-base">delete</span>
    // Remove:                     </button>
    // Remove:                 </div>
    // Remove:             ))}
    // Remove:         </div>
    // Remove:     </div>
    // Remove: );

    return (
        <ClickSpark sparkColor='#F0A04B' sparkSize={10} sparkRadius={15} sparkCount={8} duration={3000}>
            <div className="min-h-screen bg-gradient-to-br from-btggreen via-white to-btgcream">
                {/* Centered top heading */}
                <div className="w-full flex justify-center absolute top-[50px] left-0">
                    <div className=" text-5xl text-gray-900 text-center">
                        Dashboard
                    </div>
                </div>
                {/* navbar */}
                <nav className="fixed left-10 rounded-lg top-1/2 -translate-y-1/2 bg-btgcream w-[80px] h-[350px] shadow-lg p-4 flex flex-col items-center justify-center space-y-8">
                    {/* Home Icon with expanding label and notch */}
                    <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/home')}>
                        <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">home</span>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-[85px] opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
                            {/* Notch */}
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
                            <span className="text-gray-900 text-sm ml-[5px]">Home</span>
                        </div>
                    </div>
                    {/* Dashboard Icon with expanding label and notch */}
                    <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/dashboardpage')}>
                        <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">dashboard</span>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 h-10 w-0 group-hover:w-[86px] opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-btgcream rotate-45"></div>
                            <span className="text-gray-900 text-sm ml-[-12px] ">Dashboard</span>
                        </div>
                    </div>
                    {/* About Icon with expanding label and notch */}
                    <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/about')}>
                        <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">info</span>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-[85px] opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
                            <span className="text-gray-900 text-sm ml-2">About</span>
                        </div>
                    </div>
                    {/* Logout Icon with expanding label and notch */}
                    <div className="group relative flex items-center cursor-pointer h-12" onClick={() => navigate('/') }>
                        <span className="material-symbols-outlined text-4xl transition-transform duration-200 group-hover:scale-125 z-10">logout</span>
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 h-10 w-0 group-hover:w-[85px] opacity-0 group-hover:opacity-100 bg-btgcream rounded transition-all duration-200 flex items-center pl-4 overflow-hidden">
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-btgcream rotate-45"></div>
                            <span className="text-gray-900 text-sm ml-2">Logout</span>
                        </div>
                    </div>
                </nav>
                {/* top right action bar */}
                <TopRightTools navigate={navigate} />
                {/* Main dashboard content area (clean, balanced layout) */}
                <div className="flex flex-col md:flex-row items-start justify-between min-h-screen pt-32 pb-8 w-full overflow-y-auto gap-4">
                    {/* Main content area */}
                    <div className="flex-1 max-w-3xl w-full flex flex-col gap-4 ml-0 md:ml-[100px] mr-0 md:mr-4">
                    
                        {/* Stats grid (2 cards only) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <WeatherWidget />
                            <div className="bg-btggreen rounded-xl shadow p-4 flex flex-col min-h-[110px] ml-[20px] min-w-[400px]">
                                <span className="text-5xl text-gray-900 mt-[20px] flex justify-center items-center">Resume</span>
                                
                            </div>
                        </div>
                        {/* Schedule */}
                        <ScheduleSection />
                        {/* Notes */}
                        <div className="bg-btgcream/80 rounded-xl shadow p-4 flex flex-col min-h-[220px] min-w-[1000px] ml-[100px]">
                            <span className="font-bold text-base md:text-lg text-btggreen mb-1">Notes</span>
                            <NotesSection />
                        </div>
                    </div>
                    {/* Right panel */}
                    <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col gap-4 mt-6 md:mt-0 mr-0 md:mr-8">
                        {/* Calendar */}
                        <InteractiveCalendar />
                        {/* Timeline */}
                        <div className="bg-btgcream/80 rounded-xl shadow p-4 flex flex-col gap-1">
                            <span className="font-bold text-base md:text-lg text-btggreen mb-1">Today's timeline</span>
                            <TimelineTodo />
                        </div>
                    </div>
                </div>
            </div>
        </ClickSpark>
    );
};

export default DashboardPage; 
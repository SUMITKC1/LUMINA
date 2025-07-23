import React, { useState, useEffect, useRef } from 'react';
import { getSchedule, saveSchedule } from '../services/api';
import 'react-clock/dist/Clock.css';

function formatTime(timeStr) {
    // timeStr: 'HH:MM' -> 'h:mm AM/PM'
    if (!timeStr) return '--';
    const [h, m] = (timeStr || '').split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return '--';
    const date = new Date();
    date.setHours(h, m);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const ScheduleSection = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('09:30');
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editStartTime, setEditStartTime] = useState('09:00');
    const [editEndTime, setEditEndTime] = useState('09:30');
    const username = localStorage.getItem('btg_username') || '';
    const inputRef = useRef(null);

    useEffect(() => {
        if (!username) {
            setLoading(false);
            setError('You must be logged in to use the schedule.');
            return;
        }
        getSchedule(username)
            .then(res => {
                if (res.success) setSchedule(res.schedule || []);
                else setError('Failed to load schedule.');
            })
            .catch(() => setError('Failed to load schedule.'))
            .finally(() => setLoading(false));
    }, [username]);

    useEffect(() => {
        if (!username || loading) return;
        saveSchedule(username, schedule);
    }, [schedule, username, loading]);

    const handleAdd = () => {
        if (!title.trim() || !startTime || !endTime) return;
        setSchedule(prev => [
            ...prev,
            { id: Date.now() + Math.random(), title, startTime, endTime }
        ]);
        setTitle('');
        setStartTime('09:00');
        setEndTime('09:30');
        setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
    };

    const handleDelete = (id) => {
        setSchedule(prev => prev.filter(t => t.id !== id));
    };

    const handleEdit = (task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
        setEditStartTime(task.startTime);
        setEditEndTime(task.endTime);
    };

    const handleSaveEdit = (id) => {
        setSchedule(prev => prev.map(t => t.id === id ? { ...t, title: editTitle, startTime: editStartTime, endTime: editEndTime } : t));
        setEditingId(null);
        setEditTitle('');
        setEditStartTime('09:00');
        setEditEndTime('09:30');
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditTitle('');
        setEditStartTime('09:00');
        setEditEndTime('09:30');
    };

    // Sort by start time
    const sortedSchedule = [...schedule].sort((a, b) => a.startTime.localeCompare(b.startTime));

    if (loading) return <div className="text-center text-btggreen py-4">Loading schedule...</div>;
    if (error) return <div className="text-center text-btgorange py-4">{error}</div>;

    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[190px] min-w-[900px] mt-2 ml-[100px]">
            <span className="font-bold text-base md:text-lg text-btggreen mb-1">Schedule</span>
            {/* Add form */}
            <div className="flex flex-col md:flex-row gap-2 mb-3 items-center">
                <input
                    ref={inputRef}
                    type="text"
                    className="rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-btgyellow bg-btgcream text-gray-900 flex-1"
                    placeholder="Task name..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    disabled={!username}
                />
                <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-500">From</label>
                    <input
                        type="time"
                        className="rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm bg-btgcream text-gray-900 focus:outline-none focus:ring-2 focus:ring-btgyellow"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        disabled={!username}
                    />
                    <label className="text-xs text-gray-500">To</label>
                    <input
                        type="time"
                        className="rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm bg-btgcream text-gray-900 focus:outline-none focus:ring-2 focus:ring-btgyellow"
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        disabled={!username}
                    />
                </div>
                <button
                    className="bg-btggreen text-white rounded-lg px-3 py-1 text-xs md:text-sm shadow hover:bg-btgyellow hover:text-btggreen transition-all duration-200"
                    onClick={handleAdd}
                    disabled={!username}
                >
                    Add
                </button>
            </div>
            {/* Schedule list */}
            <ul className="divide-y divide-btgcream text-xs md:text-sm">
                {sortedSchedule.length === 0 && <li className="py-1 text-gray-400 text-center">No tasks scheduled.</li>}
                {sortedSchedule.map(task => (
                    <li key={task.id} className="py-1 flex items-center justify-between group transition-all duration-200">
                        {editingId === task.id ? (
                            <>
                                <input
                                    type="text"
                                    className="rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-btgyellow bg-white flex-1"
                                    value={editTitle}
                                    onChange={e => setEditTitle(e.target.value)}
                                />
                                <div className="flex items-center gap-2">
                                    <label className="text-xs text-gray-500">From</label>
                                    <input
                                        type="time"
                                        className="rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-btgyellow"
                                        value={editStartTime}
                                        onChange={e => setEditStartTime(e.target.value)}
                                    />
                                    <label className="text-xs text-gray-500">To</label>
                                    <input
                                        type="time"
                                        className="rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-btgyellow"
                                        value={editEndTime}
                                        onChange={e => setEditEndTime(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="ml-1 bg-btggreen text-white rounded-lg px-2 py-1 text-xs md:text-sm hover:bg-btgyellow hover:text-btggreen transition-all duration-200"
                                    onClick={() => handleSaveEdit(task.id)}
                                >
                                    Save
                                </button>
                                <button
                                    className="ml-1 bg-btgorange text-white rounded-lg px-2 py-1 text-xs md:text-sm hover:bg-btgcream hover:text-btgorange transition-all duration-200"
                                    onClick={handleCancelEdit}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1">
                                    <span className="font-semibold text-btggreen mr-2">{task.title}</span>
                                    <span className="bg-btgyellow/60 text-xs px-2 py-0.5 rounded mr-2">From {formatTime(task.startTime)} to {formatTime(task.endTime)}</span>
                                </div>
                                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                                    <button
                                        className="ml-1 text-btgyellow hover:text-btgorange text-xs transition-colors"
                                        onClick={() => handleEdit(task)}
                                    >
                                        <span className="material-symbols-outlined text-base">edit</span>
                                    </button>
                                    <button
                                        className="ml-1 text-btgorange hover:text-red-600 text-xs transition-transform duration-200 transform hover:scale-125"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        <span className="material-symbols-outlined text-base">delete</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScheduleSection; 
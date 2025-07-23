import React, { useState, useRef, useEffect } from 'react';
import { getTimelineTasks, saveTimelineTasks } from '../services/api';

const TimelineTodo = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [modalInputValue, setModalInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);
    const modalInputRef = useRef(null);
    const modalEditInputRef = useRef(null);
    const [modalEditingTaskId, setModalEditingTaskId] = useState(null);
    const [modalEditValue, setModalEditValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const username = localStorage.getItem('btg_username') || '';

    // Fetch tasks on mount
    useEffect(() => {
        if (!username) {
            setLoading(false);
            setError('You must be logged in to use the timeline.');
            return;
        }
        getTimelineTasks(username)
            .then(res => {
                if (res.success) setTasks(res.timelineTasks || []);
                else setError('Failed to load tasks.');
            })
            .catch(() => setError('Failed to load tasks.'))
            .finally(() => setLoading(false));
    }, [username]);

    // Save tasks to backend on change
    useEffect(() => {
        if (!username || loading) return;
        saveTimelineTasks(username, tasks);
    }, [tasks, username, loading]);

    // Add new task (main)
    const handleAddTask = () => {
        if (!username || inputValue.trim() === '') return;
        setTasks([
            ...tasks,
            { id: Date.now() + Math.random(), text: inputValue, color: 'bg-btggreen', deleting: false },
        ]);
        setInputValue('');
        setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
    };
    // Add new task (modal)
    const handleModalAddTask = () => {
        if (!username || modalInputValue.trim() === '') return;
        setTasks([
            ...tasks,
            { id: Date.now() + Math.random(), text: modalInputValue, color: 'bg-btggreen', deleting: false },
        ]);
        setModalInputValue('');
        setTimeout(() => modalInputRef.current && modalInputRef.current.focus(), 100);
    };
    // Remove task with animation
    const handleRemoveTask = (id) => {
        setTasks(ts => ts.map(t => t.id === id ? { ...t, deleting: true } : t));
        setTimeout(() => {
            setTasks(ts => ts.filter(t => t.id !== id));
        }, 350);
    };
    // Start editing (main)
    const handleEditTask = (id, text) => {
        setEditingTaskId(id);
        setEditValue(text);
        setTimeout(() => editInputRef.current && editInputRef.current.focus(), 100);
    };
    // Save edit (main)
    const handleSaveEdit = (id) => {
        setTasks(ts => ts.map(t => t.id === id ? { ...t, text: editValue } : t));
        setEditingTaskId(null);
        setEditValue('');
    };
    // Cancel edit (main)
    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditValue('');
    };
    // Start editing (modal)
    const handleModalEditTask = (id, text) => {
        setModalEditingTaskId(id);
        setModalEditValue(text);
        setTimeout(() => modalEditInputRef.current && modalEditInputRef.current.focus(), 100);
    };
    // Save edit (modal)
    const handleModalSaveEdit = (id) => {
        setTasks(ts => ts.map(t => t.id === id ? { ...t, text: modalEditValue } : t));
        setModalEditingTaskId(null);
        setModalEditValue('');
    };
    // Cancel edit (modal)
    const handleModalCancelEdit = () => {
        setModalEditingTaskId(null);
        setModalEditValue('');
    };

    // Animations for modal and tasks
    const modalBgClass = showModal ? 'backdrop-blur-sm bg-black/30 opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none';
    const modalClass = showModal ? 'scale-100 opacity-100' : 'scale-90 opacity-0';

    // Render a single task (with edit/delete) for main list
    const renderTask = (task) => (
        <div
            key={task.id}
            className={`flex items-center gap-2 text-sm group transition-all duration-350 ${task.deleting ? 'opacity-0 translate-x-8 pointer-events-none' : 'opacity-100'} bg-btgcream rounded-lg px-3 py-2 shadow-sm`}
            style={{ transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)' }}
        >
            <span className={`w-2 h-2 rounded-full ${task.color}`}></span>
            {editingTaskId === task.id ? (
                <div className="flex-1 flex flex-col gap-2">
                    <input
                        ref={editInputRef}
                        type="text"
                        className="w-full rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-btgyellow bg-white"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') handleSaveEdit(task.id);
                            if (e.key === 'Escape') handleCancelEdit();
                        }}
                    />
                    <div className="flex gap-2 justify-end">
                        <button
                            className="bg-btggreen text-white rounded-lg px-2 py-1 text-xs md:text-sm hover:bg-btgyellow hover:text-btggreen transition-all duration-200"
                            onClick={() => handleSaveEdit(task.id)}
                        >
                            Save
                        </button>
                        <button
                            className="bg-btgorange text-white rounded-lg px-2 py-1 text-xs md:text-sm hover:bg-btgcream hover:text-btgorange transition-all duration-200"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <span className="flex-1">{task.text}</span>
                    <button
                        className="ml-1 text-btgyellow hover:text-btgorange text-xs transition-colors"
                        onClick={() => handleEditTask(task.id, task.text)}
                        title="Edit task"
                        disabled={!username}
                    >
                        <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                    <button
                        className="ml-1 text-btgorange hover:text-red-600 text-xs transition-transform duration-200 transform hover:scale-125"
                        onClick={() => handleRemoveTask(task.id)}
                        title="Delete task"
                        disabled={!username}
                    >
                        <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                </>
            )}
        </div>
    );

    // Render a single task (with edit/delete) for modal
    const renderModalTask = (task) => (
        <div
            key={task.id}
            className={`flex items-center gap-2 text-sm group transition-all duration-350 ${task.deleting ? 'opacity-0 translate-x-8 pointer-events-none' : 'opacity-100'} bg-btgcream rounded-lg px-3 py-2 shadow-sm`}
            style={{ transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)' }}
        >
            <span className={`w-2 h-2 rounded-full ${task.color}`}></span>
            {modalEditingTaskId === task.id ? (
                <div className="flex-1 flex flex-col gap-2">
                    <input
                        ref={modalEditInputRef}
                        type="text"
                        className="w-full rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-btgyellow bg-white"
                        value={modalEditValue}
                        onChange={e => setModalEditValue(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') handleModalSaveEdit(task.id);
                            if (e.key === 'Escape') handleModalCancelEdit();
                        }}
                    />
                    <div className="flex gap-2 justify-end">
                        <button
                            className="bg-btggreen text-white rounded-lg px-2 py-1 text-xs md:text-sm hover:bg-btgyellow hover:text-btggreen transition-all duration-200"
                            onClick={() => handleModalSaveEdit(task.id)}
                        >
                            Save
                        </button>
                        <button
                            className="bg-btgorange text-white rounded-lg px-2 py-1 text-xs md:text-sm hover:bg-btgcream hover:text-btgorange transition-all duration-200"
                            onClick={handleModalCancelEdit}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <span className="flex-1">{task.text}</span>
                    <button
                        className="ml-1 text-btgyellow hover:text-btgorange text-xs transition-colors"
                        onClick={() => handleModalEditTask(task.id, task.text)}
                        title="Edit task"
                        disabled={!username}
                    >
                        <span className="material-symbols-outlined text-base">edit</span>
                    </button>
                    <button
                        className="ml-1 text-btgorange hover:text-red-600 text-xs transition-transform duration-200 transform hover:scale-125"
                        onClick={() => handleRemoveTask(task.id)}
                        title="Delete task"
                        disabled={!username}
                    >
                        <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                </>
            )}
        </div>
    );

    if (loading) return <div className="text-center text-btggreen py-4">Loading timeline...</div>;
    if (error) return <div className="text-center text-btgorange py-4">{error}</div>;

    return (
        <div className="flex flex-col gap-1 mt-2">
            <div className="flex gap-2 mb-2">
                <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-btgyellow bg-white transition-all duration-200"
                    placeholder="Add a task for today..."
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') handleAddTask();
                    }}
                    disabled={!username}
                />
                <button
                    className="bg-btggreen text-white rounded-lg px-3 py-1 text-xs md:text-sm shadow hover:bg-btgyellow hover:text-btggreen transition-all duration-200"
                    onClick={handleAddTask}
                    disabled={!username}
                >
                    Add
                </button>
            </div>
            <div className="flex flex-col gap-1">
                {tasks.slice(0, 3).map(renderTask)}
                {tasks.length > 3 && (
                    <span className="text-xs text-btggreen mt-1">+{tasks.length - 3} more</span>
                )}
            </div>
            <button
                className="mt-1 bg-btggreen text-white rounded-lg px-3 py-1 text-xs shadow hover:bg-btgyellow hover:text-btggreen transition-all duration-200"
                onClick={() => setShowModal(true)}
                disabled={!username}
            >
                View details
            </button>
            {/* Modal Popup */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${modalBgClass}`}
                style={{ backdropFilter: showModal ? 'blur(6px)' : 'none' }}
                onClick={() => setShowModal(false)}
            >
                <div
                    className={`bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 flex flex-col gap-4 transition-all duration-300 ${modalClass}`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-lg text-btggreen">Today's Tasks</span>
                        <button
                            className="text-btgorange hover:text-red-600 text-xl transition-transform duration-200 transform hover:scale-125"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    {/* Add task in modal */}
                    <div className="flex gap-2 mb-2">
                        <input
                            ref={modalInputRef}
                            type="text"
                            className="flex-1 rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-btgyellow bg-white transition-all duration-200"
                            placeholder="Add a task for today..."
                            value={modalInputValue}
                            onChange={e => setModalInputValue(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') handleModalAddTask();
                            }}
                            disabled={!username}
                        />
                        <button
                            className="bg-btggreen text-white rounded-lg px-3 py-1 text-xs md:text-sm shadow hover:bg-btgyellow hover:text-btggreen transition-all duration-200"
                            onClick={handleModalAddTask}
                            disabled={!username}
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                        {tasks.length === 0 ? (
                            <span className="text-gray-400 text-center">No tasks yet.</span>
                        ) : (
                            tasks.map(renderModalTask)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelineTodo; 
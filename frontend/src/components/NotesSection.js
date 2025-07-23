import React, { useState, useRef } from 'react';

const CARD_COLORS = [
  'bg-pink-200',
  'bg-purple-200',
  'bg-green-200',
  'bg-yellow-200',
];

function getUserNotes() {
  const username = localStorage.getItem('btg_username') || '';
  if (!username) return [];
  try {
    return JSON.parse(localStorage.getItem(`notes_${username}`) || '[]');
  } catch {
    return [];
  }
}
function saveUserNotes(notes) {
  const username = localStorage.getItem('btg_username') || '';
  if (!username) return;
  localStorage.setItem(`notes_${username}`, JSON.stringify(notes));
}

const NotesSection = () => {
  const [notes, setNotes] = useState(getUserNotes());
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  // Save notes to localStorage on change
  React.useEffect(() => { saveUserNotes(notes); }, [notes]);

  const handleAdd = () => {
    if (!title.trim() && !body.trim()) return;
    setNotes(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        title: title.trim() || 'Untitled',
        body: body.trim(),
        colorIdx: prev.length % CARD_COLORS.length,
      },
    ]);
    setTitle('');
    setBody('');
    setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
  };
  const handleDelete = (id) => setNotes(prev => prev.filter(n => n.id !== id));
  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditBody(note.body);
  };
  const handleSaveEdit = (id) => {
    setNotes(prev => prev.map(n => n.id === id ? { ...n, title: editTitle, body: editBody } : n));
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
  };

  // Auto-resize textarea
  const handleBodyChange = (e) => {
    setBody(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-stretch pb-2">
        <input
          ref={inputRef}
          type="text"
          className="w-[200px] mx-auto rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-btgyellow bg-btgcream text-gray-900"
          placeholder="Note title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          ref={textareaRef}
          className="min-w-[40px] w-[500px] mx-auto rounded-lg border border-btggreen px-2 py-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-btgyellow bg-btgcream text-gray-900 min-h-[40px] resize-none overflow-hidden"
          placeholder="Write your note..."
          value={body}
          onChange={handleBodyChange}
          rows={1}
        />
        <button
          className="bg-btggreen w-[90px] mx-auto text-white rounded-lg px-3 py-1 text-xs md:text-sm shadow hover:bg-btgyellow hover:text-btggreen transition-all duration-200"
          onClick={handleAdd}
        >
          Add Note
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {notes.map((note, i) => (
          <div
            key={note.id}
            className={`relative rounded-[20px] border border-gray-900 p-7 min-h-[220px] flex flex-col ${CARD_COLORS[note.colorIdx]} transition-all duration-200`}
            style={{ boxShadow: '7px 7px 0px 0px #000000', fontFamily: 'Libertinus Mono, monospace' }}
          >
            <div className="absolute top-4 right-4 flex gap-1 mb-4">
              <button className="text-btgyellow hover:text-btgorange text-xs" onClick={() => handleEdit(note)} title="Edit"><span className="material-symbols-outlined text-base">edit</span></button>
              <button className="text-btgorange hover:text-red-600 text-xs" onClick={() => handleDelete(note.id)} title="Delete"><span className="material-symbols-outlined text-base">delete</span></button>
            </div>
            {editingId === note.id ? (
              <>
                <input
                  type="text"
                  className="rounded-lg border border-btggreen px-2 py-1 text-base font-semibold mb-2 focus:outline-none focus:ring-2 focus:ring-btgyellow bg-white text-gray-900 text-center"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <textarea
                  className="rounded-lg border border-btggreen px-2 py-1 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-btgyellow bg-white text-gray-900 min-h-[40px] text-center"
                  value={editBody}
                  onChange={e => setEditBody(e.target.value)}
                />
                <div className="flex gap-2 justify-center">
                  <button className="bg-btggreen text-white rounded-lg px-3 py-1 text-xs md:text-sm hover:bg-btgyellow hover:text-btggreen transition-all duration-200" onClick={() => handleSaveEdit(note.id)}>Save</button>
                  <button className="bg-btgorange text-white rounded-lg px-3 py-1 text-xs md:text-sm hover:bg-btgcream hover:text-btgorange transition-all duration-200" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center w-full">
                  <div className="font-bold text-xl mb-2 text-gray-900 text-center w-full">{note.title}</div>
                  <div className="text-gray-700 text-base text-center flex-1 w-full">{note.body}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default NotesSection; 
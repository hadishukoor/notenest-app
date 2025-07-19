import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/notes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error('Could not fetch notes. Your session might have expired.');
        }
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        setError(err.message);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [navigate]);

  const handleInputChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newNote),
      });
      if (!response.ok) throw new Error('Note creation failed.');
      const createdNote = await response.json();
      setNewNote({ title: '', content: '' });
      setNotes(prevNotes => [createdNote, ...prevNotes]);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete note.');
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (err) {
      alert(err.message);
    }
  };
  
  if (loading) {
    return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading your notes...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>Error: {error} Please <a href="/login">log in</a> again.</div>;
  }

  return (
    <div className="notes-container">
      {/* This 'note-form' class is key for styling the container */}
      <div className="note-form">
        <h2>Create a New Note</h2>
        <form onSubmit={handleCreateNote}>
          {/* These form elements will now be styled by the rules in index.css */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newNote.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={newNote.content}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit">Add Note</button>
        </form>
      </div>

      <div className="notes-list">
        <h2>Your Notes</h2>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="note-item">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleDeleteNote(note._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>You have no notes yet. Create one!</p>
        )}
      </div>
    </div>
  );
};

export default Notes;
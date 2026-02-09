import { useMemo, useState } from 'react'
import './App.css'

const starterNotes = [
  {
    id: 1,
    title: 'Welcome to Glass Notes',
    content:
      'Add a title and a short note. Click “Add note” to save it as a card.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Beginner tip ✨',
    content:
      'Short, clear notes are easier to scan. Use bullet points when possible.',
    createdAt: new Date().toISOString(),
  },
]

function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [notes, setNotes] = useState(starterNotes)

  const noteCount = useMemo(() => notes.length, [notes])

  const handleAddNote = (event) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle && !trimmedContent) return

    const newNote = {
      id: Date.now(),
      title: trimmedTitle || 'Untitled note',
      content: trimmedContent || 'No details yet.',
      createdAt: new Date().toISOString(),
    }

    setNotes((prev) => [newNote, ...prev])
    setTitle('')
    setContent('')
  }

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="badge">Notify</p>
          <h1>Notes</h1>
          <p className="subtitle">
            Capture your thoughts instantly. Organize, reflect, and never lose an idea.
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-label">Total notes</span>
            <span className="stat-value">{noteCount}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Quick tip</span>
            <span className="stat-value">Keep it simple</span>
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="form-card">
          <h2>Create a note</h2>
          <p className="helper-text">
            Add a short title and a few lines. Your notes appear instantly.
          </p>

          <form onSubmit={handleAddNote} className="note-form">
            <label className="field">
              <span>Title</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Grocery list"
                type="text"
              />
            </label>

            <label className="field">
              <span>Note</span>
              <textarea
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Milk, eggs, bread..."
                rows={4}
              />
            </label>

            <div className="actions">
              <button type="submit" className="primary">
                Add note
              </button>
              <p className="tiny">
                Empty notes are ignored to keep things tidy.
              </p>
            </div>
          </form>
        </section>

        <section className="notes-section">
          <div className="section-header">
            <h2>Your notes</h2>
            <span className="section-subtitle">
              Click a note’s trash icon to delete it.
            </span>
          </div>

          {notes.length === 0 ? (
            <div className="empty-state">
              <h3>No notes yet</h3>
              <p>Start by writing your first note on the left.</p>
            </div>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <article className="note-card" key={note.id}>
                  <div className="note-header">
                    <h3>{note.title}</h3>
                    <button
                      type="button"
                      onClick={() => handleDeleteNote(note.id)}
                      aria-label={`Delete ${note.title}`}
                      className="ghost"
                    >
                      🗑️
                    </button>
                  </div>
                  <p>{note.content}</p>
                  <time className="note-meta">
                    {new Date(note.createdAt).toLocaleString()}
                  </time>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App

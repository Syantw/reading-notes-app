import React, { useState } from 'react';

const sidebarBg = '#fff';
const sidebarBorder = '#f0f0f0';
const mainBg = '#f7f8fa';
const cardShadow = '0 2px 8px rgba(0,0,0,0.04)';
const noteColors = ['#e6e6fa', '#ffe4c4', '#e6ffe6', '#fff9e6'];
const folderColor = '#ffcc66';

const folders = [
  { abbr: 'O', name: 'Ongoing' },
  { abbr: 'R', name: 'Reading' },
  { abbr: 'W', name: 'Watching' },
  { abbr: 'L', name: 'Listening' },
  { abbr: 'P', name: 'Personal' },
  { abbr: 'W', name: 'Work' },
  { abbr: 'P', name: 'Projects' },
  { abbr: 'B', name: 'Books' },
];

function Sidebar({ onCreateNote }) {
  return (
    <aside
      style={{
        width: 260,
        background: sidebarBg,
        borderRight: `1px solid ${sidebarBorder}`,
        padding: '32px 0 24px 0',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ padding: '0 32px', marginBottom: 40 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c1ff72 60%, #1e2d1f 100%)',
              marginRight: 12,
            }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#222' }}>
              Syncscribe
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>Meet Desai</div>
          </div>
        </div>
      </div>
      <nav style={{ flex: 1 }}>
        <div style={{ padding: '0 32px' }}>
          <button
            style={{
              width: '100%',
              background: '#222',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 0',
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            onClick={onCreateNote}
          >
            <span>＋</span> Create Note
          </button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              marginBottom: 32,
            }}
          >
            <span style={{ color: '#222', fontWeight: 500, cursor: 'pointer' }}>
              🔍 Search
            </span>
            <span style={{ color: '#222', fontWeight: 500, cursor: 'pointer' }}>
              🗄️ Archives
            </span>
          </div>
          <div>
            <div
              style={{
                color: '#888',
                fontWeight: 600,
                fontSize: 13,
                marginBottom: 8,
              }}
            >
              Folders
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {folders.map((f) => (
                <span
                  key={f.abbr}
                  style={{
                    color: '#222',
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: 'pointer',
                    padding: '2px 0',
                  }}
                >
                  {f.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div style={{ padding: '0 32px', marginTop: 32 }}>
        <div
          style={{
            color: '#888',
            fontSize: 14,
            marginBottom: 8,
            cursor: 'pointer',
          }}
        >
          ⚙️ Settings
        </div>
        <div
          style={{
            color: '#888',
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          ❓ Help
        </div>
      </div>
    </aside>
  );
}

function NoteList({ notes }) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 24,
          marginTop: 8,
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 24, color: '#222', flex: 1 }}>
          My Notes
        </h2>
        <div
          style={{
            display: 'flex',
            gap: 8,
            background: '#f0f0f0',
            borderRadius: 12,
            padding: 4,
          }}
        >
          <button
            style={{
              background: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '6px 16px',
              fontWeight: 500,
              color: '#222',
              cursor: 'pointer',
            }}
          >
            Today
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              borderRadius: 8,
              padding: '6px 16px',
              fontWeight: 500,
              color: '#888',
              cursor: 'pointer',
            }}
          >
            This Week
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              borderRadius: 8,
              padding: '6px 16px',
              fontWeight: 500,
              color: '#888',
              cursor: 'pointer',
            }}
          >
            This Month
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        {notes.map((note, idx) => (
          <div
            key={idx}
            style={{
              background: note.color,
              borderRadius: 18,
              boxShadow: cardShadow,
              padding: '20px 18px 18px 18px',
              minWidth: 220,
              maxWidth: 240,
              flex: '1 1 0',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                color: '#222',
                marginBottom: 8,
              }}
            >
              {note.title}
            </div>
            <div
              style={{
                fontSize: 13,
                color: '#888',
                marginBottom: 12,
                fontWeight: 500,
              }}
            >
              {note.date}
            </div>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {note.items.map((item, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 14,
                    color: '#222',
                    marginBottom: 6,
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <span
              style={{
                position: 'absolute',
                right: 16,
                bottom: 12,
                fontSize: 18,
                color: '#7ed957',
                cursor: 'pointer',
              }}
              title="Edit"
            >
              ✎
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentFolders() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 18,
        }}
      >
        <h3 style={{ fontWeight: 700, fontSize: 18, color: '#222', flex: 1 }}>
          Recent Folders
        </h3>
        <div
          style={{
            display: 'flex',
            gap: 8,
            background: '#f0f0f0',
            borderRadius: 12,
            padding: 4,
          }}
        >
          <button
            style={{
              background: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '4px 12px',
              fontWeight: 500,
              color: '#222',
              cursor: 'pointer',
            }}
          >
            All
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              borderRadius: 8,
              padding: '4px 12px',
              fontWeight: 500,
              color: '#888',
              cursor: 'pointer',
            }}
          >
            Recent
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              borderRadius: 8,
              padding: '4px 12px',
              fontWeight: 500,
              color: '#888',
              cursor: 'pointer',
            }}
          >
            Last modified
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 32 }}>
        {folders.slice(0, 5).map((folder) => (
          <div
            key={folder.abbr}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minWidth: 90,
            }}
          >
            <div
              style={{
                width: 56,
                height: 48,
                background: folderColor,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 20,
                color: '#fff',
                marginBottom: 8,
                boxShadow: cardShadow,
              }}
            >
              {folder.abbr}
            </div>
            <div
              style={{
                fontSize: 14,
                color: '#222',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              {folder.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Homepage() {
  const [notes, setNotes] = useState([
    {
      title: 'Reminders',
      date: '2025-06-27',
      color: noteColors[0],
      items: [
        'Dentist appointment on Tuesday',
        'Submit report by end of the day',
        'Send email to boss',
      ],
    },
    {
      title: 'Reminders',
      date: '2025-06-27',
      color: noteColors[1],
      items: [
        'Dentist appointment on Tuesday',
        'Submit report by end of the day',
        'Send email to boss',
      ],
    },
    {
      title: 'Random Thoughts',
      date: '2025-06-27',
      color: noteColors[2],
      items: [
        'Success is a journey, not a destination.',
        'Try a new recipe this weekend',
        'Don\'t forget to water the plants',
      ],
    },
    {
      title: 'Books to Read',
      date: '2025-06-27',
      color: noteColors[3],
      items: [
        '"The Power of Habit" by Charles Duhigg',
        '"Atomic Habits" by James Clear',
        '"The Alchemist" by Paulo Coelho',
      ],
    },
    {
      title: 'Books to Read',
      date: '2025-06-27',
      color: noteColors[3],
      items: [
        '"The Power of Habit" by Charles Duhigg',
        '"Atomic Habits" by James Clear',
        '"The Alchemist" by Paulo Coelho',
      ],
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    color: noteColors[0],
    items: '',
  });

  const handleCreateNote = () => setShowForm(true);
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.items) return;
    setNotes([
      ...notes,
      {
        title: form.title,
        date: form.date,
        color: form.color,
        items: form.items.split('\n').filter(Boolean),
      },
    ]);
    setForm({ title: '', date: '', color: noteColors[0], items: '' });
    setShowForm(false);
  };
  const handleFormCancel = () => {
    setShowForm(false);
    setForm({ title: '', date: '', color: noteColors[0], items: '' });
  };

  return (
    <div
      style={{
        display: 'flex',
        background: mainBg,
        minHeight: '100vh',
        fontFamily:
          '\'Inter\', \'Helvetica Neue\', Arial, \'PingFang SC\', \'Hiragino Sans GB\', \'Microsoft YaHei\', sans-serif',
      }}
    >
      <Sidebar onCreateNote={handleCreateNote} />
      <main
        style={{
          flex: 1,
          padding: '48px 48px 0 48px',
          background: mainBg,
        }}
      >
        {showForm && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <form
              style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: cardShadow,
                padding: 32,
                minWidth: 320,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
              onSubmit={handleFormSubmit}
            >
              <h2 style={{ margin: 0, fontWeight: 700, fontSize: 20 }}>
                New Note
              </h2>
              <input
                name="title"
                placeholder="浮生六记"
                value={form.title}
                onChange={handleFormChange}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  border: '1px solid #eee',
                  width: '100%',
                  minWidth: 300,
                }}
                required
              />

              <select
                name="color"
                value={form.color}
                onChange={handleFormChange}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  border: '1px solid #eee',
                }}
              >
                {noteColors.map((c, i) => (
                  <option value={c} key={i}>
                    Color {i + 1}
                  </option>
                ))}
              </select>
              <textarea
                name="items"
                placeholder="One item per line"
                value={form.items}
                onChange={handleFormChange}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  border: '1px solid #eee',
                  minHeight: 80,
                }}
                required
              />
              <div
                style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}
              >
                <button
                  type="button"
                  onClick={handleFormCancel}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#eee',
                    color: '#222',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#222',
                    color: '#fff',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        )}
        <NoteList notes={notes} />
        <RecentFolders />
      </main>
    </div>
  );
}

export default Homepage;

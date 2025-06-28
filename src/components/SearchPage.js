import React, { useState } from 'react';

const SearchPage = ({ notes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const results = notes.filter(note => 
      note.title.toLowerCase().includes(term.toLowerCase()) ||
      note.category?.toLowerCase().includes(term.toLowerCase()) ||
      note.items.some(item => item.toLowerCase().includes(term.toLowerCase()))
    );
    setSearchResults(results);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
        🔍 Search Your Notes
      </h1>
      
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Search by title, category, or content..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '16px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            outline: 'none',
          }}
        />
      </div>

      {searchTerm && (
        <div>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Found {searchResults.length} result(s) for "{searchTerm}"
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '20px' 
          }}>
            {searchResults.map((note, idx) => (
              <div
                key={idx}
                style={{
                  background: note.color,
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
              >
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: '18px', 
                  marginBottom: '8px',
                  color: '#1f2937',
                }}>
                  {note.title}
                </h3>
                <p style={{ 
                  fontSize: '13px', 
                  color: '#6b7280', 
                  marginBottom: '12px' 
                }}>
                  📅 {note.date} {note.category && `• ${note.category}`}
                </p>
                <div>
                  {note.items.slice(0, 2).map((item, i) => (
                    <p key={i} style={{ 
                      fontSize: '14px', 
                      marginBottom: '6px',
                      color: '#1f2937',
                    }}>
                      • {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage; 
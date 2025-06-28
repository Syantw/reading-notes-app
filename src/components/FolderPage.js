import React from 'react';

const FolderPage = ({ folder, notes }) => {
  if (!folder) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>
          📁 Select a Category
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Choose a reading category from the sidebar to view related notes.
        </p>
      </div>
    );
  }

  // Filter notes by category (this is a placeholder - you'd implement actual filtering logic)
  const categoryNotes = notes.filter(note => {
    // This is a simple example - you'd implement more sophisticated filtering
    if (folder.name === 'Currently Reading') {
      return note.category === 'Reading' || note.title.toLowerCase().includes('reading');
    }
    if (folder.name === 'Finished') {
      return note.rating && note.rating > 0;
    }
    return true; // Show all notes for now
  });

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              background: `${folder.color}20`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}
          >
            {folder.abbr}
          </div>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            color: '#1f2937',
            margin: 0,
          }}>
            {folder.name}
          </h1>
        </div>
        
        <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
          {categoryNotes.length} {categoryNotes.length === 1 ? 'note' : 'notes'} in this category
        </p>
      </div>

      {categoryNotes.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          background: '#f9fafb',
          borderRadius: '16px',
          border: '2px dashed #d1d5db',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>{folder.abbr}</div>
          <h3 style={{ color: '#1f2937', marginBottom: '8px', fontSize: '20px' }}>
            No notes yet
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Start adding notes to your {folder.name.toLowerCase()} collection.
          </p>
          <button
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: folder.color,
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '16px',
            }}
            onClick={() => {
              // This would trigger the create note modal
              console.log('Create note for category:', folder.name);
            }}
          >
            Create First Note
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '24px' 
        }}>
          {categoryNotes.map((note, idx) => (
            <div
              key={idx}
              style={{
                background: note.color,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '12px',
              }}>
                <h3 style={{ 
                  fontWeight: 'bold', 
                  fontSize: '18px', 
                  margin: 0,
                  color: '#1f2937',
                  flex: 1,
                }}>
                  {note.title}
                </h3>
                {note.rating > 0 && (
                  <div style={{ display: 'flex', gap: '2px', marginLeft: '10px' }}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: i < note.rating ? '#fbbf24' : '#d1d5db',
                          fontSize: '14px',
                        }}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <p style={{ 
                fontSize: '13px', 
                color: '#6b7280', 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                📅 {note.date}
                {note.category && (
                  <>
                    <span>•</span>
                    <span style={{ 
                      background: 'rgba(0,0,0,0.1)', 
                      padding: '2px 8px', 
                      borderRadius: '12px',
                      fontSize: '11px',
                    }}>
                      {note.category}
                    </span>
                  </>
                )}
              </p>
              
              <div style={{ marginBottom: '16px' }}>
                {note.items.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: '14px',
                      color: '#1f2937',
                      marginBottom: '8px',
                      lineHeight: '1.5',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <span style={{ color: '#6b7280', marginTop: '2px' }}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
                {note.items.length > 3 && (
                  <div style={{ 
                    fontSize: '13px', 
                    color: '#6b7280', 
                    fontStyle: 'italic',
                    marginTop: '8px',
                  }}>
                    +{note.items.length - 3} more notes...
                  </div>
                )}
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={{
                      background: 'rgba(255,255,255,0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      transition: 'all 0.2s ease',
                    }}
                    title="Edit note"
                  >
                    ✏️
                  </button>
                  <button
                    style={{
                      background: 'rgba(255,255,255,0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      transition: 'all 0.2s ease',
                    }}
                    title="Move to another category"
                  >
                    📁
                  </button>
                </div>
                
                <div style={{
                  background: 'rgba(255,255,255,0.8)',
                  borderRadius: '8px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  color: '#6b7280',
                  fontWeight: '500',
                }}>
                  {folder.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Stats */}
      {categoryNotes.length > 0 && (
        <div style={{ 
          marginTop: '48px',
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
          <h3 style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            marginBottom: '20px', 
            color: '#1f2937' 
          }}>
            📊 Category Insights
          </h3>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px' 
          }}>
            <div style={{ 
              background: '#f9fafb', 
              padding: '16px', 
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: folder.color }}>
                {categoryNotes.length}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Notes</div>
            </div>
            
            <div style={{ 
              background: '#f9fafb', 
              padding: '16px', 
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: folder.color }}>
                {categoryNotes.filter(n => n.rating > 0).length}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Rated Books</div>
            </div>
            
            <div style={{ 
              background: '#f9fafb', 
              padding: '16px', 
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: folder.color }}>
                {categoryNotes.reduce((acc, note) => acc + note.items.length, 0)}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Insights</div>
            </div>
            
            <div style={{ 
              background: '#f9fafb', 
              padding: '16px', 
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: folder.color }}>
                {categoryNotes.filter(n => n.rating > 0).length > 0 
                  ? (categoryNotes.filter(n => n.rating > 0).reduce((acc, note) => acc + note.rating, 0) / categoryNotes.filter(n => n.rating > 0).length).toFixed(1)
                  : '—'
                }
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Avg Rating</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FolderPage; 
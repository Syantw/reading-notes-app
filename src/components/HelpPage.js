import React, { useState } from 'react';

const HelpPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = {
    'getting-started': {
      title: '🚀 Getting Started',
      content: (
        <div>
          <h3 style={{ color: '#1f2937', marginBottom: '16px' }}>Welcome to ReadingHub!</h3>
          <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
            ReadingHub is your personal reading companion designed to help you capture thoughts, 
            insights, and discoveries from your reading journey.
          </p>
          
          <h4 style={{ color: '#1f2937', marginBottom: '12px' }}>Quick Start:</h4>
          <ol style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li>Click "New Reading Note" to create your first note</li>
            <li>Add the book title, date, and category</li>
            <li>Write your thoughts, quotes, and insights</li>
            <li>Rate the book (optional)</li>
            <li>Save and organize your notes</li>
          </ol>
        </div>
      )
    },
    'features': {
      title: '✨ Features',
      content: (
        <div>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>📝 Smart Note Taking</h4>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Create rich notes with titles, dates, categories, and ratings. 
              Organize your thoughts with bullet points and colorful themes.
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>🔍 Powerful Search</h4>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Find any note instantly by searching through titles, categories, 
              or content. Never lose track of your insights again.
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>📚 Reading Categories</h4>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Organize your reading with predefined categories like "Currently Reading", 
              "Want to Read", "Finished", and more.
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>⭐ Rating System</h4>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Rate your books from 1 to 5 stars and easily find your favorites 
              in the archives section.
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>📦 Smart Archives</h4>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Sort and filter your notes by date, title, rating, or category. 
              Perfect for reviewing your reading history.
            </p>
          </div>
        </div>
      )
    },
    'tips': {
      title: '💡 Tips & Tricks',
      content: (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>📖 Effective Note Taking</h4>
            <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '20px' }}>
              <li>Write one insight per line for better organization</li>
              <li>Include page numbers for important quotes</li>
              <li>Use your own words to capture key concepts</li>
              <li>Add personal reflections and connections</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>🎨 Color Coding</h4>
            <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '20px' }}>
              <li>Use consistent colors for different types of books</li>
              <li>Yellow for self-help, Blue for fiction, Green for business, etc.</li>
              <li>Create your own color system that works for you</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>📱 Best Practices</h4>
            <ul style={{ color: '#6b7280', lineHeight: '1.6', paddingLeft: '20px' }}>
              <li>Take notes while reading, not after</li>
              <li>Review your notes regularly to reinforce learning</li>
              <li>Use the search function to connect ideas across books</li>
              <li>Export your data regularly as backup</li>
            </ul>
          </div>
        </div>
      )
    },
    'shortcuts': {
      title: '⌨️ Keyboard Shortcuts',
      content: (
        <div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '16px' 
          }}>
            <div style={{ 
              background: '#f9fafb', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
            }}>
              <h4 style={{ color: '#1f2937', marginBottom: '12px' }}>Navigation</h4>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                <p><kbd style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>Ctrl + N</kbd> New Note</p>
                <p><kbd style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>Ctrl + S</kbd> Save Note</p>
                <p><kbd style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>Ctrl + F</kbd> Search</p>
                <p><kbd style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>Esc</kbd> Close Modal</p>
              </div>
            </div>
            
            <div style={{ 
              background: '#f9fafb', 
              padding: '16px', 
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
            }}>
              <h4 style={{ color: '#1f2937', marginBottom: '12px' }}>Quick Actions</h4>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                <p><kbd style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>Tab</kbd> Next Field</p>
                <p><kbd style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>Shift + Tab</kbd> Previous Field</p>
                <p><kbd style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>Enter</kbd> Submit Form</p>
                <p><kbd style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>Ctrl + Enter</kbd> Quick Save</p>
              </div>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '20px', 
            padding: '16px', 
            background: '#eff6ff', 
            borderRadius: '8px',
            border: '1px solid #bfdbfe',
          }}>
            <p style={{ color: '#1e40af', margin: 0 }}>
              💡 <strong>Pro Tip:</strong> Most shortcuts work across all pages. 
              Try pressing Ctrl + N from anywhere to quickly create a new note!
            </p>
          </div>
        </div>
      )
    },
    'faq': {
      title: '❓ FAQ',
      content: (
        <div>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>How do I backup my notes?</h4>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Go to Settings → Data Management → Export Data. This will download 
              a JSON file with all your notes that you can import later.
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>Can I sync across devices?</h4>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Currently, ReadingHub stores data locally in your browser. 
              Use the export/import feature to transfer data between devices.
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>How many notes can I create?</h4>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              There's no limit! Create as many notes as you need. 
              The app is designed to handle thousands of notes efficiently.
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>Can I edit existing notes?</h4>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Yes! Click the edit icon (✏️) on any note card to modify its content, 
              rating, category, or any other details.
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ color: '#1f2937', marginBottom: '8px' }}>What browsers are supported?</h4>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              ReadingHub works on all modern browsers including Chrome, Firefox, 
              Safari, and Edge. For the best experience, use the latest version.
            </p>
          </div>
        </div>
      )
    }
  };

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '30px', maxWidth: '1200px' }}>
      {/* Sidebar Navigation */}
      <div style={{ 
        width: '250px', 
        flexShrink: 0,
        background: '#f9fafb',
        borderRadius: '12px',
        padding: '20px',
        height: 'fit-content',
        position: 'sticky',
        top: '20px',
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          marginBottom: '20px', 
          color: '#1f2937' 
        }}>
          Help Topics
        </h2>
        
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            style={{
              width: '100%',
              background: activeSection === key ? '#6366f1' : 'transparent',
              color: activeSection === key ? '#fff' : '#374151',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontWeight: activeSection === key ? '600' : '500',
              fontSize: '14px',
              transition: 'all 0.2s ease',
            }}
          >
            {section.title}
          </button>
        ))}
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <div style={{ 
          background: '#fff',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '24px', 
            color: '#1f2937' 
          }}>
            {sections[activeSection].title}
          </h1>
          
          {sections[activeSection].content}
        </div>
        
        {/* Contact Section */}
        <div style={{ 
          background: '#fff',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          marginTop: '20px',
        }}>
          <h3 style={{ color: '#1f2937', marginBottom: '12px' }}>Need More Help?</h3>
          <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
            Can't find what you're looking for? We're here to help!
          </p>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '2px solid #6366f1',
              background: '#6366f1',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
            }}>
              📧 Contact Support
            </button>
            
            <button style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '2px solid #6366f1',
              background: '#fff',
              color: '#6366f1',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '14px',
            }}>
              💬 Community Forum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage; 
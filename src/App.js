import React, { useState } from 'react';

// 设计系统颜色
const colors = {
  primary: '#4F46E5',
  primaryLight: '#818CF8',
  background: '#FAFAFA',
  sidebar: '#FFFFFF',
  cardBg: '#FFFFFF',
  border: '#E5E7EB',
  text: '#111827',
  textSecondary: '#6B7280',
  accent: '#F59E0B',
  success: '#10B981',
  note1: '#FEF3C7',
  note2: '#DBEAFE',
  note3: '#D1FAE5',
  note4: '#FCE7F3',
};

const noteColors = [colors.note1, colors.note2, colors.note3, colors.note4];

const categories = [
  { id: 'ongoing', name: 'Ongoing', icon: '📖', count: 3 },
  { id: 'reading', name: 'Reading', icon: '📚', count: 12 },
  { id: 'completed', name: 'Completed', icon: '✅', count: 8 },
  { id: 'wishlist', name: 'Wishlist', icon: '⭐', count: 15 },
  { id: 'notes', name: 'Notes', icon: '📝', count: 25 },
  { id: 'quotes', name: 'Quotes', icon: '💭', count: 18 },
];

const trendingAuthors = [
  { name: 'James Clear', followers: '1.2M', avatar: '👨‍💼', trending: true },
  { name: 'Brené Brown', followers: '980K', avatar: '👩‍🎓', trending: false },
  { name: 'Cal Newport', followers: '750K', avatar: '👨‍🔬', trending: true },
  { name: 'Ryan Holiday', followers: '890K', avatar: '👨‍💻', trending: false },
];

const popularBlogs = [
  {
    title: 'The Art of Deep Reading',
    author: 'Sarah Chen',
    views: '2.1K',
    comments: 89,
    timeAgo: '2 hours ago',
  },
  {
    title: 'Building Better Reading Habits',
    author: 'Mike Johnson',
    views: '1.8K',
    comments: 67,
    timeAgo: '5 hours ago',
  },
  {
    title: 'Note-Taking Strategies That Work',
    author: 'Lisa Wang',
    views: '3.2K',
    comments: 124,
    timeAgo: '1 day ago',
  },
];

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

function Sidebar({ onCreateNote, activeCategory, setActiveCategory }) {
  return (
    <aside
      style={{
        width: 280,
        background: colors.sidebar,
        borderRight: `1px solid ${colors.border}`,
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo区域 */}
      <div style={{ padding: '0 24px', marginBottom: 32 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              fontSize: 20,
            }}
          >
            📚
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: colors.text,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              ReadingHub
            </div>
            <div style={{ fontSize: 12, color: colors.textSecondary }}>
              Personal Library
            </div>
          </div>
        </div>
      </div>

      {/* 主要操作按钮 */}
      <div style={{ padding: '0 24px', marginBottom: 32 }}>
        <button
          onClick={onCreateNote}
          style={{
            width: '100%',
            background: colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '12px 16px',
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.background = colors.primaryLight;
          }}
          onMouseOut={(e) => {
            e.target.style.background = colors.primary;
          }}
        >
          <span>+</span> Add New Note
        </button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <NavItem icon="🔍" text="Search" />
          <NavItem icon="📊" text="Analytics" />
          <NavItem icon="🗄️" text="Archives" />
        </div>
      </div>

      {/* 分类导航 */}
      <nav style={{ flex: 1, padding: '0 24px' }}>
        <div
          style={{
            color: colors.textSecondary,
            fontWeight: 600,
            fontSize: 12,
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Categories
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </nav>

      {/* 底部设置 */}
      <div style={{ padding: '0 24px', marginTop: 32 }}>
        <NavItem icon="⚙️" text="Settings" />
        <NavItem icon="❓" text="Help & Support" />
      </div>
    </aside>
  );
}

// 导航项组件
function NavItem({ icon, text }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        borderRadius: 8,
        cursor: 'pointer',
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: 500,
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => {
        e.target.style.background = colors.background;
        e.target.style.color = colors.text;
      }}
      onMouseOut={(e) => {
        e.target.style.background = 'transparent';
        e.target.style.color = colors.textSecondary;
      }}
    >
      <span style={{ marginRight: 12 }}>{icon}</span>
      {text}
    </div>
  );
}

// 分类项组件
function CategoryItem({ category, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        borderRadius: 8,
        cursor: 'pointer',
        background: isActive ? colors.background : 'transparent',
        color: isActive ? colors.primary : colors.textSecondary,
        fontSize: 14,
        fontWeight: isActive ? 600 : 500,
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: 12 }}>{category.icon}</span>
        {category.name}
      </div>
      <span
        style={{
          background: isActive ? colors.primary : colors.border,
          color: isActive ? '#fff' : colors.textSecondary,
          fontSize: 12,
          padding: '2px 8px',
          borderRadius: 12,
          fontWeight: 600,
        }}
      >
        {category.count}
      </span>
    </div>
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
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
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
                background: '#ffcc66',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 20,
                color: '#fff',
                marginBottom: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
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

function MainContent({ notes, activeCategory }) {
  return (
    <main
      style={{
        flex: 1,
        padding: '32px 40px',
        background: colors.background,
        overflow: 'auto',
      }}
    >
      {/* 头部区域 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: colors.text,
              margin: 0,
              marginBottom: 4,
            }}
          >
            My Reading Notes
          </h1>
          <p style={{ color: colors.textSecondary, margin: 0 }}>
            Organize and track your reading journey
          </p>
        </div>

        {/* 筛选器 */}
        <div
          style={{
            display: 'flex',
            gap: 8,
            background: colors.sidebar,
            borderRadius: 12,
            padding: 4,
            border: `1px solid ${colors.border}`,
          }}
        >
          <FilterButton active text="All" />
          <FilterButton text="Recent" />
          <FilterButton text="Favorites" />
        </div>
      </div>

      {/* 统计卡片 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
          marginBottom: 32,
        }}
      >
        <StatsCard
          title="Total Books"
          value="47"
          change="+12%"
          icon="📚"
          color={colors.primary}
        />
        <StatsCard
          title="Reading Notes"
          value="156"
          change="+8%"
          icon="📝"
          color={colors.accent}
        />
        <StatsCard
          title="This Month"
          value="8"
          change="+25%"
          icon="📖"
          color={colors.success}
        />
      </div>

      {/* 笔记列表 */}
      <NoteGrid notes={notes} />

      {/* 阅读进度 */}
      <ReadingProgress />
    </main>
  );
}

// 统计卡片组件
function StatsCard({ title, value, change, icon, color }) {
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.text,
            marginBottom: 4,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: 14, color: colors.textSecondary }}>{title}</div>
        <div style={{ fontSize: 12, color: colors.success, marginTop: 2 }}>
          {change} from last month
        </div>
      </div>
    </div>
  );
}

// 筛选按钮组件
function FilterButton({ active, text }) {
  return (
    <button
      style={{
        background: active ? colors.primary : 'transparent',
        color: active ? '#fff' : colors.textSecondary,
        border: 'none',
        borderRadius: 8,
        padding: '8px 16px',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {text}
    </button>
  );
}

// 笔记网格组件
function NoteGrid({ notes }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 20,
        marginBottom: 40,
      }}
    >
      {notes.map((note, idx) => (
        <NoteCard key={idx} note={note} />
      ))}
    </div>
  );
}

// 笔记卡片组件
function NoteCard({ note }) {
  return (
    <div
      style={{
        background: note.color,
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        padding: 20,
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: colors.text,
          marginBottom: 8,
        }}
      >
        {note.title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: colors.textSecondary,
          marginBottom: 16,
          fontWeight: 500,
        }}
      >
        {note.time}
      </div>
      <div style={{ flex: 1 }}>
        {note.items.map((item, i) => (
          <div
            key={i}
            style={{
              fontSize: 14,
              color: colors.text,
              marginBottom: 8,
              lineHeight: 1.5,
            }}
          >
            • {item}
          </div>
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <span style={{ fontSize: 16 }}>✏️</span>
      </div>
    </div>
  );
}

// 阅读进度组件
function ReadingProgress() {
  const books = [
    { title: 'Atomic Habits', progress: 75, pages: 320, currentPage: 240 },
    { title: 'Deep Work', progress: 45, pages: 280, currentPage: 126 },
    { title: 'Mindset', progress: 90, pages: 250, currentPage: 225 },
  ];

  return (
    <div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: colors.text,
          marginBottom: 20,
        }}
      >
        Current Reading Progress
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {books.map((book, i) => (
          <ProgressItem key={i} book={book} />
        ))}
      </div>
    </div>
  );
}

// 进度项组件
function ProgressItem({ book }) {
  return (
    <div
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: 12,
        padding: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        📖
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            color: colors.text,
            marginBottom: 4,
          }}
        >
          {book.title}
        </div>
        <div
          style={{
            fontSize: 12,
            color: colors.textSecondary,
            marginBottom: 8,
          }}
        >
          Page {book.currentPage} of {book.pages}
        </div>
        <div
          style={{
            width: '100%',
            height: 6,
            background: colors.border,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${book.progress}%`,
              height: '100%',
              background: colors.primary,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: colors.primary,
        }}
      >
        {book.progress}%
      </div>
    </div>
  );
}

// 右侧边栏组件
function RightSidebar() {
  return (
    <aside
      style={{
        width: 320,
        background: colors.sidebar,
        borderLeft: `1px solid ${colors.border}`,
        padding: '32px 24px',
        overflow: 'auto',
      }}
    >
      {/* 趋势作者 */}
      <div style={{ marginBottom: 40 }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.text,
            marginBottom: 20,
          }}
        >
          Trending Authors
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {trendingAuthors.map((author, i) => (
            <AuthorItem key={i} author={author} />
          ))}
        </div>
      </div>

      {/* 热门博客 */}
      <div>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.text,
            marginBottom: 20,
          }}
        >
          Popular Blogs
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {popularBlogs.map((blog, i) => (
            <BlogItem key={i} blog={blog} />
          ))}
        </div>
      </div>
    </aside>
  );
}

// 作者项组件
function AuthorItem({ author }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => {
        e.target.style.background = colors.background;
      }}
      onMouseOut={(e) => {
        e.target.style.background = 'transparent';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: colors.background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
          }}
        >
          {author.avatar}
        </div>
        <div>
          <div
            style={{
              fontWeight: 600,
              color: colors.text,
              fontSize: 14,
              marginBottom: 2,
            }}
          >
            {author.name}
          </div>
          <div style={{ fontSize: 12, color: colors.textSecondary }}>
            {author.followers} followers
          </div>
        </div>
      </div>
      <button
        style={{
          background: author.trending ? colors.primary : colors.border,
          color: author.trending ? '#fff' : colors.textSecondary,
          border: 'none',
          borderRadius: 20,
          padding: '6px 12px',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        {author.trending ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}

// 博客项组件
function BlogItem({ blog }) {
  return (
    <div
      style={{
        background: colors.background,
        borderRadius: 12,
        padding: 16,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-1px)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
      }}
    >
      <div
        style={{
          fontWeight: 600,
          color: colors.text,
          fontSize: 14,
          marginBottom: 8,
          lineHeight: 1.4,
        }}
      >
        {blog.title}
      </div>
      <div
        style={{
          fontSize: 12,
          color: colors.textSecondary,
          marginBottom: 8,
        }}
      >
        by {blog.author}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 11,
          color: colors.textSecondary,
        }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <span>👁 {blog.views}</span>
          <span>💬 {blog.comments}</span>
        </div>
        <span>{blog.timeAgo}</span>
      </div>
    </div>
  );
}

function App() {
  const [notes, setNotes] = useState([
    {
      title: 'Deep Work Insights',
      time: 'Today, 2:30 PM',
      color: noteColors[0],
      items: [
        'Focus is becoming increasingly rare in our economy',
        'Deep work produces better results than shallow work',
        'Need to create distraction-free environment',
      ],
    },
    {
      title: 'Atomic Habits Notes',
      time: 'Yesterday, 9:15 AM',
      color: noteColors[1],
      items: [
        'Small changes compound over time',
        'Focus on systems rather than goals',
        'Make good habits obvious and attractive',
        'Start with 2-minute rule',
      ],
    },
    {
      title: 'Mindfulness Practice',
      time: 'Dec 15, 2024',
      color: noteColors[2],
      items: [
        'Daily meditation improves focus',
        'Breathing exercises reduce stress',
        'Present moment awareness is key',
      ],
    },
    {
      title: 'Leadership Principles',
      time: 'Dec 14, 2024',
      color: noteColors[3],
      items: [
        'Lead by example, not by authority',
        'Active listening builds trust',
        'Feedback should be specific and actionable',
        'Empower team members to make decisions',
      ],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState('notes');
  const [form, setForm] = useState({
    title: '',
    time: '',
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

    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    setNotes([
      {
        title: form.title,
        time: form.time || timeString,
        color: form.color,
        items: form.items.split('\n').filter(Boolean),
      },
      ...notes,
    ]);

    setForm({ title: '', time: '', color: noteColors[0], items: '' });
    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setForm({ title: '', time: '', color: noteColors[0], items: '' });
  };

  return (
    <div
      style={{
        display: 'flex',
        background: colors.background,
        minHeight: '100vh',
        fontFamily: '\'Inter\', sans-serif',
        color: colors.text,
      }}
    >
      <Sidebar
        onCreateNote={handleCreateNote}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <MainContent notes={notes} activeCategory={activeCategory} />
      <RightSidebar />

      {/* 新增笔记表单弹窗 */}
      {showForm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
          }}
        >
          <form
            onSubmit={handleFormSubmit}
            style={{
              background: colors.sidebar,
              borderRadius: 20,
              padding: 32,
              minWidth: 400,
              maxWidth: 500,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              border: `1px solid ${colors.border}`,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontWeight: 700,
                fontSize: 24,
                color: colors.text,
              }}
            >
              Create New Note
            </h2>

            <input
              name="title"
              placeholder="Note title..."
              value={form.title}
              onChange={handleFormChange}
              style={{
                padding: 16,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                fontSize: 16,
                background: colors.background,
                color: colors.text,
                outline: 'none',
                transition: 'border-color 0.2s ease',
              }}
              required
            />

            <input
              name="time"
              placeholder="Date (optional)"
              value={form.time}
              onChange={handleFormChange}
              style={{
                padding: 16,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                fontSize: 16,
                background: colors.background,
                color: colors.text,
                outline: 'none',
              }}
            />

            <select
              name="color"
              value={form.color}
              onChange={handleFormChange}
              style={{
                padding: 16,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                fontSize: 16,
                background: colors.background,
                color: colors.text,
                outline: 'none',
              }}
            >
              {noteColors.map((color, i) => (
                <option value={color} key={i}>
                  Color Theme {i + 1}
                </option>
              ))}
            </select>

            <textarea
              name="items"
              placeholder="Write your notes here... (one point per line)"
              value={form.items}
              onChange={handleFormChange}
              style={{
                padding: 16,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                fontSize: 16,
                background: colors.background,
                color: colors.text,
                outline: 'none',
                minHeight: 120,
                resize: 'vertical',
                fontFamily: 'inherit',
                lineHeight: 1.5,
              }}
              required
            />

            <div
              style={{
                display: 'flex',
                gap: 12,
                justifyContent: 'flex-end',
                marginTop: 8,
              }}
            >
              <button
                type="button"
                onClick={handleFormCancel}
                style={{
                  padding: '12px 24px',
                  borderRadius: 12,
                  border: `1px solid ${colors.border}`,
                  background: colors.background,
                  color: colors.textSecondary,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  borderRadius: 12,
                  border: 'none',
                  background: colors.primary,
                  color: '#fff',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Create Note
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

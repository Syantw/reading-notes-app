# Reading Notes App

A modern, interactive note-taking application built with React for managing reading notes and thoughts.

## 🌟 Features

### Core Functionality
- ✅ **Create Notes**: Add new notes with title, date, folder categorization, and content
- ✅ **Edit Notes**: Modify existing notes with inline editing
- ✅ **Delete Notes**: Remove unwanted notes with confirmation
- ✅ **Search Notes**: Real-time search across titles, content, and folders
- ✅ **Folder Organization**: Categorize notes into Reading, Learning, Projects, Ideas, and Archives
- ✅ **Color Themes**: Choose from multiple color schemes for visual organization

### User Experience
- 🎨 **Modern UI**: Clean, card-based interface with smooth animations
- 🔍 **Interactive Search**: Real-time filtering as you type
- 📱 **Responsive Design**: Works seamlessly on different screen sizes
- ⚡ **Fast Performance**: Optimized React components with useMemo for filtering
- 🎯 **Intuitive Navigation**: Sidebar navigation with folder-based filtering

### Component Architecture
- 🏗️ **Modular Components**: Well-organized component structure
- 🎨 **Theme System**: Centralized theme configuration
- 🔄 **State Management**: Efficient state handling with React hooks
- 📦 **Code Quality**: ESLint and Prettier for consistent code style

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Syantw/reading-notes-app.git
   cd reading-notes-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── App.js              # Main application component
├── App.css             # Application styles
├── index.js            # React DOM entry point
└── components/         # Reusable components
    ├── Sidebar.js      # Navigation sidebar
    ├── NoteList.js     # Notes display grid
    ├── NoteCard.js     # Individual note card
    ├── NoteForm.js     # Note creation/editing form
    └── RecentFolders.js # Quick folder access
```

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm build` - Create production build
- `npm test` - Run test suite
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run lint-check` - Check code without auto-fix
- `npm run format-check` - Check formatting without changes

## 💡 Usage Guide

### Creating a Note
1. Click the "Create Note" button in the sidebar
2. Fill in the note details:
   - **Title**: Give your note a descriptive title
   - **Date**: Set the date (optional)
   - **Folder**: Choose a category (Reading, Learning, etc.)
   - **Color**: Select a color theme
   - **Content**: Add your notes (one item per line)
3. Click "Create Note" to save

### Organizing Notes
- Use the **folder system** to categorize your notes
- Click on folder names in the sidebar to filter notes
- Use **Quick Access** buttons for faster navigation
- **Search** to find notes quickly across all categories

### Managing Notes
- **Edit**: Click the ✎ icon on any note card
- **Delete**: Click the 🗑 icon (with confirmation)
- **Filter**: Use the search bar or folder navigation

## 🎨 Customization

### Theme Configuration
The app uses a centralized theme system in `App.js`:

```javascript
const theme = {
  colors: {
    note: ['#e6e6fa', '#ffe4c4', '#e6ffe6', '#fff9e6'], // Note colors
    accent: '#7ed957', // Accent color
    // ... more theme options
  },
  spacing: {
    sm: 8, md: 16, lg: 24, xl: 32, xxl: 48
  },
  borderRadius: {
    sm: 8, md: 12, lg: 16, xl: 18
  }
};
```

### Adding New Folders
Modify the `folders` array in `App.js`:

```javascript
const folders = [
  { abbr: 'Re', name: 'Reading', color: '#ff6b6b' },
  { abbr: 'Le', name: 'Learning', color: '#4ecdc4' },
  // Add your custom folders here
];
```

## 🧰 Development Tools

### Code Quality
- **ESLint**: JavaScript/React linting with auto-fix
- **Prettier**: Code formatting with consistent style
- **React Hooks**: Modern React patterns with hooks

### Code Style Guidelines
- Use functional components with hooks
- Follow the established folder structure
- Maintain consistent naming conventions
- Use the theme system for styling
- Write descriptive component and function names

## 🔧 Technical Details

### Built With
- **React 18**: Latest React with hooks and modern patterns
- **Create React App**: Zero-configuration build setup
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Modern JavaScript**: ES6+ features and modules

### Performance Optimizations
- `useMemo` for expensive filtering operations
- Optimized re-renders with proper key props
- Smooth animations with CSS transitions
- Efficient state management patterns

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Happy note-taking! 📚✨**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

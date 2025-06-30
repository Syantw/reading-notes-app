# Reading Notes App 📚

A modern, intuitive reading notes application built with React. Keep track of your reading journey, organize your insights, and manage your favorite quotes all in one beautiful interface.

## ✨ Features

- **📖 Note Management**: Create, edit, and organize reading notes with rich content
- **🎨 Beautiful UI**: Modern design inspired by popular reading apps
- **📊 Reading Statistics**: Track your reading progress and achievements  
- **🏷️ Category System**: Organize notes by reading status (Currently Reading, Finished, Want to Read, etc.)
- **🎯 Quick Actions**: Fast note creation with intuitive forms
- **📱 Responsive Design**: Works seamlessly across devices
- **🔍 Search Functionality**: Find your notes quickly with built-in search

## 🚀 Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: CSS-in-JS with modern design system
- **Build Tool**: Create React App
- **Code Quality**: ESLint + Prettier
- **Version Control**: Git with conventional commits

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js**: v18.x or higher (use `nvm` for version management)
- **pnpm**: Latest version (preferred package manager)
- **Git**: For version control

### Environment Setup

```bash
# Install nvm if not already installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 18
nvm install 18
nvm use 18
nvm alias default 18

# Install pnpm globally
npm install -g pnpm
```

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Syantw/reading-notes-app.git
   cd reading-notes-app
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm start
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Creating a New Note

1. Click the "📝 Add New Note" button in the sidebar
2. Fill in the note details:
   - **Title**: Name your note (e.g., "The Power of Habit - Key Insights")
   - **Date**: Select the date (defaults to today)
   - **Color Theme**: Choose from 6 beautiful color options
   - **Content**: Add your insights, quotes, or thoughts (one per line)
3. Click "Create Note" to save

### Organizing Notes

- Use the **Categories** sidebar to filter notes by type:
  - 📖 Currently Reading
  - ✅ Finished
  - 📚 Want to Read
  - 📝 Reading Notes
  - 💭 Favorite Quotes
  - ⭐ Book Reviews

### Viewing Statistics

The app automatically tracks:
- 📖 Books Read
- 📝 Notes Created  
- 💭 Quotes Saved
- 🔥 Reading Streak

## 🎨 Design System

Our design follows modern UI principles:

- **Typography**: Inter font family for optimal readability
- **Colors**: Carefully chosen palette for different note types
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle elevation for depth
- **Animations**: Smooth transitions for better UX

## 📁 Project Structure

```
my-reading-notes/
├── public/                 # Static assets
├── src/
│   ├── App.js             # Main application component
│   ├── index.js           # Application entry point
│   └── index.css          # Global styles
├── Docs/                  # Documentation
│   ├── 01-environment-and-tooling.md
│   ├── 02-code-style-and-linting.md
│   └── 03-git-workflow.md
├── .eslintrc.js           # ESLint configuration
├── .prettierrc.js         # Prettier configuration
└── package.json           # Dependencies and scripts
```

## 🧹 Code Quality

This project follows strict code quality standards:

### Linting and Formatting

```bash
# Run ESLint
pnpm lint

# Format code with Prettier  
pnpm format

# Fix auto-fixable issues
pnpm lint:fix
```

### Git Workflow

We follow conventional commits for clear history:

```bash
# Feature commits
git commit -m "feat: add note creation modal"

# Bug fixes
git commit -m "fix: resolve search functionality issue"

# Documentation
git commit -m "docs: update README with new features"
```

## 🛠️ Available Scripts

- `pnpm start` - Start development server
- `pnpm build` - Build for production
- `pnpm test` - Run test suite
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern reading applications
- Icons from Unicode emoji set
- Color palette inspired by contemporary design systems

---

**Happy Reading! 📚✨**

Made with ❤️ for book lovers and note-takers everywhere.

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

# 📝 Advanced Todo App

A modern, feature-rich todo application built with React, featuring drag-and-drop functionality, smart deadlines, tag-based organization, and inline editing capabilities.

![Todo App](https://img.shields.io/badge/React-18.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.12-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎯 Core Functionality

- ✅ **Add, Edit, Delete** todos with ease
- ✅ **Mark as Complete/Incomplete** with visual feedback
- ✅ **Persistent Storage** using localStorage
- ✅ **Responsive Design** that works on all devices

### 🏷️ Smart Tag System

- 📋 **Predefined Tags**: Work, Study, Personal, Health, Shopping
- 🎨 **Custom Tags**: Create your own categories
- 🔍 **Tag Filtering**: Filter todos by specific tags with item counts
- 🌈 **Color-Coded Tags**: Visual distinction for different categories

### ⏰ Intelligent Deadlines

- 📅 **Date Picker**: Set optional deadlines for tasks
- 🚨 **Smart Highlighting**: Visual urgency indicators
  - 🔴 **Red**: Overdue tasks
  - 🟡 **Yellow**: Due today
  - 🟠 **Orange**: Due tomorrow
  - 🔵 **Blue**: Due within 3 days
- 📊 **Smart Text**: "Due today", "Due in 2 days", "Overdue by 1 day"
- 👻 **Auto-Hide**: Deadlines disappear when tasks are completed

### ✏️ Advanced Editing

- 🖱️ **Inline Editing**: Click edit icon to modify tasks in-place
- ⌨️ **Keyboard Shortcuts**:
  - `Enter` - Save changes
  - `Escape` - Cancel editing
- 🎯 **Click Outside** to save changes automatically

### 🔄 Drag & Drop Reordering

- 🖱️ **Smooth Animations** using react-beautiful-dnd
- 📱 **Touch Support** for mobile devices
- 🎨 **Visual Feedback** during drag operations
- 🎯 **Drag Handle** (⋮⋮) for precise control

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/todoapp.git
   cd todoapp
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Built With

### Frontend Framework

- **React 18.2.0** - UI library with hooks
- **Vite 6.3.5** - Fast build tool and dev server

### Styling & UI

- **TailwindCSS 4.1.12** - Utility-first CSS framework
- **Custom Icons** - SVG-based interface icons

### Drag & Drop

- **react-beautiful-dnd 13.1.1** - Smooth drag and drop interactions

### Development Tools

- **ESLint** - Code linting and formatting
- **Vite Plugins** - React and TailwindCSS integration

## 📁 Project Structure

```
src/
├── components/
│   ├── Todo.jsx           # Main todo container component
│   └── TodoItem.jsx       # Individual todo item component
├── assets/
│   ├── todo_icon.png      # App icon
│   ├── tick.png          # Completed task icon
│   ├── not_tick.png      # Incomplete task icon
│   ├── edit.png          # Edit icon
│   └── delete.png        # Delete icon
├── App.jsx               # Root application component
├── main.jsx             # Application entry point
└── index.css           # Global styles
```

## 🎮 How to Use

### Adding Todos

1. Select a tag (Work, Study, Personal, Health, Shopping, or Custom)
2. Optionally set a deadline using the date picker
3. Type your task in the input field
4. Click "Add" or press Enter

### Managing Todos

- **Complete**: Click the checkbox to mark as done
- **Edit**: Click the edit icon (✏️) to modify the text
- **Delete**: Click the delete icon (🗑️) to remove
- **Reorder**: Drag the handle (⋮⋮) to rearrange tasks

### Filtering & Organization

- Use tag filter buttons to view specific categories
- See item counts for each tag
- Filter by "all" to see everything

### Deadline Management

- Set deadlines when creating tasks
- Watch for color-coded urgency indicators
- Deadlines automatically hide when tasks are completed

## ⚙️ Configuration

### React StrictMode

**Important**: This app requires React StrictMode to be disabled due to react-beautiful-dnd compatibility issues.

Current configuration in `main.jsx`:

```jsx
// StrictMode disabled for drag-and-drop compatibility
createRoot(document.getElementById("root")).render(<App />);
```

### Local Storage

The app automatically saves your todos to browser localStorage. Your data persists between sessions without any setup required.

## 🎨 Customization

### Adding New Tag Colors

Edit the `getTagColor` function in `TodoItem.jsx`:

```javascript
const colors = {
  Work: "bg-blue-100 text-blue-800",
  Study: "bg-green-100 text-green-800",
  Personal: "bg-purple-100 text-purple-800",
  Health: "bg-red-100 text-red-800",
  Shopping: "bg-yellow-100 text-yellow-800",
  YourNewTag: "bg-pink-100 text-pink-800", // Add new colors here
};
```

### Modifying Predefined Tags

Update the `predefinedTags` array in `Todo.jsx`:

```javascript
const predefinedTags = [
  "Work",
  "Study",
  "Personal",
  "Health",
  "Shopping",
  "YourTag",
];
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🐛 Known Issues & Solutions

### Drag & Drop Not Working

- **Cause**: React StrictMode interference
- **Solution**: Ensure StrictMode is disabled in `main.jsx`

### React Version Compatibility

- **Requirement**: React 18.x for react-beautiful-dnd compatibility
- **Note**: React 19+ requires alternative drag-and-drop libraries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **react-beautiful-dnd** for smooth drag and drop
- **TailwindCSS** for utility-first styling
- **Vite** for lightning-fast development experience

## 🔮 Future Enhancements

- [ ] **Due Date Notifications** - Browser notifications for overdue tasks
- [ ] **Task Categories** - Hierarchical organization system
- [ ] **Data Export/Import** - JSON backup and restore
- [ ] **Dark Mode** - Theme switching capability
- [ ] **Task Statistics** - Productivity analytics
- [ ] **Collaborative Features** - Share todo lists
- [ ] **Mobile App** - React Native version

---

Made with ❤️ using React, TailwindCSS, and modern web technologies.

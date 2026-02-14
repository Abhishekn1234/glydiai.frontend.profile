// src/App.tsx
import './App.css';
import ProfilePage from './features/Profile/presentation/profilepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? saved === 'true' : false;
  });

  // Sync dark mode with document and body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark:bg-gray-900', 'dark:text-gray-100');
      document.body.classList.remove('bg-gray-100', 'text-gray-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-gray-100', 'text-gray-900');
      document.body.classList.remove('dark:bg-gray-900', 'dark:text-gray-100');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Toast notifications dynamically follow dark mode */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />

      {/* Main Profile Page */}
      <ProfilePage darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
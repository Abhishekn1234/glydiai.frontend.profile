import React, { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ProfileCard from "./components/ProfileCard";
import EditProfileForm from "./components/EditProfileForm";
import DarkModeToggle from "./components/DarkModeToggle";

interface Skill {
  name: string;
  endorsements: number;
}
interface ProfilePageProps {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

interface Profile {
  name: string;
  bio: string;
  profilePic: string;
  socialLinks: Record<string, string>;
  skills: Skill[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ darkMode, setDarkMode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
  }, [darkMode]);

  // Fetch profile from backend
  useEffect(() => {
    fetch("https://glydiai-backend-profile.onrender.com/api/profile")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setError("Unable to load profile. Please try again later.");
        setLoading(false);
      });
  }, []);

  const handleSave = async (data: Profile) => {
    try {
      const res = await fetch("https://glydiai-backend-profile.onrender.com/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error("Failed to save profile");
      
      const updated = await res.json();
      setProfile(updated);
      setEditing(false);
      
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg animate-slide-up z-50 text-sm sm:text-base';
      toast.textContent = 'Profile saved successfully!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert("Error saving profile. Please try again.");
    }
  };

  const handleEndorse = async (skillName: string) => {
    try {
      const res = await fetch(
        `https://glydiai-backend-profile.onrender.com/api/profile/endorse/${skillName}`,
        { method: "POST" }
      );
      
      if (!res.ok) throw new Error("Failed to endorse skill");
      
      const updated = await res.json();
      setProfile(updated);
    } catch (err) {
      console.error("Failed to endorse skill:", err);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 px-4 ${
        darkMode ? 'bg-black' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}>
        <div className="text-center w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-200 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className={`mt-4 font-medium animate-pulse text-sm sm:text-base ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        darkMode ? 'bg-black' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}>
        <div className={`rounded-2xl shadow-xl p-6 sm:p-8 max-w-xs sm:max-w-sm md:max-w-md w-full text-center ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
        }`}>
          <div className="text-4xl sm:text-5xl md:text-6xl mb-4">😕</div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className={`mb-6 text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg text-sm sm:text-base w-full sm:w-auto"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      darkMode ? 'bg-black text-white' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
    
      {!darkMode && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      )}

     
      <header className={`sticky top-0 z-10 border-b backdrop-blur-lg ${
        darkMode 
          ? 'bg-black/80 border-gray-800 text-white' 
          : 'bg-white/70 border-gray-200 text-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-white text-base sm:text-xl">👤</span>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent truncate">
                  Profile Dashboard
                </h1>
                <p className={`text-xs sm:text-sm truncate ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Manage your personal information
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="md:hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

   
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Breadcrumb navigation - responsive text */}
        <nav className={`flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm mb-4 sm:mb-6 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors px-1">Home</span>
          <span>/</span>
          <span className={`font-medium truncate ${
            darkMode ? 'text-white' : 'text-gray-700'
          }`}>Profile</span>
        </nav>

        {/* Page title for mobile and tablet */}
        <div className="mb-4 sm:mb-6 md:mb-8 lg:hidden">
          <h2 className={`text-xl sm:text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {editing ? 'Edit Profile' : 'My Profile'}
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {editing ? 'Make changes to your profile below' : 'View and manage your profile information'}
          </p>
        </div>

        
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start justify-center">
          
          {!editing && (
            <div className="hidden lg:block lg:w-64 xl:w-72 space-y-4 flex-shrink-0">
              <div className={`backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border ${
                darkMode
                  ? 'bg-gray-900/50 border-gray-800 text-white'
                  : 'bg-white/50 border-gray-200 text-gray-900'
              }`}>
                <h3 className={`font-semibold text-sm sm:text-base mb-3 sm:mb-4 ${
                  darkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>Quick Actions</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {[
                    { icon: "📊", label: "Analytics" },
                    { icon: "🔔", label: "Notifications" },
                    { icon: "⚙️", label: "Settings" },
                  ].map((item) => (
                    <li key={item.label} className={`cursor-pointer transition-colors flex items-center space-x-2 text-xs sm:text-sm ${
                      darkMode 
                        ? 'text-gray-300 hover:text-blue-400' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}>
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-white shadow-lg">
                <h3 className="font-semibold text-sm sm:text-base mb-2">Profile Strength</h3>
                <div className="w-full bg-white/30 rounded-full h-1.5 sm:h-2 mb-2">
                  <div className="bg-white rounded-full h-1.5 sm:h-2 w-3/4"></div>
                </div>
                <p className="text-xs sm:text-sm opacity-90">75% complete</p>
                <p className="text-xs mt-2 opacity-75">Add more skills to reach 100%</p>
              </div>
            </div>
          )}

          
          <div className={`flex-1 w-full ${!editing ? 'lg:max-w-2xl xl:max-w-3xl' : 'lg:max-w-3xl xl:max-w-4xl'} mx-auto`}>
        
            <div className="mb-3 sm:mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-xs sm:text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {editing ? 'Editing mode' : 'View mode'}
                </span>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className={`hidden md:flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:shadow-md transition-all duration-300 border group text-xs sm:text-sm ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-700 hover:border-blue-400'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-500'
                  }`}
                >
                  <svg className={`w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            
            <div className={`transition-all duration-500 transform ${editing ? 'scale-100' : 'hover:scale-[1.01] sm:hover:scale-[1.02]'}`}>
              {editing ? (
                <EditProfileForm
                  profile={profile}
                  onSave={handleSave}
                  darkMode={darkMode}
                  onCancel={() => setEditing(false)}
                />
              ) : (
                <ProfileCard
                  {...profile}
                  onEdit={() => setEditing(true)}
                  onEndorse={handleEndorse}
                />
              )}
            </div>

            {/* Additional info section - responsive grid */}
            {!editing && (
              <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { icon: "📅", label: "Joined", value: "March 2024" },
                  { icon: "👁️", label: "Profile Views", value: "1,234 this week" },
                  { icon: "⭐", label: "Rank", value: "Top 10%" },
                ].map((item) => (
                  <div key={item.label} className={`backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border ${
                    darkMode
                      ? 'bg-gray-900/50 border-gray-800'
                      : 'bg-white/50 border-gray-200/50'
                  } hover:shadow-md transition-shadow`}>
                    <div className="text-xl sm:text-2xl mb-1">{item.icon}</div>
                    <div className={`text-xs sm:text-sm font-medium ${
                      darkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>{item.label}</div>
                    <div className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>{item.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

     
      <footer className={`relative z-10 border-t mt-auto backdrop-blur-lg ${
        darkMode 
          ? 'bg-black/80 border-gray-800 text-white' 
          : 'bg-white/80 border-gray-200 text-gray-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <h3 className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                About
              </h3>
              <p className={`text-xs sm:text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Professional profile management platform for showcasing your skills and experience.
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h3 className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Quick Links
              </h3>
              <ul className="space-y-1 sm:space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Contact Support'].map((item) => (
                  <li key={item}>
                    <a href="#" className={`text-xs sm:text-sm transition-colors ${
                      darkMode 
                        ? 'text-gray-400 hover:text-blue-400' 
                        : 'text-gray-500 hover:text-blue-600'
                    }`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center sm:text-left col-span-1 sm:col-span-2 md:col-span-1">
              <h3 className={`text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Connect
              </h3>
              <div className="flex justify-center sm:justify-start space-x-4">
                {['twitter', 'linkedin', 'github'].map((platform) => (
                  <a key={platform} href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                    <span className="sr-only capitalize">{platform}</span>
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                      {platform === 'twitter' && (
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      )}
                      {platform === 'linkedin' && (
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      )}
                      {platform === 'github' && (
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className={`mt-4 sm:mt-6 md:mt-8 border-t pt-4 sm:pt-6 text-center ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <p className={`text-xs sm:text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              © {new Date().getFullYear()} My Profile Page. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* CSS animations */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
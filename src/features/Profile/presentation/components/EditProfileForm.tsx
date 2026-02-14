import React, { useState, useEffect } from "react";

interface Skill {
  name: string;
  endorsements: number;
}

interface ProfileFormProps {
  profile: {
    name: string;
    bio: string;
    profilePic: string; // URL
    socialLinks: Record<string, string>;
    skills: Skill[];
  };
  onSave: (data: any) => void;
  onCancel: () => void;
  darkMode?: boolean;
}

const EditProfileForm: React.FC<ProfileFormProps> = ({ 
  profile, 
  onSave, 
  onCancel,
  darkMode = false 
}) => {
  const [form, setForm] = useState({ ...profile });
  const [newSkill, setNewSkill] = useState("");
  const [activeTab, setActiveTab] = useState<"basic" | "social" | "skills">("basic");

  useEffect(() => {
    setForm({ ...profile });
  }, [profile]);

  // Basic field change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Social links update
  const handleSocialLinkChange = (platform: string, value: string) => {
    setForm({
      ...form,
      socialLinks: { ...form.socialLinks, [platform]: value },
    });
  };

  // Skills
  const addSkill = () => {
    if (newSkill.trim() && !form.skills.some((s) => s.name === newSkill.trim())) {
      setForm({
        ...form,
        skills: [...form.skills, { name: newSkill.trim(), endorsements: 0 }],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setForm({
      ...form,
      skills: form.skills.filter((_, i) => i !== index),
    });
  };

  // Handle profile picture upload
  const handleProfilePicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, profilePic: reader.result as string }); // base64 preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Social platforms with icons
  const socialPlatforms = [
    { id: "github", label: "GitHub", placeholder: "https://github.com/username", icon: "🐙" },
    { id: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username", icon: "🔗" },
    { id: "twitter", label: "Twitter", placeholder: "https://twitter.com/username", icon: "🐦" },
    { id: "portfolio", label: "Portfolio", placeholder: "https://yourwebsite.com", icon: "🌐" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header with upload */}
      <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 space-y-4 sm:space-y-0">
        <div className="relative group">
          <img
            src={form.profilePic || "https://via.placeholder.com/100"}
            alt="Profile preview"
            className={`w-24 h-24 rounded-full object-cover border-4 shadow-lg transition-transform group-hover:scale-105 ${
              darkMode ? 'border-gray-700' : 'border-white'
            }`}
          />
          <label
            htmlFor="profile-pic-upload"
            className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full cursor-pointer hover:from-blue-600 hover:to-blue-700 shadow-md transition-all duration-300 hover:scale-110"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </label>
          <input
            type="file"
            id="profile-pic-upload"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePicUpload}
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {form.name || "Your Name"}
          </h2>
          <p className={`line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {form.bio || "Your bio will appear here..."}
          </p>
          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Click the camera icon to change your profile picture
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className={`flex space-x-1 border-b mb-6 overflow-x-auto pb-1 ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        {[
          { id: "basic", label: "Basic Info", icon: "📝" },
          { id: "social", label: "Social Links", icon: "🔗" },
          { id: "skills", label: "Skills", icon: "⚡" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 font-medium text-sm rounded-t-lg transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? darkMode
                  ? "bg-blue-900/30 text-blue-400 border-b-2 border-blue-500"
                  : "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                : darkMode
                  ? "text-gray-400 hover:text-gray-300 hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div className={`rounded-xl shadow-lg p-6 space-y-4 transition-all duration-300 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        {/* Basic Info */}
        {activeTab === "basic" && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className={`block mb-1 text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className={`block mb-1 text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {form.bio.length}/500 characters
              </p>
            </div>
          </div>
        )}

        {/* Social Links */}
        {activeTab === "social" && (
          <div className="space-y-4 animate-fadeIn">
            {socialPlatforms.map((platform) => (
              <div key={platform.id}>
                <label className={`block mb-1 text-sm font-medium flex items-center space-x-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  <span>{platform.icon}</span>
                  <span>{platform.label}</span>
                </label>
                <input
                  type="url"
                  value={form.socialLinks[platform.id] || ""}
                  onChange={(e) => handleSocialLinkChange(platform.id, e.target.value)}
                  placeholder={platform.placeholder}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {activeTab === "skills" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                placeholder="Add a skill (e.g., React, Python)"
                className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              />
              <button
                onClick={addSkill}
                disabled={!newSkill.trim()}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-medium shadow-md"
              >
                Add Skill
              </button>
            </div>

            <div className={`flex flex-wrap gap-2 min-h-[100px] p-3 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700/50 border-gray-600' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              {form.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-lg flex items-center space-x-2 text-sm shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="font-medium">{skill.name}</span>
                  <span className={`text-xs px-1.5 rounded-full ${
                    darkMode 
                      ? 'bg-blue-700 text-blue-200' 
                      : 'bg-blue-200 text-blue-800'
                  }`}>
                    {skill.endorsements}
                  </span>
                  <button
                    onClick={() => removeSkill(index)}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 ${
                      darkMode 
                        ? 'text-red-400 hover:text-red-300' 
                        : 'text-red-500 hover:text-red-700'
                    }`}
                    aria-label={`Remove ${skill.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {form.skills.length === 0 && (
                <p className={`text-sm italic w-full text-center py-4 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  No skills added yet. Add your first skill above!
                </p>
              )}
            </div>

            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {form.skills.length} skill{form.skills.length !== 1 ? 's' : ''} added
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className={`flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            type="button"
            onClick={onCancel}
            className={`px-6 py-2 border rounded-lg transition-all duration-300 font-medium order-2 sm:order-1 ${
              darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(form)}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-medium shadow-md order-1 sm:order-2"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Live Preview Card */}
      <div className={`mt-6 rounded-lg p-4 border ${
        darkMode 
          ? 'bg-gray-700/30 border-gray-700' 
          : 'bg-gray-50 border-gray-200'
      }`}>
        <h3 className={`text-sm font-semibold mb-2 flex items-center ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Live Preview
        </h3>
        <div className="flex items-center space-x-3">
          <img
            src={form.profilePic || "https://via.placeholder.com/40"}
            alt="Preview"
            className={`w-10 h-10 rounded-full object-cover border-2 ${
              darkMode ? 'border-gray-700' : 'border-white'
            }`}
          />
          <div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {form.name || "Your Name"}
            </p>
            <p className={`text-sm line-clamp-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {form.bio || "Your bio will appear here..."}
            </p>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {form.skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className={`text-xs px-2 py-0.5 rounded-full ${
              darkMode 
                ? 'bg-blue-900/30 text-blue-400' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              {skill.name}
            </span>
          ))}
          {form.skills.length > 3 && (
            <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              +{form.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EditProfileForm;
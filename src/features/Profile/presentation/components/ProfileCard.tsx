
import React, { useState } from "react";
import SkillEndorsement from "./SkillEndorsement";

interface Skill {
  name: string;
  endorsements: number;
}

interface ProfileCardProps {
  name: string;
  bio: string;
  profilePic: string;
  socialLinks: Record<string, string>;
  skills: Skill[];
  onEdit: () => void;
  onEndorse: (skillName: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  name, 
  bio, 
  profilePic, 
  socialLinks, 
  skills, 
  onEdit, 
  onEndorse 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const socialIcons: Record<string, { icon: string; color: string; bgColor: string }> = {
    github: { icon: "🐙", color: "hover:text-gray-900", bgColor: "bg-gray-100 dark:bg-gray-700" },
    linkedin: { icon: "🔗", color: "hover:text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-900/30" },
    twitter: { icon: "🐦", color: "hover:text-sky-500", bgColor: "bg-sky-100 dark:bg-sky-900/30" },
    portfolio: { icon: "🌐", color: "hover:text-purple-600", bgColor: "bg-purple-100 dark:bg-purple-900/30" },
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
     
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden w-full max-w-md border border-gray-100 dark:border-gray-700">
        

        <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute inset-0 bg-black opacity-10" />
        </div>

 
        <div className="px-6 pb-6">
    
          <div className="relative -mt-12 mb-4">
            <div className="relative inline-block">
              <img 
                src={imageError ? "https://via.placeholder.com/96x96?text=User" : profilePic} 
                alt={name}
                className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl object-cover bg-white dark:bg-gray-700"
                onError={() => setImageError(true)}
              />
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
            </div>
            
            <button
              onClick={onEdit}
              className="absolute top-0 right-0 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

        
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              {name}
              <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                Pro
              </span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
              {bio}
            </p>
          </div>

          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-400">👥</span>
              <span className="text-gray-600 dark:text-gray-300">245 connections</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            <div className="flex items-center gap-1">
              <span className="text-gray-400">🏆</span>
              <span className="text-gray-600 dark:text-gray-300">{skills.length} skills</span>
            </div>
          </div>

         
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center justify-between">
              <span>Top Skills</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {skills.reduce((acc, skill) => acc + skill.endorsements, 0)} total endorsements
              </span>
            </h3>
            <SkillEndorsement skills={skills} onEndorse={onEndorse} />
          </div>

        
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(socialLinks).map(([platform, url]) => {
                const social = socialIcons[platform] || { 
                  icon: "🔗", 
                  color: "hover:text-gray-600", 
                  bgColor: "bg-gray-100 dark:bg-gray-700" 
                };
                
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${social.bgColor} transition-all duration-300 hover:scale-105 group`}
                  >
                    <span className="text-lg">{social.icon}</span>
                    <span className={`text-sm capitalize ${social.color} dark:text-gray-300`}>
                      {platform}
                    </span>
                    <svg 
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
            <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
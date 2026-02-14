
import React from "react";

interface Skill {
  name: string;
  endorsements: number;
}

interface SkillEndorsementProps {
  skills: Skill[];
  onEndorse: (skillName: string) => void;
}

const SkillEndorsement: React.FC<SkillEndorsementProps> = ({ skills, onEndorse }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {skills.map(skill => (
        <button
          key={skill.name}
          onClick={() => onEndorse(skill.name)}
          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
        >
          {skill.name} ({skill.endorsements})
        </button>
      ))}
    </div>
  );
};

export default SkillEndorsement;

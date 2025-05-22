/**
 * Skills data organized by category
 * Each skill has a name and proficiency level (0-100)
 */
export const SKILL_CATEGORIES = [
    {
    category: "Backend",
    icon: "fas fa-server",
    skills: [
      { name: "C#", level: 78 },
      { name: "Node.js", level: 75 },
      { name: "Express", level: 71 },
      { name: ".NET", level: 78 },
      { name: "Python", level: 65 },
      { name: "PHP", level: 63 },
    ]
  },
  {
    category: "Frontend",
    icon: "fas fa-code",
    skills: [
      { name: "React", level: 76 },
      { name: "JavaScript", level: 79 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Blazor", level: 75 },
      { name: "HTML/CSS", level: 90 },
    ]
  },
  {
    category: "Databases",
    icon: "fas fa-database",
    skills: [
      { name: "MySQL", level: 83 },
      { name: "SQL Server", level: 82 },
      { name: "MongoDB", level: 72 },
      { name: "MariaDB", level: 79 },
    ]
  },
  {
    category: "Version Control",
    icon: "fas fa-code-branch",
    skills: [
      { name: "Git", level: 80 },
      { name: "GitHub", level: 90 },
      { name: "GitLab", level: 89 },
    ]
  }
];

export const getSkillsByCategory = (categoryName) => {
  return SKILL_CATEGORIES.find(cat => cat.category === categoryName)?.skills || [];
};

export const getCategoryIcon = (categoryName) => {
  return SKILL_CATEGORIES.find(cat => cat.category === categoryName)?.icon || 'fas fa-code';
};
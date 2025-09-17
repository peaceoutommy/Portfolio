/**
 * Skills data organized by category
 * Each skill has a name and proficiency level (0-100)
 */
export const SKILL_CATEGORIES = [
    {
    category: "Backend",
    icon: "fas fa-server",
    skills: [
      { name: "C#", level: 65 },
      { name: "Node.js", level: 70 },
      { name: "Express", level: 70 },
      { name: ".NET", level: 65 },
      { name: "Python", level: 65 },
      { name: "PHP", level: 50 },
    ]
  },
  {
    category: "Frontend",
    icon: "fas fa-code",
    skills: [
      { name: "React", level: 72 },
      { name: "JavaScript", level: 75 },
      { name: "Tailwind CSS", level: 70 },
      { name: "Blazor", level: 75 },
      { name: "HTML/CSS", level: 85 },
    ]
  },
  {
    category: "Databases",
    icon: "fas fa-database",
    skills: [
      { name: "MySQL", level: 70 },
      { name: "SQL Server", level: 70 },
      { name: "MongoDB", level: 65 },
      { name: "MariaDB", level: 64 },
    ]
  },
  {
    category: "Version Control",
    icon: "fas fa-code-branch",
    skills: [
      { name: "Git", level: 70 },
      { name: "GitHub", level: 80 },
      { name: "GitLab", level: 79 },
    ]
  }
];

export const getSkillsByCategory = (categoryName) => {
  return SKILL_CATEGORIES.find(cat => cat.category === categoryName)?.skills || [];
};

export const getCategoryIcon = (categoryName) => {
  return SKILL_CATEGORIES.find(cat => cat.category === categoryName)?.icon || 'fas fa-code';
};
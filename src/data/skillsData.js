/**
 * Skills data organized by category
 * Each skill has a name and proficiency level (0-100)
 */
export const SKILL_CATEGORIES = [
  {
    category: "Frontend",
    icon: "fas fa-code",
    skills: [
      { name: "React", level: 84 },
      { name: "JavaScript", level: 82 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Blazor", level: 70 },
      { name: "HTML/CSS", level: 90 },
    ]
  },
  {
    category: "Backend",
    icon: "fas fa-server",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "C#", level: 79 },
      { name: ".NET", level: 80 },
      { name: "Python", level: 65 },
      { name: "PHP", level: 63 },
    ]
  },
  {
    category: "Databases",
    icon: "fas fa-database",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "SQL Server", level: 85 },
      { name: "MongoDB", level: 72 },
      { name: "MariaDB", level: 71 },
    ]
  },
  {
    category: "Version Control",
    icon: "fas fa-code-branch",
    skills: [
      { name: "Git", level: 83 },
      { name: "GitHub", level: 95 },
      { name: "GitLab", level: 80 },
    ]
  }
];

export const getSkillsByCategory = (categoryName) => {
  return SKILL_CATEGORIES.find(cat => cat.category === categoryName)?.skills || [];
};

export const getCategoryIcon = (categoryName) => {
  return SKILL_CATEGORIES.find(cat => cat.category === categoryName)?.icon || 'fas fa-code';
};
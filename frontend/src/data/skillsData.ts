import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
} from 'react-icons/si';

export const SKILLS_DATA = {
  frontend: [
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS', icon: SiCss3, color: '#1572B6' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  ],
  backend: [
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
  ],
  database: [
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  ],
  tools: [
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'GitHub', icon: SiGithub, color: '#FFFFFF' },
  ],
};
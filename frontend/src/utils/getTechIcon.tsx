import {
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiNextdotjs,
  SiOpenai,
  SiGooglebard,
  SiCodeium
} from 'react-icons/si';

const iconMap: Record<string, any> = {
  javascript: SiJavascript,
  html5: SiHtml5,
  css3: SiCss3,
  typescript: SiTypescript,
  react: SiReact,
  nodedotjs: SiNodedotjs,
  express: SiExpress,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  git: SiGit,
  github: SiGithub,
  nextdotjs: SiNextdotjs,
  openai: SiOpenai,
  googlebard: SiGooglebard,
  codeium: SiCodeium,
};

// Brand colors per technology (official colors)
const brandColorMap: Record<string, string> = {
  javascript: '#F7DF1E',
  html5: '#E34F26',
  css3: '#1572B6',
  typescript: '#3178C6',
  react: '#61DAFB',
  nodedotjs: '#339933',
  express: '#FFFFFF',
  postgresql: '#4169E1',
  mongodb: '#47A248',
  git: '#F05032',
  github: '#181717',
  nextdotjs: '#FFFFFF',
  openai: '#10A37F',
  googlebard: '#4285F4',
  claude: '#E07B39',
  codeium: '#09B6A2',
};

export const getTechIcon = (iconKey: string) => {
  return iconMap[iconKey] || null;
};

export const getTechBrandColor = (iconKey: string): string => {
  return brandColorMap[iconKey] || '#FFFFFF';
};
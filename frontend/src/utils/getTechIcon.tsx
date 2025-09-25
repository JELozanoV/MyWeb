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
  SiNextdotjs
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
  nextdotjs: SiNextdotjs,
};

export const getTechIcon = (iconKey: string) => {
  return iconMap[iconKey] || null;
};
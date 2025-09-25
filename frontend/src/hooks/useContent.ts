import { useLocale } from '../context/LocaleContext';
import { personal as personalES } from '../content/es/personal';
import { personal as personalEN } from '../content/en/personal';
import { about as aboutES } from '../content/es/about';
import { about as aboutEN } from '../content/en/about';
import { skills as skillsES } from '../content/es/skills';
import { skills as skillsEN } from '../content/en/skills';
import { experience as experienceES } from '../content/es/experience';
import { experience as experienceEN } from '../content/en/experience';
import { education as educationES, certifications as certificationsES } from '../content/es/education';
import { education as educationEN, certifications as certificationsEN } from '../content/en/education';
import { nav as navES } from '../content/es/nav';
import { nav as navEN } from '../content/en/nav';
import { ui as uiES } from '../content/es/ui';
import { ui as uiEN } from '../content/en/ui';
import { labels as labelsES } from '../content/es/labels';
import { labels as labelsEN } from '../content/en/labels';

export const useContent = () => {
  const { locale } = useLocale();

  return {
    personal: locale === 'es' ? personalES : personalEN,
    about: locale === 'es' ? aboutES : aboutEN,
    skills: locale === 'es' ? skillsES : skillsEN,
    experience: locale === 'es' ? experienceES : experienceEN,
    education: locale === 'es' ? educationES : educationEN,
    certifications: locale === 'es' ? certificationsES : certificationsEN,
    nav: locale === 'es' ? navES : navEN,
    ui: locale === 'es' ? uiES : uiEN,
    labels: locale === 'es' ? labelsES : labelsEN,
  };
};
import { useTheme } from '../../hooks/useTheme';
import s from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const handleChange = () => {
    if (theme === 'day') {
      setTheme('night');
    } else {
      setTheme('day');
    }
  };

  return (
    <div className={s.toggleBtn}>
      <input type="checkbox" checked={theme === 'night'} onChange={handleChange} />
      <span>&nbsp;</span>
    </div>
  );
}

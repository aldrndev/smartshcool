import { Button } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import { FaRegMoon, FaRegSun } from 'react-icons/fa';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Button
        color="primary"
        radius="full"
        size="md"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <FaRegSun
          size={20}
          className="h-1[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <FaRegMoon
          size={20}
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
      </Button>
    </div>
  );
};

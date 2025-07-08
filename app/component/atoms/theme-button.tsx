'use client'

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, SunMedium } from 'lucide-react';

export default function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleTheme = () => {
    if (theme === 'light') {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <button
      onClick={handleTheme}
      className='h-8 w-8 text-text-900 bg-button-100 flex items-center justify-center rounded-sm hover:brightness-97 transition-[filter, colors] duration-300  pointer-events-auto'
    >
      {theme === 'light' ?
        <Moon className='h-3 w-3' /> : <SunMedium className='h-4 w-4' />
      }
    </button>
  )
}
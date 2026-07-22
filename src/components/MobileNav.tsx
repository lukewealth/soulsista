import React from 'react';
import { Home, Heart, BookOpen, Mic, Calendar } from 'lucide-react';

interface MobileNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'initiative', label: 'Donate', icon: Heart },
    { id: 'book', label: 'Books', icon: BookOpen },
    { id: 'speaking', label: 'Speaking', icon: Mic },
    { id: 'booking', label: 'Book', icon: Calendar },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-ivory/90 backdrop-blur-xl border-t border-forest/10 shadow-[0_-10px_30px_rgba(18,53,36,0.03)] rounded-t-3xl">
      <div className="flex justify-around items-center px-4 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'text-gold scale-110'
                  : 'text-forest/60 hover:text-forest'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className="text-[10px] font-semibold">{item.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 bg-gold rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

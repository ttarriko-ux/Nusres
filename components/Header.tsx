
import React from 'react';
import { View } from '../types';
import { PillIcon, UserPlusIcon, CalendarDaysIcon, UsersIcon } from './Icons';

interface HeaderProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  onAddPatientClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, onAddPatientClick }) => {
  const navButtonClass = "flex items-center gap-2 px-4 py-2 rounded-md transition-colors duration-200";
  const activeClass = "bg-white text-brand-blue shadow-sm";
  const inactiveClass = "text-white hover:bg-white/20";
  
  return (
    <header className="bg-brand-blue text-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <PillIcon className="h-8 w-8 text-white" />
            <h1 className="text-xl sm:text-2xl font-bold">NurseRx</h1>
          </div>
          <nav className="hidden sm:flex items-center gap-2 bg-black/10 p-1 rounded-lg">
            <button 
              onClick={() => setCurrentView(View.Schedule)}
              className={`${navButtonClass} ${currentView === View.Schedule ? activeClass : inactiveClass}`}
            >
              <CalendarDaysIcon className="h-5 w-5" />
              Schedule
            </button>
            <button 
              onClick={() => setCurrentView(View.Patients)}
              className={`${navButtonClass} ${currentView === View.Patients ? activeClass : inactiveClass}`}
            >
              <UsersIcon className="h-5 w-5" />
              Patients
            </button>
          </nav>
          <button 
            onClick={onAddPatientClick}
            className="flex items-center gap-2 bg-white text-brand-blue font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-brand-gray transition-colors duration-200"
          >
            <UserPlusIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Add Patient</span>
          </button>
        </div>
      </div>
       {/* Mobile Navigation */}
      <nav className="sm:hidden flex items-center justify-around bg-brand-blue/80 backdrop-blur-sm p-2">
        <button 
          onClick={() => setCurrentView(View.Schedule)}
          className={`flex-1 ${navButtonClass} justify-center ${currentView === View.Schedule ? activeClass : inactiveClass}`}
        >
          <CalendarDaysIcon className="h-5 w-5" />
          Schedule
        </button>
        <button 
          onClick={() => setCurrentView(View.Patients)}
          className={`flex-1 ${navButtonClass} justify-center ${currentView === View.Patients ? activeClass : inactiveClass}`}
        >
          <UsersIcon className="h-5 w-5" />
          Patients
        </button>
      </nav>
    </header>
  );
};

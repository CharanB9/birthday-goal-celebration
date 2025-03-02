
import React from 'react';
import { Volleyball } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background with subtle volleyball-theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-united/10 to-background z-0"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-united/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      
      {/* Cristiano Ronaldo images as background */}
      <div className="absolute top-10 -right-20 w-80 h-80 opacity-20 z-0 pointer-events-none">
        <img 
          src="https://source.unsplash.com/random/600x800?ronaldo,realmadrid" 
          alt="Cristiano Ronaldo Real Madrid" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute bottom-10 -left-20 w-80 h-80 opacity-20 z-0 pointer-events-none">
        <img 
          src="https://source.unsplash.com/random/600x800?ronaldo,manchesterunited" 
          alt="Cristiano Ronaldo Manchester United" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Rolling volleyball animation */}
      <div className="absolute top-1/3 w-full h-20 overflow-hidden pointer-events-none">
        <Volleyball className="absolute text-black/60 w-16 h-16 animate-ball-roll" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="mb-4 inline-block">
          <span className="text-sm font-medium uppercase tracking-widest bg-gold/20 text-gold-700 px-3 py-1 rounded-full">
            Let's Celebrate
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
          <span className="animate-fade-in inline-block">Happy Birthday</span> 
          <span className="text-gradient block mt-2 animate-fade-in" style={{ animationDelay: '300ms' }}>David!</span>
        </h1>
        
        <p className="text-xl md:text-2xl font-medium text-foreground/70 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '600ms' }}>
          Celebrating the Legend, On and Off the Pitch!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '900ms' }}>
          <button className="button-primary flex items-center gap-2">
            <Volleyball className="w-5 h-5 animate-spin-slow" />
            <span>Leave a Wish</span>
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-united text-united rounded-full font-semibold transform transition-all duration-200 hover:scale-105 hover:bg-united/10 active:scale-95">
            View Gallery
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-8 h-12 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-foreground/30 rounded-full animate-float"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;

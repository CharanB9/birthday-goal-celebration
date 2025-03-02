
import React, { useState, useRef } from 'react';

const SiuuButton: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSiuu = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Play the Siuu sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
    }
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <div className="relative py-16 flex flex-col items-center">
      <audio 
        ref={audioRef} 
        src="https://www.myinstants.com/media/sounds/siuuu.mp3"
        preload="auto"
      />
      
      <div className="text-center mb-8 animate-on-scroll">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          Feel like celebrating?
        </h3>
        <p className="text-foreground/70">
          Press the button for that iconic celebration!
        </p>
      </div>
      
      <div className="relative animate-on-scroll animate-delay-100">
        <button
          onClick={handleSiuu}
          disabled={isAnimating}
          className="relative z-10 button-primary text-xl py-4 px-8 bg-gradient-to-r from-united to-united/80 shadow-lg overflow-hidden"
        >
          {isAnimating ? "SIUUUUU!" : "Click for SIUUU!"}
          
          {/* Animation effect */}
          {isAnimating && (
            <>
              <span className="absolute inset-0 bg-white/20 animate-pulse"></span>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-px h-40 bg-white animate-[slide-down_1s_ease-in-out_forwards]"></div>
            </>
          )}
        </button>
        
        {/* Celebration figure animation */}
        <div className={`absolute left-1/2 top-full mt-8 -translate-x-1/2 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className={`w-16 h-24 bg-united rounded-t-full transition-transform duration-300 ${
                isAnimating ? 'animate-[jump_1s_ease-in-out]' : ''
              }`}>
                <div className="w-6 h-6 rounded-full bg-white relative left-5 top-2"></div>
                <div className="w-4 h-2 bg-white rounded-full relative left-6 top-4"></div>
                <div className="flex justify-center absolute bottom-0 -left-4 w-24">
                  {/* Arms */}
                  <div className="w-20 h-2 bg-united mt-4 transform rotate-[20deg]"></div>
                  <div className="w-20 h-2 bg-united mt-4 transform -rotate-[20deg]"></div>
                </div>
              </div>
            </div>
            
            {/* Text bubble */}
            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg transform transition-all duration-500 ${
              isAnimating 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-0'
            }`}>
              <p className="font-bold text-united">SIUUUU!</p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiuuButton;

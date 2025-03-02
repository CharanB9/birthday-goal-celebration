
import React, { useState, useEffect } from 'react';
import { PartyPopper } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const [isBirthday, setIsBirthday] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; delay: string }>>([]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsBirthday(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Set interval for countdown
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Generate confetti if it's birthday
    if (isBirthday && confetti.length === 0) {
      const newConfetti = [];
      for (let i = 0; i < 50; i++) {
        newConfetti.push({
          id: i,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 3}s`,
        });
      }
      setConfetti(newConfetti);
    }
    
    // Clean up interval
    return () => clearInterval(timer);
  }, [targetDate, isBirthday, confetti.length]);

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden">
      {/* Confetti animation */}
      {isBirthday && confetti.map((item) => (
        <div
          key={item.id}
          className="absolute top-0 opacity-0 w-3 h-3 rounded-full animate-confetti"
          style={{ 
            left: item.left, 
            animationDelay: item.delay,
            backgroundColor: ['#C70101', '#FFD700', '#ffffff', '#0A5C0A'][Math.floor(Math.random() * 4)]
          }}
        />
      ))}
      
      <div className="glass dark:glass-dark rounded-2xl p-8 shadow-xl">
        {isBirthday ? (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <PartyPopper className="w-16 h-16 text-gold animate-pulse-soft" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Happy Birthday!</span>
            </h2>
            <p className="text-xl opacity-80">
              The big day is here! Let's celebrate!
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">Countdown to the Big Day</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex-1 min-w-[100px] bg-white/50 dark:bg-black/50 rounded-lg p-4">
                <div className="text-4xl font-bold text-united">{timeLeft.days}</div>
                <div className="text-sm text-foreground/70 font-medium">Days</div>
              </div>
              
              <div className="flex-1 min-w-[100px] bg-white/50 dark:bg-black/50 rounded-lg p-4">
                <div className="text-4xl font-bold text-united">{timeLeft.hours}</div>
                <div className="text-sm text-foreground/70 font-medium">Hours</div>
              </div>
              
              <div className="flex-1 min-w-[100px] bg-white/50 dark:bg-black/50 rounded-lg p-4">
                <div className="text-4xl font-bold text-united">{timeLeft.minutes}</div>
                <div className="text-sm text-foreground/70 font-medium">Minutes</div>
              </div>
              
              <div className="flex-1 min-w-[100px] bg-white/50 dark:bg-black/50 rounded-lg p-4">
                <div className="text-4xl font-bold text-united">{timeLeft.seconds}</div>
                <div className="text-sm text-foreground/70 font-medium">Seconds</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;

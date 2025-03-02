
import React, { useState } from 'react';
import { Send, User, ThumbsUp } from 'lucide-react';

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
  likes: number;
  liked: boolean;
}

const SAMPLE_WISHES: Wish[] = [
  {
    id: 1,
    name: "Sergio",
    message: "Feliz cumpleaños amigo! Hope you have a fantastic day and an amazing year ahead! 🎉",
    timestamp: new Date(2023, 3, 15, 9, 30),
    likes: 12,
    liked: false
  },
  {
    id: 2,
    name: "Emma",
    message: "Happy birthday! Wishing you a year filled with goals, assists, and plenty of 'Siuuu' moments! ⚽",
    timestamp: new Date(2023, 3, 15, 10, 15),
    likes: 8,
    liked: false
  },
  {
    id: 3,
    name: "Marcus",
    message: "HBD mate! Let's celebrate like we just won the Champions League! 🏆",
    timestamp: new Date(2023, 3, 15, 11, 45),
    likes: 15,
    liked: false
  }
];

const WishesSection: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>(SAMPLE_WISHES);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newName.trim() || !newMessage.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      const newWish: Wish = {
        id: Date.now(),
        name: newName.trim(),
        message: newMessage.trim(),
        timestamp: new Date(),
        likes: 0,
        liked: false
      };
      
      setWishes([newWish, ...wishes]);
      setNewName("");
      setNewMessage("");
      setIsSubmitting(false);
    }, 600);
  };

  const handleLike = (id: number) => {
    setWishes(wishes.map(wish => {
      if (wish.id === id) {
        return {
          ...wish,
          likes: wish.liked ? wish.likes - 1 : wish.likes + 1,
          liked: !wish.liked
        };
      }
      return wish;
    }));
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Birthday Wishes
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Join friends and family in leaving a personalized birthday message to celebrate this special day!
          </p>
        </div>
        
        <div className="mb-10 animate-on-scroll animate-delay-100">
          <form onSubmit={handleSubmit} className="glass dark:glass-dark rounded-xl p-6">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg border bg-white/70 focus:outline-none focus:ring-2 focus:ring-united"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1">Your Birthday Wish</label>
              <textarea
                id="message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
                placeholder="Write your birthday message here..."
                className="w-full px-4 py-2 rounded-lg border bg-white/70 focus:outline-none focus:ring-2 focus:ring-united resize-none"
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="button-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Sending...' : 'Send Wish'}
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
        
        <div className="space-y-6 animate-on-scroll animate-delay-200">
          {wishes.map((wish) => (
            <div key={wish.id} className="jersey-bubble transform transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-united flex items-center justify-center flex-shrink-0">
                  <User className="text-white w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold">{wish.name}</h4>
                    <span className="text-xs text-foreground/50">{formatTimestamp(wish.timestamp)}</span>
                  </div>
                  
                  <p className="text-foreground/80 mb-4">{wish.message}</p>
                  
                  <button 
                    onClick={() => handleLike(wish.id)}
                    className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full transition-colors ${
                      wish.liked 
                        ? 'bg-united/10 text-united' 
                        : 'bg-transparent text-foreground/50 hover:bg-united/5'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{wish.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishesSection;

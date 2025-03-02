
import React, { useState } from 'react';
import { MessageCircle, Check, X } from 'lucide-react';

interface TriviaItem {
  id: number;
  question: string;
  answer: string;
  hint?: string;
}

const TRIVIA_ITEMS: TriviaItem[] = [
  {
    id: 1,
    question: "Who scored the most goals for Manchester United in a single season?",
    answer: "Cristiano Ronaldo with 42 goals in the 2007-2008 season.",
    hint: "He wore number 7..."
  },
  {
    id: 2,
    question: "How many Champions League titles has Real Madrid won in total?",
    answer: "14 titles, the most by any club in Europe.",
    hint: "It's more than 10 and less than 15."
  },
  {
    id: 3,
    question: "Which club did Cristiano Ronaldo score his 700th career goal against?",
    answer: "Everton, while playing for Manchester United in October 2022.",
    hint: "It's a Premier League club."
  },
  {
    id: 4,
    question: "What is Cristiano Ronaldo's famous celebration called?",
    answer: "The 'Siuuu' celebration.",
    hint: "It's what he shouts when he jumps and spins."
  },
  {
    id: 5,
    question: "Which national team does Cristiano Ronaldo play for?",
    answer: "Portugal",
    hint: "Its flag is red and green."
  },
  {
    id: 6,
    question: "What year did Manchester United last win the Premier League?",
    answer: "2013, under Sir Alex Ferguson.",
    hint: "It was Sir Alex Ferguson's last season."
  }
];

const FootballTrivia: React.FC = () => {
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState<Record<number, 'correct' | 'incorrect' | null>>({});

  const revealAnswer = (id: number) => {
    setRevealedAnswers({
      ...revealedAnswers,
      [id]: true
    });
  };

  const handleUserAnswer = (id: number, value: string) => {
    setUserAnswers({
      ...userAnswers,
      [id]: value
    });
  };

  const checkAnswer = (id: number) => {
    const triviaItem = TRIVIA_ITEMS.find(item => item.id === id);
    if (!triviaItem) return;
    
    const userAnswer = userAnswers[id] || '';
    
    // Very simple check - just seeing if the answer contains key parts
    // In a real app, you'd want more sophisticated answer checking
    const isCorrect = triviaItem.answer
      .toLowerCase()
      .split(' ')
      .some(word => word.length > 3 && userAnswer.toLowerCase().includes(word));
    
    setFeedback({
      ...feedback,
      [id]: isCorrect ? 'correct' : 'incorrect'
    });
    
    // Reveal the correct answer after a short delay if incorrect
    if (!isCorrect) {
      setTimeout(() => {
        revealAnswer(id);
      }, 1500);
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Football Trivia
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Test your knowledge about Real Madrid, Manchester United, and the legend Cristiano Ronaldo!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {TRIVIA_ITEMS.map((item, index) => (
            <div 
              key={item.id} 
              className="pitch-pattern rounded-xl p-6 shadow-md animate-on-scroll" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-united flex-shrink-0" />
                <h3 className="font-bold text-lg">{item.question}</h3>
              </div>
              
              {!revealedAnswers[item.id] ? (
                <>
                  {item.hint && (
                    <p className="text-sm italic text-foreground/60 mb-3">
                      Hint: {item.hint}
                    </p>
                  )}
                  
                  <div className="mt-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Your answer..."
                        value={userAnswers[item.id] || ''}
                        onChange={(e) => handleUserAnswer(item.id, e.target.value)}
                        className={`flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                          feedback[item.id] === 'correct'
                            ? 'border-green-300 bg-green-50'
                            : feedback[item.id] === 'incorrect'
                            ? 'border-red-300 bg-red-50' 
                            : 'border-input'
                        }`}
                      />
                      <button
                        onClick={() => checkAnswer(item.id)}
                        disabled={!userAnswers[item.id]}
                        className="px-4 py-2 bg-united text-white rounded-lg hover:bg-united/90 disabled:opacity-50"
                      >
                        Check
                      </button>
                    </div>
                    
                    {feedback[item.id] && (
                      <div className={`mt-2 flex items-center gap-2 ${
                        feedback[item.id] === 'correct' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {feedback[item.id] === 'correct' ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Correct!</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4" />
                            <span>Not quite right. Try again or reveal the answer!</span>
                          </>
                        )}
                      </div>
                    )}
                    
                    <button
                      onClick={() => revealAnswer(item.id)}
                      className="mt-3 text-sm text-united hover:underline"
                    >
                      Reveal Answer
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-4 p-3 bg-white rounded-lg border border-gold animate-fade-in">
                  <p className="font-medium">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FootballTrivia;

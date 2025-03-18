import React, { useState, useEffect } from 'react';

interface CountdownSectionProps {
  title?: string;
  endTime?: string; // ISO string formato '2023-12-31T23:59:59'
  hoursToAdd?: number; // Alternativa: adicionar horas a partir de agora
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ 
  title = "ESTA OFERTA ACABA EM:",
  endTime,
  hoursToAdd = 24 // Por padrão, 24 horas a partir de agora
}) => {
  // Calcular o tempo final
  const calculateEndTime = () => {
    if (endTime) {
      return new Date(endTime).getTime();
    } else {
      const now = new Date();
      return now.getTime() + (hoursToAdd * 60 * 60 * 1000);
    }
  };

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetTime = calculateEndTime();
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;
      
      if (difference <= 0) {
        // Tempo esgotado
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      setTimeLeft({
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };
    
    // Calcular imediatamente
    calculateTimeLeft();
    
    // E então a cada segundo
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [endTime, hoursToAdd]);

  return (
    <section className="py-8 bg-black">
      <div className="container mx-auto px-4 text-center">
        {title && (
          <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
        )}
        
        <div className="flex justify-center space-x-4">
          <div className="flex flex-col items-center">
            <div className="bg-primary text-black text-3xl font-bold w-20 h-20 rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
              {String(timeLeft.hours).padStart(2, '0')}
            </div>
            <span className="text-white mt-2">Horas</span>
          </div>
          
          <div className="text-primary text-3xl font-bold">:</div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary text-black text-3xl font-bold w-20 h-20 rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
              {String(timeLeft.minutes).padStart(2, '0')}
            </div>
            <span className="text-white mt-2">Minutos</span>
          </div>
          
          <div className="text-primary text-3xl font-bold">:</div>
          
          <div className="flex flex-col items-center">
            <div className="bg-primary text-black text-3xl font-bold w-20 h-20 rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
              {String(timeLeft.seconds).padStart(2, '0')}
            </div>
            <span className="text-white mt-2">Segundos</span>
          </div>
        </div>
      </div>
    </section>
  );
};

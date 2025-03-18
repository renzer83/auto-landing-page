import React, { useState, useEffect } from 'react';

interface Notification {
  message: string;
  time: string;
}

const DEFAULT_NOTIFICATIONS: Notification[] = [
  { message: "Maria acabou de comprar", time: "agora mesmo" },
  { message: "João comprou", time: "há 2 minutos" },
  { message: "Ana acaba de se inscrever", time: "há 5 minutos" },
  { message: "Carlos adquiriu o curso", time: "há 7 minutos" },
  { message: "Patricia obteve acesso", time: "há 10 minutos" },
  { message: "Lucas comprou", time: "há 13 minutos" },
  { message: "Mariana acabou de comprar", time: "há 16 minutos" },
  { message: "Roberto está comprando agora", time: "há 19 minutos" }
];

const CITIES = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador", 
  "Fortaleza", "Curitiba", "Recife", "Porto Alegre", "Belém"
];

interface FloatingNotificationsProps {
  notifications?: Notification[];
  interval?: number; // milissegundos
  position?: 'bottom-left' | 'bottom-right';
}

export const FloatingNotifications: React.FC<FloatingNotificationsProps> = ({
  notifications = DEFAULT_NOTIFICATIONS,
  interval = 8000,
  position = 'bottom-left'
}) => {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Não exibir imediatamente
    const initialDelay = setTimeout(() => {
      showRandomNotification();
    }, 10000); // 10 segundos de atraso inicial

    return () => clearTimeout(initialDelay);
  }, []);

  const showRandomNotification = () => {
    // Gerar uma cidade aleatória
    const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];
    
    // Selecionar uma notificação aleatória
    const randomNotification = { 
      ...notifications[Math.floor(Math.random() * notifications.length)],
      message: `${notifications[Math.floor(Math.random() * notifications.length)].message} de ${randomCity}`
    };
    
    setCurrentNotification(randomNotification);
    setVisible(true);

    // Esconder após 5 segundos
    const hideTimer = setTimeout(() => {
      setVisible(false);
      
      // Agendar próxima notificação
      const nextTimer = setTimeout(() => {
        showRandomNotification();
      }, interval - 5000);
      
      return () => clearTimeout(nextTimer);
    }, 5000);

    return () => clearTimeout(hideTimer);
  };

  const positionClass = position === 'bottom-left' ? 'left-4 bottom-20' : 'right-4 bottom-20';

  if (!visible || !currentNotification) return null;

  return (
    <div 
      className={`fixed ${positionClass} z-50 transition-all duration-500 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
    >
      <div className="bg-gray-900 p-4 rounded-lg shadow-lg border border-primary max-w-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          <p className="text-sm text-white">
            <span className="font-semibold">{currentNotification.message}</span>
            <span className="text-gray-400 ml-1">{currentNotification.time}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

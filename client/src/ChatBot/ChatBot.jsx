import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import styles from './ChatBot.module.css';

const theme = {
  background: '#fea8bd',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#ec3664',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#ec3664',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const ChatBotOhana = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const steps = [
    {
    id: '1',
    message: '¿Hola, cómo te llamas?',
    trigger: '2'
  },
  {
    id: '2',
    user: true,
    validator: (value) => {
      if (!/^[A-Za-z\s]+$/.test(value)) {
        return 'Debes ingresar un nombre válido';
      }
      return true;
    },
    trigger: '3'
  },
  {
    id: '3',
    message: '¡Hola, {previousValue}! ¿En qué puedo ayudarte hoy?, {previousValue} si no deseas comprar nada mejor vete ',
    trigger: '4'
  },
  {
    id: '4',
    options: [
      { value: 1, label: 'Alv si quiero comprar', trigger: '5' },
      { value: 2, label: 'Pues me voy si quiere', trigger: '6' },
      // { value: 3, label: 'Quiero saber un poco más de la app', trigger: '9' }
    ]
  },
  {
    id: '5',
    message: 'Me parece maravilloso. Puedes dar clic en cualquier producto, te llevará al siguiente paso.',
    end: true
  },
  {
    id: '6',
    message: 'Anda pa alla B***',
    end: true
  },
  {
    id: '7',
    user: true,
    trigger: '8'
  },
  {
    id: '8',
    message: 'En breve ella se comunicará contigo',
    end: true
  },
  {
    id: '9',
    component: (
      <a href="http://localhost:3000/about">Acompáñame</a>
    ),
    end: true
  }
  ];

  return (
    <div className={styles.chatbotContainer}>
      <div className={`${styles.chatToggle} ${isChatOpen ? styles.open : ''}`} onClick={handleChatToggle}>
      </div>
      {isChatOpen && (
        <div className={styles.chatbotWindow}>
          <ThemeProvider theme={theme}>
            <ChatBot steps={steps} />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
};

export default ChatBotOhana;
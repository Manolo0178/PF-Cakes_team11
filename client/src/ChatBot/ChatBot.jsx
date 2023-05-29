import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';
import styles from './ChatBot.module.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

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
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imagenesBdd = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products/imagen/todas');
        const imag = response.data.map(image => image);
        setImages(imag);
      } catch (error) {
        console.log(error.message);
      }
    };

    imagenesBdd();
  }, []);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const ImageComponent = () => (
    <Carousel interval={1000}>
      {images.map((image, index) => (
        <Carousel.Item>
          <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/home/${image.id}`}>
          <p>{image.name}</p>
          <img style={{ width: '150px' }} src={image.image} alt={`Imagen ${index + 1}`} />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );

  const steps = [
    {
      id: '1',
      message: '¡Hola! ¿Cómo te llamas?',
      trigger: '2'
    },
    {
      id: '2',
      user: true,
      validator: (value) => {
        const regex = /^[A-Za-z]+$/;
        if (regex.test(value) && !value.includes(' ')) {
          return true
        }
        
        const nameRegex = /(?:me llamo|mi nombre es|llamo|soy) (\w+)/i;
        const match = value.match(nameRegex);
        
        if (match && match.length > 1) {
          return true
        }
        
        return 'No pude identificar tu nombre. Por favor, inténtalo nuevamente.';
      },
      next: true,
      trigger: '3',
    },
    {
      id: '3',
      message: ({previousValue}) => {
        const regex = /^[A-Za-z]+$/;
        if (regex.test(previousValue) && !previousValue.includes(' ')) {
          return `¡Hola ${previousValue}!, ¿En qué puedo ayudarte hoy? `
        }
        
        const nameRegex = /(?:me llamo|mi nombre es|llamo|soy) (\w+)/i;
        const match = previousValue.match(nameRegex);
        
        if (match && match.length > 1) {
          const name = match[1];
          return `¡Hola ${name}, ¿En qué puedo ayudarte hoy?`
        }
      },
     trigger:'4'
    },{
      id: '4',
      options : [
        {value: 1, label: 'Conocer los productos mas vendidos', trigger: '5'},
        {value: 2, label: 'Comprar un producto', trigger: '9'},
        {value: 3, label: 'Pedido personalizado', trigger: '11'},
        {value: 4, label: 'Conocer la empresa', trigger: '13'}
      ]
    },{
      id: '5',
      message:'Te enseño nuestros productos mas vendidos',
      trigger: '6',
      delay: 500
    },{
      id: '6',
      message:'Selecciona el producto de tu agrado y te llevara al siguiente paso',
      trigger: '7',
      delay: 1000
    },{
      id: '7',
      component: <ImageComponent />,
      asMessage: true,
      trigger: '8',
      delay: 2000
    },{
      id: '8',
      options : [
        {value: 1, label: 'Comprar un producto', trigger: '9'},
        {value: 2, label: 'Pedido personalizado', trigger: '11'},
        {value: 3, label: 'Conocer la empresa', trigger: '13'}
      ]
    },{
      id: '9',
      component: (
        <a href='/Products'>Acompañame</a>
      ),
      asMessage: true,
      trigger: '10'
    },{
      id: '10',
      options : [
        {value: 1, label: 'Conocer los productos mas vendidos', trigger: '5'},
        {value: 2, label: 'Pedido personalizado', trigger: '11'},
        {value: 3, label: 'Conocer la empresa', trigger: '13'}
      ]
    },{
      id: '11',
      component: (
        <a href="https://web.whatsapp.com/send?phone=3122659947&text=Hola,%20Me%20gustaría%20hacer%20un%20pedido" target="_blank" rel="noopener noreferrer">
        Habla con un asesor
      </a>
      
      ),
      asMessage: true,
      trigger: '12'
    },{
      id: '12',
      options : [
        {value: 1, label: 'Conocer los productos mas vendidos', trigger: '5'},
        {value: 2, label: 'Comprar un producto', trigger: '9'},
        {value: 3, label: 'Conocer la empresa', trigger: '13'}
      ]
    },{
      id: '13',
      component: (
        <a href='/about' >Aquí encontraras como inició está empresa</a>
      ),
      asMessage: true,
      trigger: '14'
    },{
      id:'14',
      options : [
        {value: 1, label: 'Conocer los productos mas vendidos', trigger: '5'},
        {value: 2, label: 'Comprar un producto', trigger: '9'},
        {value: 3, label: 'Pedido personalizado', trigger: '11'},
        {value: 4, label: 'Ver una imagen que me de hambre', trigger: '15'},
      ]
    },{
      id:'15',
      message: 'Que la fuerza te acompañe 🤖',
      trigger: '16'
    },{
      id: '16',
      component:(
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNu3e65wuqa5lBL7u-_D10-OlyM_q2MizpL87xr9yDeA2-OhaHMf5nFDlJtQG2L8jY34M&usqp=CAU" alt="image123" />
      ),
      end: true
    }
  ];
  
  
  return (
    <div className={styles.chatbotContainer}>
      <div className={`${styles.chatToggle} ${isChatOpen ? styles.open : ''}`} onClick={handleChatToggle}></div>
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
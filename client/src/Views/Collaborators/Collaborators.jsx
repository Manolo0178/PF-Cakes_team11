import React from 'react';
import styles from './collaborators.module.css';
import AylenRoxanaRondan from "../../assets/images/Aylen2.jpg";
import Josema from "../../assets/images/josema.jpeg";
import Tomas from "../../assets/images/tomas.jpg";
import Horacio from "../../assets/images/horacio.jpg";
import Juan from "../../assets/images/juanHuertas.jpg";
import Ramdon from "../../assets/images/imagenRamdon.png"

import { Link } from 'react-router-dom';


const collaborators = [
  {
    name: 'Almendro Jose Maria',
    linkedin: 'https://www.linkedin.com/in/jos%C3%A9-mar%C3%ADa-almendro-14394b181/',
    age: 27,
    image: Josema,
  },
  {
    name: 'Roxana Aylen Rondan',
    linkedin: 'https://www.linkedin.com/in/aylen-rondan-52a7a4198',
    age: 28,
    image: AylenRoxanaRondan,
  },
  {
    name: 'Tomas Sorgetti',
    linkedin: 'https://www.linkedin.com/in/tomas-sorgetti/',
    age: 25,
    image: Tomas,
  },
  {
    name: 'Carlos Aaron Benites Acevedo',
    linkedin: 'https://www.linkedin.com/in/carlos-aaron-benites-acevedo-8925b5263/',
    age: 25,
    image: Ramdon
  },
  {
    name: 'Horacio Cano',
    linkedin: 'https://www.linkedin.com/in/horacio-cano-b19545243/',
    age: 22,
    image: Horacio,
  },
  {
    name: 'Juan Huertas',
    linkedin: 'https://www.linkedin.com/in/juan-huertas-856658265/',
    age: 25,
    image: Juan,
  },
  {
    name: 'Johann suasnabar',
    linkedin: 'https://www.linkedin.com/in/carlos-aaron-benites-acevedo-8925b5263/',
    age: 25,
    image: Ramdon
  },
  {
    name: 'Manuel Gomez',
    linkedin: 'https://www.linkedin.com/in/carlos-aaron-benites-acevedo-8925b5263/',
    age: 25,
    image: Ramdon
  },
  // Agrega más colaboradores si es necesario
];

const Collaborators = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Colaboradores</h1>
      <Link to="/" className={styles.backButton}>Volver</Link>
      <div className={styles.cards}>
        {collaborators.map((collaborator, index) => (
          <div className={styles.card} key={index}>
            <img src={collaborator.image} alt={collaborator.name} className={styles.image} />
            <h2 className={styles.name}>{collaborator.name}</h2>
            <p className={styles.age}>Edad: {collaborator.age}</p>
            <a href={collaborator.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborators;
import './App.css';
import { Routes, Route } from "react-router-dom"

import Landing from './Views/LandingPage/landingPage';
import Home from './Views/Home/home';
import Products from './Views/Products/Products';
import CreateUser from './Views/CreateUser/CreateUser';
import Login from './Views/Login/Login';
import About from './Views/About/About'
import CreateDessert from './Views/DessertCreate/dessert';
import Payment from "./components/Payment/Payment.jsx"

import NewPassword from './Views/miPerfil/NewPassword/NewPassword';

import Detail from "./components/Detail/detail"

import Collaborators from './Views/Collaborators/Collaborators';
import Domicilio from './Views/Domicilio/Domicilio';
import EnviarEmail from './components/LoginForm/EnviarEmail/EnviarEmail';
import CamPassword from './components/LoginForm/CamPassword/CamPassword';
import NotFound from './Views/NotFound/NotFound';
import Favorites from './Views/Favorites/Favorites';
import MisDatos from './Views/MisDatos/MisDatos';
import MisCompras from './Views/MisCompras/MisCompras';
import MisDomicilios from './Views/MisDomicilios/MisDomicilios';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateDessert />} />

        <Route path="/payment/:total" element={<Payment/>} />
        <Route path="/home/:id" element={<Detail />} />
        
        <Route path="/payment" element={<Payment/>} />
        <Route path='/collaborators' element= { <Collaborators/> } />
        <Route path="/address" element={<Domicilio />} />
        <Route path="/profile/newPassword" element={<NewPassword />} />
        <Route path="/login/enviarMail" element={<EnviarEmail />} />
        <Route path="/login/enviarMail/newPassword" element={<CamPassword />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/misCompras" element={<MisCompras />} />
        <Route path="/misDatos" element={<MisDatos />} />

        <Route path="/misDomicilios" element={<MisDomicilios />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

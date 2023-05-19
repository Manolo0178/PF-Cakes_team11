import './App.css';
import { Routes, Route } from "react-router-dom"

import Landing from './Views/LandingPage/landingPage';
import Home from './Views/Home/home';
import Products from './Views/Products/Products';
import CreateUser from './Views/CreateUser/CreateUser';
import Login from './Views/Login/Login';
import About from './Views/About/About'
import CreateDessert from './Views/DessertCreate/dessert';

import Detail from "./components/Detail/detail"

import MiPerfil from './Views/miPerfil/MiPerfil';
import MisCompras from "./Views/miPerfil/MisCompras/MisCompras"
import MisDatos from "./Views/miPerfil/MisDatos/MisDatos"
function App() {
  const storedToken = localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing storedToken={storedToken} />} />

        <Route exact path="/home" element={<Home />} />

        <Route path="/Products" element={<Products />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateDessert />} />

        <Route path="/home/:id" element={<Detail />} />
        {storedToken && <Route path="/profile" element={<MiPerfil />} />}
        {storedToken && <Route path="/profile/misCompras" element={<MisCompras />} />}
        {storedToken && <Route path="/profile/misDatos" element={<MisDatos />} />}
      </Routes>
    </div>
  );
}

export default App;

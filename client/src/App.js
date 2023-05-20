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



function App() {

  const storedToken = localStorage.getItem("token");

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

        <Route path="/home/:id" element={<Detail />} />
        
      </Routes>
    </div>
  );
}

export default App;

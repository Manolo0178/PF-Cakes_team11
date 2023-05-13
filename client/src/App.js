import './App.css';
import { Route, Switch } from "react-router-dom";

import Landing from './Views/LandingPage/landingPage';
import Home from './Views/Home/home';
import Products from './Views/Products/Products';
import CreateUser from './Views/CreateUser/CreateUser';
import Login from './Views/Login/Login';
import About from './Views/About/About'
import CreateDessert from './Views/DessertCreate/dessert';
import Detail from './components/Detail/detail';

function App() {
  return (
    <div className="App" >
      <Switch>
        <Route exact path="/" component={Landing} />

        <Route exact path="/home" component={Home} />
        
        <Route path="/Products" component={Products} />
        <Route path="/createUser" component={CreateUser} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/create" component={CreateDessert} />

        <Route path="/home/:id" component={Detail}/>
        {/* <Route exact path="/budget" component={Budget} />
        <Route exact path="/contact" component={Contact} /> */}


        
      </Switch>
    </div>
  );
}

export default App;

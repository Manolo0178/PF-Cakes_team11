import './App.css';
import { Route, Switch } from "react-router-dom";

import Landing from './Views/LandingPage/landingPage';
import Home from './Views/Home/home';
import Products from './Views/Products/Products';
import CreateUser from './Views/CreateUser/CreateUser';
import Login from './Views/Login/Login';


function App() {
  return (
    <div className="App" >
      <Switch>
        <Route exact path="/" component={Landing} />

        <Route exact path="/home" component={Home} />
        
        <Route path="/Products" component={Products} />
        <Route path="/createUser" component={CreateUser} />
        <Route path="/login" component={Login} />
        {/* <Route exact path="/home/about" component={About} />
        <Route exact path="/home/budget" component={Budget} />
        <Route exact path="/home/contact" component={Contact} />

        <Route path="/home/:id" component={Detail} /> */}

        
      </Switch>
    </div>
  );
}

export default App;

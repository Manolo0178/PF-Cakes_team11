import './App.css';

import Landing from './Views/LandingPage/landingPage';
import Home from './Views/Home/home';
import Products from './Views/Products/Products';

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />

        <Route exact path="/home" component={Home} />
        
        <Route exact path="/home/products" component={Products} />
        {/* <Route exact path="/home/about" component={About} />
        <Route exact path="/home/budget" component={Budget} />
        <Route exact path="/home/contact" component={Contact} />

        <Route path="/home/:id" component={Detail} />

        <Route path="/createUser" component={CreateUser} />
        <Route path="/login" component={Login} /> */}
        
      </Switch>
    </div>
  );
}

export default App;

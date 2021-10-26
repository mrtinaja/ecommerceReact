import './App.css';
import NavBar from "./components/NavBar";
import Products from './components/Products';
import CheckoutPage from "./components/CheckoutPage";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from './components/Signin';
import SignUp from './components/SignUp';
import { useEffect } from 'react';
import { auth } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from "./StateProvider";
import Checkout from './components/Checkoutform/Checkout';




function App() {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        })
      }
    })
  }, [dispatch])


  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/checkout-page">
            <CheckoutPage />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <Products />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;

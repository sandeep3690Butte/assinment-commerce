import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useSelector, useDispatch } from "react-redux";

import Header from "./components/Header";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import OrderHistory from "./components/OrderHistory";
import LoginDialog from "./components/LoginDialog/LoginDialog";
import { setLoginStatus, setUSerDetails } from "./actions/account";
import userDetails from "./data/users.json";

const Routing = (
  <Switch>
    <Route exact path="/" render={(props) => <Home {...props} />} />
    <Route path="/cart" render={(props) => <Cart {...props} />} />
    <Route path="/orders" render={props => <OrderHistory {...props}/>} />
  </Switch>
);

const history = createBrowserHistory();

function App() {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = React.useState(false);
  const [loginFromCart, setLoginFromCart] = React.useState(false);
  const [error, setError] = React.useState({});
  const loginStatus = useSelector((state) => {
    return state.userDetails;
  });

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleLogin = (formValues) => {
    const { name, password } = formValues;
    const loginDetails = userDetails.filter(
      (value) =>
        value.name.toLowerCase() === name.toLowerCase() &&
        value.password === password
    );
    if (loginDetails.length > 0) {
      dispatch(setLoginStatus(true));
      dispatch(setUSerDetails(loginDetails[0].userId));
      setShowLogin(false);
      setError({});
      if (loginFromCart) {
        setLoginFromCart(false);
        history.push("/cart");
      }
    }else{
      setError({
        hasError: true,
        message: "Wrong Email/Password!"
      });
    }
  };

  const logOut = () => {
    dispatch(setLoginStatus(false));
    dispatch(setUSerDetails(null));
    history.push("/");
  }

  const navigateToCart = () => {
    if (!loginStatus.isLoggedIn) {
      setLoginFromCart(true);
      return setShowLogin(true);
    } else {
      return history.push("/cart");
    }
  };

  const navigateToOrders = () => {
    history.push("/orders")
  }

  return (
    <div className="App">
      <Header
        toggleLogin={toggleLogin}
        loginStatus={loginStatus}
        users={userDetails}
        navigateToCart={navigateToCart}
        navigateToOrders = {navigateToOrders}
        logOut={logOut}
      />
      {showLogin && (
        <LoginDialog
          open={showLogin}
          toggleLogin={toggleLogin}
          handleLogin={handleLogin}
          loginError = {error}
        />
      )}
      <Router history={history}>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route path="/cart" render={(props) => <Cart {...props} />} />
          <Route path="/orders" render={props => <OrderHistory {...props}/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

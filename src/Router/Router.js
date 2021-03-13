import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Main from '../pages/Main'
import UserDetail from '../pages/UserDetail'
import ForgotPasword from '../pages/ForgotPasword'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FirebaseAuthContext } from "../context/AuthContext";

function AppRouter() {

  const { currentUser } = useContext(FirebaseAuthContext);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/forgot-password" component={ForgotPasword} />
        <Route exact path="/user/:id" component={ currentUser ?   UserDetail : Signin} />
        <Route exact path="/register" component={Signup} />
        <Route exact path="/login" component={Signin} />
        <Route path="/" component={Main} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default AppRouter;
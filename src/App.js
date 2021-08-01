import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Navbar from './components/common/Navbar';
import GlobalStyle from '../src/components/common/GlobalStyles';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/mypage/order" component={MyPage} />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;

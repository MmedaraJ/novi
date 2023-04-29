import logo from './logo.svg';
import './App.css';
import Home from './views/Home/Home';
import {
  BrowserRouter as Router,
  Link,
  Outlet, 
  useRoutes,
  useNavigate
} from "react-router-dom";
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import PhoneNumberVerification from './views/PhoneNumberVerification/PhoneNumberVerification';

function App() {
  const routes = useRoutes([
    { path: '/', element: (<div className='App'><Home/></div>) },
    { path: '/signup', element: (<div className='App'><SignUp/></div>) },
    { path: '/signin', element: (<div className='App'> <SignIn/></div>) },
    { path: '/phoneNumberVerification', element: (<div className='App'><PhoneNumberVerification/></div>) }
  ]);

  return routes;
}

export default App;

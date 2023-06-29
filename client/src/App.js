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
import Profile from './views/profile/Profile';
import Blog from './views/Blog/Blog';
import RadioButtonGroup from './views/Rad/Rad';

function App() {
  const routes = useRoutes([
    { path: '/', element: (<div className='App'><Home/></div>) },
    { path: '/signup', element: (<div className='App'><SignUp/></div>) },
    { path: '/signin', element: (<div className='App'> <SignIn/></div>) },
    { path: '/phoneNumberVerification', element: (<div className='App'><PhoneNumberVerification/></div>) },
    { path: '/profile', element: (<div className='App'> <Profile/></div>) },
    { path: '/blog/*', element: (<div className='App'> <Blog/></div>) },
    { path: '/rad', element: (<div className='App'> <RadioButtonGroup/></div>) },
  ]);

  return routes;
}

export default App;

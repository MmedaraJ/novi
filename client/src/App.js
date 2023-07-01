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
import PrivacyPolicy from './views/PrivacyPolicy/PrivacyPolicy';
import EmployerHome from './views/Employer/EmployerHome/EmployerHome';
import EmployerSignIn from './views/Employer/EmployerSignIn/EmployerSignIn';
import EmployerSignUp from './views/Employer/EmployerSignUp/EmployerSignUp';

function App() {
  const routes = useRoutes([
    { path: '/', element: (<div className='App'><Home/></div>) },
    { path: '/signup', element: (<div className='App'><SignUp/></div>) },
    { path: '/signin', element: (<div className='App'> <SignIn/></div>) },
    { path: '/phoneNumberVerification', element: (<div className='App'><PhoneNumberVerification/></div>) },
    { path: '/profile', element: (<div className='App'> <Profile/></div>) },
    { path: '/blog/*', element: (<div className='App'> <Blog/></div>) },
    { path: '/privacypolicy', element: (<div className='App'> <PrivacyPolicy/></div>) },
    //Employer
    { path: '/employer', element: (<div className='App'> <EmployerHome/></div>) },
    { path: '/employersignin', element: (<div className='App'> <EmployerSignIn/></div>) },
    { path: '/employersignup', element: (<div className='App'> <EmployerSignUp/></div>) },
  ]);

  return routes;
}

export default App;

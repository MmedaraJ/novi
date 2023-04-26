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

function App() {
  const routes = useRoutes([
    { 
      path: '/', 
      element: (
        <div className='App'>
          <Home/>
        </div>
      )
    },
    { 
      path: '/signup', 
      element: (
        <div className='App'>
          <SignUp/>
        </div>
      )
    },
    { 
      path: '/signin', 
      element: (
        <div className='App'>
          <SignIn/>
        </div>
      )
    }
  ]);

  return routes;
  // return (
  //   <div className="App">
  //     <Home/>
  //   </div>
  // );
}

export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import {DeskPage} from "./pages/DeskPage/DeskPage.tsx";
import {LoginPage} from "./pages/LoginPage/LoginPage.tsx";
import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {UserPage} from "./pages/UserPage/UserPage.tsx";

function App() {
  return (
      <Router>
          <div>
              {/*<nav>*/}
              {/*    <ul>*/}
              {/*        <li>*/}
              {/*            <Link to="/">Home</Link>*/}
              {/*        </li>*/}
              {/*        <li>*/}
              {/*            <Link to="/login">Login</Link>*/}
              {/*        </li>*/}
              {/*        <li>*/}
              {/*            <Link to="/reset">Reset</Link>*/}
              {/*        </li>*/}
              {/*        <li>*/}
              {/*            <Link to="/dashboard">Dashboard</Link>*/}
              {/*        </li>*/}
              {/*    </ul>*/}
              {/*</nav>*/}

              <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/dashboard" element={<DeskPage />} />
                  <Route path="/user" element={<UserPage/>} />
              </Routes>
          </div>
      </Router>
  )
}

export default App;

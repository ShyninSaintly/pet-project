import './App.css';
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage/HomePage";
import {LoginPage} from "./pages/LoginPage/LoginPage";

function App() {
  return (
      <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
      </Routes>
  );
}

export default App;

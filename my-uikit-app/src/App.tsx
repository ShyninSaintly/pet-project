import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { DeskPage } from './pages/DeskPage/DeskPage.tsx'
import { LoginPage } from './pages/LoginPage/LoginPage.tsx'
import { MainPage } from './pages/MainPage/MainPage.tsx'
import { UserPage } from './pages/UserPage/UserPage.tsx'
import {CreateDesk} from "./pages/Create/CreateDesk/CreateDesk.tsx";
import {CreateTask} from "./pages/Create/CreateTask/CreateTask.tsx";
import {Edit} from "./pages/Edit/Edit.tsx";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/desk/:deskId" element={<DeskPage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path='/createDesk' element={<CreateDesk/>}/>
                    <Route path='/createTask' element={<CreateTask/>}/>
                    <Route path='/edit/:deskId' element={<Edit/>}/>
                </Routes>
            </div>
        </Router>
    )
}

export default App

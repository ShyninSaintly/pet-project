import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { DeskPage } from './pages/DeskPage/DeskPage.tsx'
import { LoginPage } from './pages/LoginPage/LoginPage.tsx'
import { MainPage } from './pages/MainPage/MainPage.tsx'
import { UserPage } from './pages/UserPage/UserPage.tsx'
import {CreateDesk} from "./pages/Create/CreateDesk/CreateDesk.tsx";
import {CreateTask} from "./pages/Create/CreateTask/CreateTask.tsx";
import {Edit} from "./pages/Edit/Edit.tsx";
import {AuthProvider, useAuth} from "./shared/AuthContext/AuthProvider.tsx";
import PrivateRoute from "./shared/PrivateRoute/PrivateRoute.tsx";

function App() {
    const auth = useAuth();
    return (
        <AuthProvider isAllowed={auth} redirectTo={
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={
                    <PrivateRoute isAuthenticated={!!auth} component={<MainPage />}>
                    </PrivateRoute>}
                />
                <Route path="/desk/:deskId" element={
                    <PrivateRoute isAuthenticated={!!auth} component={<DeskPage />}>
                    </PrivateRoute>}
                />
                <Route path="/user" element={
                    <PrivateRoute isAuthenticated={!!auth} component={<UserPage />}>
                    </PrivateRoute>}
                />
                <Route path='/createDesk' element={
                    <PrivateRoute isAuthenticated={!!auth} component={<CreateDesk />}>
                    </PrivateRoute>}
                />
                <Route path='/createTask' element={
                    <PrivateRoute isAuthenticated={!!auth} component = {<CreateTask />}>
                    </PrivateRoute>}
                />
                <Route path='/edit/:deskId' element={
                    <PrivateRoute isAuthenticated={!!auth} component={<Edit/>}>
                    </PrivateRoute>}
                />
            </Routes>
        }>
        </AuthProvider>
    )
}

export default App

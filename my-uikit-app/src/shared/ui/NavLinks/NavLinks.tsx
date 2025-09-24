import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'
import classes from './NavLinks.module.scss'
import { useEffect, useState } from 'react'

export const NavLinks = () => {
    const navigate = useNavigate()
    // @ts-ignore
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = () => {
        const currentUser = sessionStorage.getItem('currentUser')
        setIsLoggedIn(!!currentUser)
    }

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault()
        sessionStorage.clear()
        localStorage.clear()
        setIsLoggedIn(false)
        navigate('/login')
    }

    return (
        <Navbar expand="lg" className={classes.NavLinks}>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={classes.NavLinksNav}>
                        <Nav.Link className={classes.NavLinksItem} href="/">Главная</Nav.Link>
                        <Nav.Link className={classes.NavLinksItem} href="/createDesk">Создать доску</Nav.Link>
                        <Nav.Link className={classes.NavLinksItem} href="/createTask">Создать задачу</Nav.Link>
                        <Nav.Link className={classes.NavLinksItem} href="/user">Профиль</Nav.Link>
                        <Nav.Link className={classes.NavLinksItem}
                            href="/login"
                            onClick={handleLogout}
                            style={{ cursor: 'pointer' }}
                        >
                            Выйти
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}
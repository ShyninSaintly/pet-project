import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'
import classes from './NavLinks.module.scss'

export const NavLinks = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.removeItem('currentUser')
        localStorage.removeItem('user')
        localStorage.removeItem('rememberMe')
        navigate('/login')
    }

    return (
        <Navbar expand="lg" className={classes.NavLinks}>
            <Container>
                <Navbar.Brand>Название страницы</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={classes.NavLinksNav}>
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/dashboard">Доска задач</Nav.Link>
                        <Nav.Link href='/createDesk'>Создать доску</Nav.Link>
                        <Nav.Link href='/createTask'>Создать задачу</Nav.Link>
                        <Nav.Link href="/user">Профиль</Nav.Link>
                        <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        Выйти
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
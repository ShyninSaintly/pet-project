import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import classes from './NavLinks.module.scss'

export const NavLinks = () => {
    return (
        <Navbar expand="lg" className={classes.NavLinks}>
            <Container>
                <Navbar.Brand>Название страницы</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={classes.NavLinksNav}>
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/user">Профиль</Nav.Link>
                        <Nav.Link href="/dashboard">Доска задач</Nav.Link>
                        <Nav.Link href="/login">Выйти</Nav.Link>
                        <Nav.Link href='/createDesk'>Создать доску</Nav.Link>
                        <Nav.Link href='/createTask'>Создать задачу</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
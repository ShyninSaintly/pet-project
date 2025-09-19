import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {NavDropdown} from 'react-bootstrap'
import classes from './NavLinks.module.scss'
export const NavLinks = () => {
    return (
        <Navbar expand="lg" className={classes.NavLinks} >
            <Container>
                <Navbar.Brand>Название стараницы</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={classes.NavLinksNav}>
                        <Nav.Link href="/">Главная</Nav.Link>
                        <Nav.Link href="/user">Профиль</Nav.Link>
                        <Nav.Link href="/login">Кабан-доска</Nav.Link>
                        <Nav.Link href="/dashboard">Кабан-доска</Nav.Link>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

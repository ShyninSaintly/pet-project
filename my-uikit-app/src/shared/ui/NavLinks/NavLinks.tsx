import {Nav} from "react-bootstrap";
import classes from './NavLinks.module.scss'
export const NavLinks = () => {
    return (
        <Nav
            className={classes.Nav}
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        >
            <Nav.Item>
                <Nav.Link href="/home">Главная</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/dashboard">Доска</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/user">Профиль</Nav.Link>
            </Nav.Item>
        </Nav>
    );
};
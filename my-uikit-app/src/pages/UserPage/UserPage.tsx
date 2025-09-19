import { Container, Form, Image } from 'react-bootstrap'
import classes from './UserPage.module.scss'
import Button from "react-bootstrap/Button";
import {NavLinks} from "../../shared/ui/NavLinks/NavLinks.tsx";
export const UserPage = () => {
    return (
        <Container >
            <NavLinks/>
            <div className={classes.UserPage}>
                    <Image src={"#"}></Image>
                    <Form>
                        <Form.Group>
                            <Form.Label> Логин</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Логин"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Пароль"
                                required
                            />
                        </Form.Group>
                        <Button  variant="primary" type="submit">Сохранить</Button>
                    </Form>
            </div>
        </Container>
    )
}

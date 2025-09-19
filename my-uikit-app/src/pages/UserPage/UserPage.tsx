import { Container, Form, Image } from 'react-bootstrap'
import classes from './UserPage.module.scss'
import Button from "react-bootstrap/Button";
import {NavLinks} from "../../shared/ui/NavLinks/NavLinks.tsx";
export const UserPage = () => {
    return (
        <Container >
            <NavLinks/>
            <div className={classes.UserPage}>
                <Form className={classes.UserPageFormItems}>
                    <Image></Image>
                        <Form.Group>
                            <Form.Label>Логин</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=" Изменить логин"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Должность</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Изменить должность"
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder=" Изменить пароль"
                                required
                            />
                        </Form.Group>
                        <Button  variant="primary" type="submit">Сохранить</Button>
                </Form>
            </div>
        </Container>
    )
}

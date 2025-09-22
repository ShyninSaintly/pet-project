import { Container, Form, Image } from 'react-bootstrap'
import classes from './UserPage.module.scss'
import Button from "react-bootstrap/Button";
import {NavLinks} from "../../shared/ui/NavLinks/NavLinks.tsx";
import React from "react";
export const UserPage = () => {
    return (
        <Container >
            <NavLinks/>
            <div className={classes.UserPage}>
                <Form className={classes.UserPageFormItems}>
                    <Form.Text><h1>Профиль</h1></Form.Text>
                    <Image></Image>
                        <Form.Group className={classes.UserPageFormGroup}>
                            <Form.Label className={classes.UserPageLabel}>Логин</Form.Label>
                            <Form.Control className={classes.UserPageControl}
                                type="text"
                                placeholder=" Изменить логин"
                                required
                            />
                        </Form.Group>
                        <Form.Group className={classes.UserPageFormGroup}>
                            <Form.Label className={classes.UserPageLabel}>Должность</Form.Label>
                            <Form.Control className={classes.UserPageControl}
                                type="text"
                                placeholder="Изменить должность"
                                required
                            />
                        </Form.Group>
                        <Form.Group className={classes.UserPageFormGroup}>
                            <Form.Label className={classes.UserPageLabel}>Пароль</Form.Label>
                            <Form.Control className={classes.UserPageControl}
                                type="password"
                                placeholder=" Изменить пароль"
                                required
                            />
                        </Form.Group>
                        <Button className={classes.UserPageButton} variant="primary" type="submit">Сохранить</Button>
                </Form>
            </div>
        </Container>
    )
}

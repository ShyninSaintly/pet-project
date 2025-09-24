import { Container, Form } from 'react-bootstrap'
import classes from './UserPage.module.scss'
import Button from "react-bootstrap/Button";
import {NavLinks} from "../../shared/ui/NavLinks/NavLinks.tsx";
import React, {useState, useEffect} from "react";

interface UserData {
    id?: number;
    login: string;
    job: string;
    password:string;
}

export const UserPage = () => {
    const [loginCh, setLoginCh] = useState('');
    const [job, setJob] = useState('');
    const [passwordCh, setPasswordCh] = useState('');
    // @ts-ignore
    const [userId, setUserId] = useState<number | null>(null);
    useEffect(() => {
        const userData = localStorage.getItem('rememberedUser');
        console.log(userData);
        if (userData) {
            try {
                const parsedUser: UserData = JSON.parse(userData);
                setLoginCh(parsedUser.login || '');
                setJob(parsedUser.job || '');
            } catch (error) {
                console.error('Ошибка при парсинге данных пользователя:', error);
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentUserData = localStorage.getItem('user');
        if (!currentUserData) {
            console.error('Данные пользователя не найдены');
            return;
        }
        try {
            const currentUser: UserData = JSON.parse(currentUserData);
            const userIdToUpdate = userId || currentUser.id;
            if (!userIdToUpdate) {
                throw new Error('ID пользователя не найден');
            }
            const updateData: any = {
                login: loginCh,
                job: job,
            };
            if (passwordCh) {
                updateData.password = passwordCh;
            }
            const response = await fetch(`http://localhost:3000/users/${userIdToUpdate}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const result = await response.json();
            console.log('Данные успешно обновлены:', result);
            const updatedUserData = {
                ...currentUser,
                login: loginCh,
                job: job,
            };
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            setPasswordCh('');
            alert('Данные успешно обновлены!');
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            alert('Произошла ошибка при обновлении данных');
        }
    }

    return (
        <Container >
            <NavLinks/>
            <div className={classes.UserPage}>
                <Form className={classes.UserPageFormItems} onSubmit={handleSubmit}>
                    <Form.Text><h1>Профиль</h1></Form.Text>
                    <Form.Group className={classes.UserPageFormGroup}>
                        <Form.Label className={classes.UserPageLabel}>Логин</Form.Label>
                        <Form.Control
                            className={classes.UserPageControl}
                            type="text"
                            placeholder="Изменить логин"
                            required
                            value={loginCh}
                            defaultValue={currentUser}
                            onChange={(e) => setLoginCh(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className={classes.UserPageFormGroup}>
                        <Form.Label className={classes.UserPageLabel}>Должность</Form.Label>
                        <Form.Control
                            className={classes.UserPageControl}
                            type="text"
                            placeholder="Изменить должность"
                            required
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className={classes.UserPageFormGroup}>
                        <Form.Label className={classes.UserPageLabel}>Пароль</Form.Label>
                        <Form.Control
                            className={classes.UserPageControl}
                            type="password"
                            placeholder="Введите новый пароль"
                            value={passwordCh}
                            onChange={(e) => setPasswordCh(e.target.value)}
                        />
                    </Form.Group>
                    <Button className={classes.UserPageButton} variant="primary" type="submit">
                        Сохранить
                    </Button>
                </Form>
            </div>
        </Container>
    )
}
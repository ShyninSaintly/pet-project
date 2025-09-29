import { Container, Form, Alert } from 'react-bootstrap'
import classes from './UserPage.module.scss'
import Button from "react-bootstrap/Button";
import {NavLinks} from "../../shared/ui/NavLinks/NavLinks.tsx";
import React, {useState, useEffect} from "react";

interface UserData {
    id: number; // сделали обязательным
    login: string;
    job: string;
    password?: string; // сделали опциональным
}

export const UserPage = () => {
    const [loginCh, setLoginCh] = useState('');
    const [job, setJob] = useState('');
    const [passwordCh, setPasswordCh] = useState('');
    // @ts-ignore
    const [show, setShow]=useState(true)
    const [userId, setUserId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('rememberedUser');
        console.log('Данные из sessionStorage:', userData);

        if (userData) {
            try {
                const parsedUser: UserData = JSON.parse(userData);
                console.log('Парсинг пользователя:', parsedUser);
                setLoginCh(parsedUser.login || '');
                setJob(parsedUser.job || '');
                setUserId(parsedUser.id);
            } catch (error) {
                console.error('Ошибка при парсинге данных пользователя:', error);
            }
        } else {
            console.warn('Пользователь не найден в sessionStorage');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const currentUserData = sessionStorage.getItem('currentUser');
            console.log('Текущие данные пользователя:', currentUserData);

            if (!currentUserData) {
                throw new Error('Данные пользователя не найдены в sessionStorage');
            }

            const currentUser: UserData = JSON.parse(currentUserData);

            const userIdToUpdate = userId || currentUser.id;
            console.log('ID для обновления:', userIdToUpdate);

            if (!userIdToUpdate) {
                throw new Error('ID пользователя не найден');
            }

            const updateData: any = {
                login: loginCh,
                job: job,
            };
            if (passwordCh && passwordCh.trim() !== '') {
                updateData.password = passwordCh;
            }

            console.log('Отправляемые данные:', updateData);

            const response = await fetch(`http://localhost:3000/users/${userIdToUpdate}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            console.log('Статус ответа:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                return (
                <Alert variant="danger" dismissible>
                    <Alert.Heading>
                        (`Ошибка HTTP: ${response.status}-${errorText}`)
                    </Alert.Heading>
                    <Button onClick={()=> setShow(false)}>
                        Закрыть
                    </Button>
                </Alert>
                )
            }

            const result = await response.json();
            console.log('Данные успешно обновлены:', result);
            const updatedUserData = {
                ...currentUser,
                login: loginCh,
                job: job,
            };
            sessionStorage.setItem('currentUser', JSON.stringify(updatedUserData));
            localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
            setPasswordCh('');
            alert('Данные успешно обновлены!');

        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            alert(`Произошла ошибка при обновлении данных: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
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
                                onChange={(e) => setLoginCh(e.target.value)}
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </Form.Group>

                        <Button
                            className={classes.UserPageButton}
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                    </Form>
                </div>
        </Container>
    )
}
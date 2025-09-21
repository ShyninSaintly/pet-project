import { useState, useEffect } from 'react';
import {Alert,Card,Container} from 'react-bootstrap'
import { NavLinks } from "../../shared/ui/NavLinks/NavLinks.tsx";
import { Task } from "../../shared/ui/Task/Task.tsx";
import { Link } from "react-router-dom";

interface DeskType {
    id: string;
    title: string;
    description: string;
    author: string;
    dateOfCreation: string;
}

export const MainPage = () => {
    const [desks, setDesks] = useState<DeskType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        const user = sessionStorage.getItem('currentUser');
        setCurrentUser(user);

        const fetchDesks = async () => {
            try {
                const response = await fetch('http://localhost:3000/desks');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const desksData = await response.json();
                setDesks(desksData);

                // Фильтруем доски по текущему пользователю
                if (user) {
                    const userDesks = desksData.filter((desk: DeskType) => desk.author === user);
                    setDesks(userDesks);
                }
            } catch (err) {
                setError('Не получилось загрузить доступные доски');
                console.error('Ошибка загрузки досок:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDesks();
    }, []);

    if (loading) {
        return (
            <>
                <NavLinks />
                <Container>
                    <h1>Главная</h1>
                    <p>Загрузка...</p>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavLinks />
            <Container>
                <h1>Главная</h1>
                {error && <Alert >{error}</Alert>}
                {!currentUser ? (
                    <>
                        <h2>Доски пользователя: {currentUser}</h2>
                        <ul>
                            {desks.length > 0 ? (
                                desks.map(desk => (
                                    <li key={desk.id}>
                                        <Link to={`/desk/${desk.id}`}>
                                            <Card style={{ width: '18rem' }}>
                                                <Card.Body>
                                                    <Card.Title>{desk.title}</Card.Title>
                                                    <Card.Text>
                                                        {desk.description}
                                                    </Card.Text>
                                                    <Card.Text>
                                                        Автор: {desk.author}
                                                    </Card.Text>
                                                    <Card.Text>Дата создания: {desk.dateOfCreation}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p>Нет доступных досок</p>
                            )}
                        </ul>
                    </>
                ) : (
                    <Alert >Пожалуйста, войдите в систему</Alert>
                )}
            </Container>
        </>
    );
};
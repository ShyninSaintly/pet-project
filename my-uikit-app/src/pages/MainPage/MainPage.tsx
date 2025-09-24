import { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap'
import { NavLinks } from "../../shared/ui/NavLinks/NavLinks.tsx";
import {Task} from "../../shared/ui/Task/Task.tsx";

interface DeskType {
    id: string;
    title: string;
    description: string;
    author: string;
    dateOfCreation: string;
}

export const MainPage = () => {
    const [desks, setDesks] = useState<DeskType[]>([]);
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

                if (user) {
                    const userDesks = desksData.filter((desk: DeskType) => desk.author === user);
                    setDesks(userDesks);
                }
            } catch (err) {
                console.error('Ошибка загрузки досок:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDesks();
    }, []);


    return (
        <>
            <NavLinks />
            <Container style={{ paddingTop: '2rem' }}>
            {loading? (
                    <>
                            <h1>Главная</h1>
                            <p>Загрузка...</p>
                    </>
                ):(
                <>
                        <h1>Главная</h1>
                        <h2>Доски пользователя: {currentUser}</h2>
                        <ul style={{ listStyleType: 'none' }}>
                            {desks.length > 0 ? (
                                desks.map(desk => (
                                    <Task data={desk} key={desk.id}/>
                                ))
                            ) : (
                                <p>Нет доступных досок</p>
                            )}
                        </ul>

                </>
                )}
            </Container>
        </>)
};
import { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap'
import { NavLinks } from "../../shared/ui/NavLinks/NavLinks.tsx";
import {Task} from "../../shared/ui/Task/Task.tsx";
import {usePagination} from "../../shared/hooks/usePagination.tsx";
import Button from "react-bootstrap/Button";

interface DeskType {
    id: string;
    title: string;
    description: string;
    author: string;
    dateOfCreation: string;
}

interface UserType {
    id: number;
    login: string;
    job: string;
    password?: string;
}

export const MainPage = () => {
    const [desks, setDesks] = useState<DeskType[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 3,
        count: desks.length,
    });
    useEffect(() => {
        const user = sessionStorage.getItem('currentUser');
        let userData: UserType | null = null;

        if (user) {
            try {
                userData = JSON.parse(user);
                setCurrentUser(userData);
                console.log('Текущий пользователь:', userData);
            } catch (error) {
                console.error('Ошибка при парсинге пользователя:', error);
                setCurrentUser({ id: 0, login: user, job: '' });
            }
        }

        const fetchDesks = async () => {
            try {
                const response = await fetch('http://localhost:3000/desks');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const desksData = await response.json();

                if (userData && userData.login) {
                    const userDesks = desksData.filter((desk: DeskType) => desk.author === userData!.login);
                    setDesks(userDesks);
                } else {
                    setDesks(desksData);
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
            <Container style={{paddingTop: '2rem'}}>
                {loading ? (
                    <>
                        <h1>Главная</h1>
                        <p>Загрузка...</p>
                    </>
                ) : (
                    <>
                        <h1>Главная</h1>
                        <h2>Доски пользователя: {currentUser?.login || 'Неавторизованный пользователь'}</h2>
                        <ul style={{listStyleType: 'none'}}>
                            {desks.length > 0 ? (
                                desks.slice(firstContentIndex, lastContentIndex)
                                    .map(desk => (
                                        <Task data={desk} key={desk.id}/>
                                    ))
                            ) : (
                                <p>Нет доступных досок</p>
                            )}
                        </ul>
                    </>
                )}
                <div className="pagination">
                    <p className="text">
                        {page}/{totalPages}
                    </p>
                        <Button onClick={prevPage} className="page">
                            &larr;
                        </Button>
                    {[...Array(totalPages).keys()].map((el) => (
                        <Button
                            onClick={() => setPage(el + 1)}
                            key={el}
                            className={`page ${page === el + 1 ? "active" : ""}`}
                        >
                            {el + 1}
                        </Button>
                    ))}
                    <Button onClick={nextPage} className="page">
                        &rarr;
                    </Button>
                </div>
            </Container>
        </>
    );
};
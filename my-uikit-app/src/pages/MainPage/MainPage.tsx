import { useState, useEffect } from 'react';
import { Alert, Container } from 'uikit-react';
import { NavLinks } from "../../shared/ui/NavLinks/NavLinks.tsx";
import { Task } from "../../shared/ui/Task/Task.tsx";

interface TaskType {
    id: number;
    title: string;
    description: string;
    userName: string;
}

export const MainPage = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:3000/tasks');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const tasksData = await response.json();
                setTasks(tasksData);
                console.log(tasksData);
            } catch (err) {
                setError('Не получилось загрузить доступные задачи');
                console.error('Ошибка загрузки задач:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
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
                {error && <Alert severity="warning">{error}</Alert>}
                <ul>
                    {tasks.length > 0 ? (
                        tasks.map(item => (
                            <li key={item.id}>
                                <Task data={item} />
                            </li>
                        ))
                    ) : (
                        <p>Нет доступных задач</p>
                    )}
                </ul>
            </Container>
        </>
    );
};
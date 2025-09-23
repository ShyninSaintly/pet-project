import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import classes from './CreateTask.module.scss';
import {getCurrentDate} from "../../../shared/currentDate/currentDate.tsx";

interface Desk {
    id: string;
    title: string;
}

interface TaskData {
    id: string;
    deskId: string | null;
    title: string;
    description: string;
    author: string;
    column: string;
    dateOfCreation: string;
}

export const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedDeskId, setSelectedDeskId] = useState<string>('');
    const [desks, setDesks] = useState<Desk[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDesks = async () => {
            try {
                const response = await fetch('http://localhost:3000/desks');
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                const desksData = await response.json();
                setDesks(desksData);
            } catch (e) {
                console.error('Ошибка загрузки досок');
            } finally {
                setLoading(false);
            }
        };
        fetchDesks();
    }, []);

    const generateId = () => {
        return 'task' + Date.now();
    };

    const getCurrentUser = () => {
        const user = sessionStorage.getItem('currentUser');
        return user || 'Anonymous';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!taskTitle.trim() || !taskDescription.trim()) {
            console.log('Название и описание задачи обязательны для заполнения');
            return;
        }

        if (!selectedDeskId) {
            console.log('Необходимо выбрать доску');
            return;
        }

        try {
            const newTask: TaskData = {
                id: generateId(),
                deskId: selectedDeskId,
                title: taskTitle.trim(),
                description: taskDescription.trim(),
                author: getCurrentUser(),
                column: 'todo',
                dateOfCreation: getCurrentDate(),
            };

            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
               console.log('Ошиюка в получении данных')
            }

            const result = await response.json();
            console.log('Задача успешно создана:', result);
            navigate('/');

        } catch (e) {
            console.error('Ошибка при создании задачи');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <Form className={classes.CreateTask} onSubmit={handleSubmit}>
            <Form.Text><h2>Создание задачи</h2></Form.Text>
            <Form.Group className="mb-3">
                <Form.Label>Название задачи</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Введите название задачи"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Описание задачи</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Введите описание задачи"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Выберите доску</Form.Label>
                <Form.Select
                    value={selectedDeskId}
                    onChange={(e) => setSelectedDeskId(e.target.value)}
                    required
                >
                    {desks.map(desk => (
                        <option key={desk.id} value={desk.id}>
                            {desk.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Button
                    className={classes.CreateTaskButton}
                    variant="secondary"
                    onClick={handleCancel}
                >
                    Отмена
                </Button>
                <Button
                    className={classes.CreateTaskButton}
                    variant="primary"
                    type="submit"
                >
                    Создать
                </Button>
            </Form.Group>
        </Form>
    );
};
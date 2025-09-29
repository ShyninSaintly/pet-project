import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import classes from '../CreateTask/CreateTask.module.scss';
interface DeskData {
    id: string;
    title: string;
    description: string;
    author: string;
    dateOfCreation: string;
}

export const CreateDesk = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleCancel = () => {
       navigate('/');
    };

    const generateId = () => {
        return 'desk' + Date.now();
    };

    const getCurrentDate = () => {
        const dateForID = new Date();
        const day = String(dateForID.getDate()).padStart(2, '0');
        const month = String(dateForID.getMonth() + 1).padStart(2, '0');
        const year = dateForID.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const getCurrentUser = () => {
        const user = sessionStorage.getItem('currentUser');
        return user || 'UnknownUser';
    };

    const handleCreate = async (e:React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            return;
        }
        try {
            const newDesk: DeskData = {
                id: generateId(),
                title: title,
                description: description,
                author: getCurrentUser(),
                dateOfCreation: getCurrentDate(),
            };
            const response = await fetch('http://localhost:3000/desks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDesk),
            });

            if (!response.ok) {
                console.log('Ошибочка в создании доски');
                return;
            }
            navigate('/');

        } catch (error) {
            console.error('Ошибка при создании доски:', error);
        }
    };

    return (
                    <Form onSubmit={handleCreate} className={classes.CreateTask}>
                        <Form.Text>
                            <h2>Создание доски</h2>
                        </Form.Text>
                        <Form.Group className="mb-3">
                            <Form.Label>Название доски</Form.Label>
                            <Form.Control className={classes.CreateTaskControl}
                                type="text"
                                placeholder="Введите название доски"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" style={{ marginTop: '15px' }}>
                            <Form.Label>
                                Описание доски
                            </Form.Label>
                            <Form.Control
                                className={classes.CreateTaskControl}
                                type="text"
                                placeholder="Введите описание доски"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" style={{ marginTop: '30px' }}>
                            <Button className={classes.CreateTaskButton} variant="primary" type="button" onClick={handleCancel}>Отмена</Button>
                            <Button style={{ marginLeft: '30px' }} className={classes.CreateTaskButton} variant="primary" type="submit">Создать</Button>
                        </Form.Group>
                    </Form>
    );
};
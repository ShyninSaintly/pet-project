import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import classes from './CreateDesk.module.scss';
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

    const handleDiscard = () => {
       navigate('/');
    };

    const generateId = () => {
        return 'desk' + Date.now();
    };

    const getCurrentDate = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const getCurrentUser = () => {
        const user = sessionStorage.getItem('currentUser');
        return user || 'Anonymous';
    };

    const handleCreate = async () => {
        if (!title.trim() || !description.trim()) {
            return;
        }
        try {
            const newDesk: DeskData = {
                id: generateId(),
                title: title.trim(),
                description: description.trim(),
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
                console.log('Ошибочка в создании доски')
            }
        } catch{
            console.error('Ошибка при создании доски:');
        }
        navigate('/');
    };

    return (
                    <Form className={classes.CreateDesk}>
                        <Form.Text><h2>Создание доски</h2></Form.Text>
                        <Form.Group className="mb-3">
                            <Form.Label>Название доски</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите название доски"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Описание доски</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите описание доски"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button variant="primary" type="submit" onClick={handleDiscard}>Отмена</Button>
                            <Button variant="primary" type="submit" onClick={handleCreate}>Создать</Button>
                        </Form.Group>
                    </Form>
    );
};
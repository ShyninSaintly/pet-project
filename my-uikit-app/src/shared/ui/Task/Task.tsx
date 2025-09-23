import {Button, Card, Modal } from "react-bootstrap";
import {Link} from "react-router-dom";
import classes from "./Task.module.scss";
import {useState} from "react";

interface TaskProps {
    data: {
        id: string;
        title: string;
        description: string;
        author: string;
        dateOfCreation: string;
    }
}

export const Task = ({ data }: TaskProps) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!deskId) {
            setError("ID доски не указан");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/desks/${deskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: deskNameCh,
                    description: deskDescriptionCh,
                }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            setSuccess("Доска успешно обновлена!");
            setError("");
            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (err) {
            console.error('Ошибка при обновлении данных:', err);
            setError("Ошибка при обновлении доски");
            setSuccess("");
        }
    };

    return (
        <li key={data.id}>
            <Card className={classes.TaskCard}>
                <Card.Body>
                    <Link to={`/desk/${data.id}`}>
                        <Card.Title className={classes.TaskText}>{data.title}</Card.Title>
                        <Card.Text className={classes.TaskText}>
                            {data.description}
                        </Card.Text>
                        <Card.Text className={classes.TaskText}>
                            Автор: {data.author}
                        </Card.Text>
                        <Card.Text className={classes.TaskText}>
                            Дата создания: {data.dateOfCreation}
                        </Card.Text>
                    </Link>
                </Card.Body>
                <Link to={`/edit/${data.id}`}>
                    <Card.Img src={'src/assets/change.png'} width={'40px'} alt="Редактировать"/>
                </Link>
                <Button onClick={handleShow}>
                    <Card.Img src={'src/assets/delete.png'} width={'40px'} alt="Удалить"/>
                </Button>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Вы точно хотите удалить эту доску?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отменить
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </li>
    );
};
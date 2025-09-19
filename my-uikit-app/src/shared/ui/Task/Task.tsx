import {Card,Button} from "react-bootstrap";

export const Task = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Название проекта</Card.Title>
                <Card.Text>
                    Описание проекта
                </Card.Text>
                <Card.Text>
                    Автор проекта
                </Card.Text>
                <Card.Text>Дата создания</Card.Text>
                <Button variant="primary">К задаче</Button>
            </Card.Body>
        </Card>
    );
};
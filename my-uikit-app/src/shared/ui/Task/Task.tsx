import { Card, Button } from "react-bootstrap";

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
    console.log(data);
    return (
        <Card style={{ width: '18rem' ,backgroundColor:"aquamarine"}}>
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>
                    {data.description}
                </Card.Text>
                <Card.Text>
                    Автор: {data.author}
                </Card.Text>
                <Card.Text>Дата создания: {data.dateOfCreation}</Card.Text>
                <Button variant="primary">К задаче</Button>
            </Card.Body>
        </Card>
    );
};
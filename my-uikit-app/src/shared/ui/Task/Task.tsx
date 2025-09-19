import {Card,Button} from "react-bootstrap";

export const Task = (data) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>data.title</Card.Title>
                <Card.Text>
                    data.description
                </Card.Text>
                <Card.Text>
                    data.author
                </Card.Text>
                <Card.Text>data.dateOfCreation</Card.Text>
                <Button variant="primary">К задаче</Button>
            </Card.Body>
        </Card>
    );
};
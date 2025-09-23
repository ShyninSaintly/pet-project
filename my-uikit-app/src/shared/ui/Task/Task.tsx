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
    const handleDelete=()=>{

    }
    return (
        <li key={data.id} >
                <Card className={classes.TaskCard}>
                    <Card.Body >
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
                    <Link to={'/edit'}><Card.Img src={'src/assets/change.png'} width={'40px'}></Card.Img></Link>
                    <Button onClick={handleShow}><Card.Img src={'src/assets/delete.png'} width={'40px'}></Card.Img></Button>
                </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>Вы точно хотите удалить эту доску?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        отменить
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </li>
    );
};
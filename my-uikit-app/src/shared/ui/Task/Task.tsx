import { Card } from "react-bootstrap";
import {Link} from "react-router-dom";
import classes from "./Task.module.scss";
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
                    <Link to={'/'}><Card.Img src={'src/assets/change.png'} width={'40px'}></Card.Img></Link>
                    <Link to={'/'}><Card.Img src={'src/assets/delete.png'} width={'40px'}></Card.Img></Link>
                </Card>
        </li>
    );
};
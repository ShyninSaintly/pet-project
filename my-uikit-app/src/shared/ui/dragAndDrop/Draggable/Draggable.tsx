import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { Card } from 'react-bootstrap'
import { CardBody } from 'react-bootstrap'
import classes from './Draggable.module.scss'

export const Draggable = (props: { id: string; children: React.ReactNode }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    })
    const style = {
        transform: CSS.Translate.toString(transform),
        cursor: 'pointer',
    }
    return (
        <Card style={style} className={classes.Draggable}>
            <CardBody ref={setNodeRef} {...listeners} {...attributes}>
                <Card.Text className={classes.DraggableText}>{props.children}</Card.Text>
                <Card.Link className={classes.DraggableLink} href="#">Перейти к задаче</Card.Link>
            </CardBody>
        </Card>
    )
}

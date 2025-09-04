
import {useDroppable} from '@dnd-kit/core';

export const Droppable = (props: { id: string; children: React.ReactNode }) => {
    const {isOver, setNodeRef} = useDroppable({
        id: props.id,
    });
    const style = {
        border: isOver ? 1 : 0.5,
        width:'100%',
        height:'100vh',
        backgroundColor:'6C6C6CFF',

    };
    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}

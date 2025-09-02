// import Table from 'react-bootstrap/Table';
// import Container from 'react-bootstrap/Container';
// import classes from './DeskPage.module.scss'
import  {useState} from "react";
import { DndContext } from "@dnd-kit/core";
import {Draggable} from "../../shared/ui/dragAndDrop/Draggable.tsx";
import { Droppable } from "../../shared/ui/dragAndDrop/Droppable.tsx";

const draggable = (
    <Draggable id="draggable">
        Go ahead, drag me.
    </Draggable>
);
export const DeskPage = () => {
    const [parent, setParent] = useState(null);
    return (
        <DndContext onDragEnd={handleDragEnd}>
            {!parent ? draggable : null}
            <Droppable id="droppable">
                {parent === "droppable" ? draggable : 'Drop here'}
            </Droppable>
        </DndContext>
    );
    // @ts-ignore
    function handleDragEnd({over}) {
        setParent(over ? over.id : null);
    }
};

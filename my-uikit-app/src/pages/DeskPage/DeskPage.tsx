// import Table from 'react-bootstrap/Table';
// import Container from 'react-bootstrap/Container';
// import classes from './DeskPage.module.scss'
import {useState} from "react";
import { DndContext } from "@dnd-kit/core";
import {Draggable} from "../../shared/ui/dragAndDrop/Draggable.tsx";
import { Droppable } from "../../shared/ui/dragAndDrop/Droppable.tsx";
const [parent, setParent] = useState(null);
const draggable = (
    <Draggable id="draggable">
        Go ahead, drag me.
    </Draggable>
);
export const DeskPage = () => {
    return (
        <DndContext onDragEnd={handleDragEnd}>
            {!parent ? draggable : null}
            <Droppable id="droppable">
                {parent === "droppable" ? draggable : 'Drop here'}
            </Droppable>
        </DndContext>
//         <Container fluid>
//             <Table responsive="xl" className={classes.DeskPageTable}>
//                 <thead>
//                 <tr>
//                     <th>#</th>
//                     <th>Table heading</th>
//                     <th>Table heading</th>
//                     <th>Table heading</th>
//                     <th>Table heading</th>
//                     <th>Table heading</th>
//                     <th>Table heading</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 <tr>
//                     <td>1</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                 </tr>
//                 <tr>
//                     <td>2</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                 </tr>
//                 <tr>
//                     <td>3</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                     <td>Table cell</td>
//                 </tr>
//                 </tbody>
//             </Table>
// </Container>
    );
    // @ts-ignore
    function handleDragEnd({over}) {
        setParent(over ? over.id : null);
    }
};

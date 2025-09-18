import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import classes from './DeskPage.module.scss'
import { useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import { Draggable } from '../../shared/ui/dragAndDrop/Draggable/Draggable.tsx'
import { Droppable } from '../../shared/ui/dragAndDrop/Droppable.tsx'
import { NavLinks } from '../../shared/ui/NavLinks/NavLinks.tsx'

interface Task {
    id: string
    content: string
}
type ColumnId = 'todo' | 'inProgress' | 'testing' | 'done'

export const DeskPage = () => {
    const [items, setItems] = useState<Record<ColumnId, Task[]>>({
        todo: [{ id: '1', content: 'Задача 1' }],
        inProgress: [{ id: '2', content: 'Задача 2' }],
        testing: [{ id: '3', content: 'Задача 3' }],
        done: [{ id: '4', content: 'Задача 4' }],
    })

    const handleDragEnd = (event: any) => {
        const { active, over } = event

        if (!over) return

        const taskId = active.id
        const sourceColumn = Object.keys(items).find((key) =>
            items[key as ColumnId].some((task) => task.id === taskId)
        ) as ColumnId
        const destinationColumn = over.id as ColumnId

        if (sourceColumn === destinationColumn) return

        setItems((prev) => {
            const taskToMove = prev[sourceColumn].find(
                (task) => task.id === taskId
            )
            if (!taskToMove) return prev

            return {
                ...prev,
                [sourceColumn]: prev[sourceColumn].filter(
                    (task) => task.id !== taskId
                ),
                [destinationColumn]: [...prev[destinationColumn], taskToMove],
            }
        })
    }

    return (
        <>
            <NavLinks />
            <Container fluid>
                <DndContext onDragEnd={handleDragEnd}>
                    <Table responsive="xl" className={classes.DeskPageTable}>
                        <thead>
                            <tr>
                                <th>Надо сделать</th>
                                <th>В работе</th>
                                <th>Готов к тесту</th>
                                <th>Готово</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {(
                                    [
                                        'todo',
                                        'inProgress',
                                        'testing',
                                        'done',
                                    ] as ColumnId[]
                                ).map((columnId) => (
                                    <td key={columnId}>
                                        <Droppable id={columnId}>
                                            {items[columnId].length > 0
                                                ? items[columnId].map(
                                                      (task) => (
                                                          <Draggable
                                                              key={task.id}
                                                              id={task.id}
                                                          >
                                                              {task.content}
                                                          </Draggable>
                                                      )
                                                  )
                                                : 'Перетащите задачу в это поле'}
                                        </Droppable>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </DndContext>
            </Container>
        </>
    )
}

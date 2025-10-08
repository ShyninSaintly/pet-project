import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import classes from './DeskPage.module.scss'
import { useState, useEffect } from 'react'
import {DndContext, type DragEndEvent} from '@dnd-kit/core'
import { Draggable } from '../../shared/ui/dragAndDrop/Draggable/Draggable.tsx'
import { Droppable } from '../../shared/ui/dragAndDrop/Droppable.tsx'
import { useParams } from 'react-router-dom'
import {Loader} from "../../shared/components/Loader/Loader.tsx";

interface Task {
    id: string
    deskId: string
    title: string
    description: string
    author: string
    column: string
    dateOfCreation: string
}

type ColumnId = 'todo' | 'inProgress' | 'testing' | 'done'

export const DeskPage = () => {
    const { deskId } = useParams<{ deskId: string }>()
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tasks?deskId=${deskId}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const tasksData = await response.json()
                setTasks(tasksData)
            } catch (e) {
                console.error('Ошибка загрузки задач:', e)
            } finally {
                setLoading(false)
            }
        }

        if (deskId) {
            fetchTasks();
        }
    }, [deskId])
    const items: Record<ColumnId, Task[]> = {
        todo: tasks.filter(task => task.column === 'todo'),
        inProgress: tasks.filter(task => task.column === 'inProgress'),
        testing: tasks.filter(task => task.column === 'testing'),
        done: tasks.filter(task => task.column === 'done'),
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

        const taskId = active.id
        const destinationColumn = over.id as ColumnId
        const task = tasks.find(t => t.id === taskId)
        if (!task) return
        if (task.column === destinationColumn) return
        try {
            const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ column: destinationColumn })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            setTasks(prevTasks =>
                prevTasks.map(t =>
                    t.id === taskId ? { ...t, column: destinationColumn } : t
                )
            )
        } catch (err) {
            console.error('Ошибка обновления задачи:', err);
        }
    }

    return (
            <Container fluid>
                {loading ? (
                        <Container fluid>
                            <Loader/>
                        </Container>
                ):(
                <DndContext onDragEnd={handleDragEnd}>
                    <Table responsive="xl" className={classes.DeskPageTable}>
                        <thead>
                        <tr>
                            <th>Надо сделать</th>
                            <th>В работе</th>
                            <th>Готово к тесту</th>
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
                                                                <h5>{task.title}</h5>
                                                                <p>{task.description}</p>
                                                                <p>Автор: {task.author}</p>
                                                        </Draggable>
                                                    )
                                                )
                                                : 'Перетащите задачу в это поле'
                                            }
                                        </Droppable>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </DndContext>
                )}
            </Container>
    )
}
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import classes from './DeskPage.module.scss'
import { useState, useEffect } from 'react'
import { DndContext } from '@dnd-kit/core'
import { Draggable } from '../../shared/ui/dragAndDrop/Draggable/Draggable.tsx'
import { Droppable } from '../../shared/ui/dragAndDrop/Droppable.tsx'
import { useParams } from 'react-router-dom'

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
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tasks?deskId=${deskId}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const tasksData = await response.json()
                setTasks(tasksData)
            } catch (err) {
                setError('Не получилось загрузить задачи для этой доски')
                console.error('Ошибка загрузки задач:', err)
            } finally {
                setLoading(false)
            }
        }

        if (deskId) {
            fetchTasks()
        }
    }, [deskId])

    // Группируем задачи по колонкам
    const items: Record<ColumnId, Task[]> = {
        todo: tasks.filter(task => task.column === 'todo'),
        inProgress: tasks.filter(task => task.column === 'inProgress'),
        testing: tasks.filter(task => task.column === 'testing'),
        done: tasks.filter(task => task.column === 'done'),
    }

    const handleDragEnd = async (event: any) => {
        const { active, over } = event

        if (!over) return

        const taskId = active.id
        const destinationColumn = over.id as ColumnId

        // Находим задачу
        const task = tasks.find(t => t.id === taskId)
        if (!task) return

        // Если колонка не изменилась, выходим
        if (task.column === destinationColumn) return

        // Обновляем задачу на сервере
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

            // Обновляем локальное состояние
            setTasks(prevTasks =>
                prevTasks.map(t =>
                    t.id === taskId ? { ...t, column: destinationColumn } : t
                )
            )
        } catch (err) {
            setError('Не удалось обновить задачу')
            console.error('Ошибка обновления задачи:', err)
        }
    }

    if (loading) {
        return (
            <Container fluid>
                <p>Загрузка...</p>
            </Container>
        )
    }

    if (error) {
        return (
            <Container fluid>
                <p>{error}</p>
            </Container>
        )
    }

    return (
        <>
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
                                                        <div>
                                                            <h5>{task.title}</h5>
                                                            <p>{task.description}</p>
                                                            <small>Автор: {task.author}</small>
                                                        </div>
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
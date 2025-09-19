import {Alert, Container} from 'uikit-react'
import {NavLinks} from "../../shared/ui/NavLinks/NavLinks.tsx";
import {Task} from "../../shared/ui/Task/Task.tsx";
export const MainPage = () => {
    const tasks= async()=>{
        try {
            const response = await fetch('http://localhost:3000/tasks')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const tasks = await response.json()
            const user = tasks.find((u: any) => u.userName === tasks)
        }catch{
            <Alert severity="warning">Не получилось сгенерировать, доступые доски</Alert>
        }
    }

    return (
        <>
        <NavLinks/>
            <Container>
                <h1>Главная</h1>
                <ul>
                    {tasks.map(item => (
                        <li key={item.id}>
                            <Task data={item}/>
                        </li>
                    ))}
                </ul>
            </Container>
        </>)
}

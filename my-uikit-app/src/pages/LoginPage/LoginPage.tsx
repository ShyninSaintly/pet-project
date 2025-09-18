import React, { useCallback, useState } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            const response = await fetch('http://localhost:3000/users')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const users = await response.json()
            const user = users.find((u: any) => u.userName === login)
            if (user && user.password === password) {
                navigate('/')
                if (rememberMe) {
                    localStorage.setItem(
                        'rememberedUser',
                        JSON.stringify({ login, password })
                    )
                }
            } else {
                setError('Неверный логин или пароль')
            }
        } catch (error) {
            console.error('Error:', error)
            setError('Ошибка подключения к серверу')
        }
    }

    const handleRememberMe = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setRememberMe(e.currentTarget.checked)
        },
        []
    )

    return (
        <Form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    label="Запомнить меня?"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Войти
            </Button>
        </Form>
    )
}

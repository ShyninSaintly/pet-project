import React, { useCallback, useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import classes from './LoginPage.module.scss'
export const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const rememberedUser = localStorage.getItem('rememberedUser')
        if (rememberedUser) {
            const userData = JSON.parse(rememberedUser)
            setLogin(userData.login)
            setPassword(userData.password)
            setRememberMe(true)
            handleAutoLogin(userData.login, userData.password)
        }
    }, [])

    const handleAutoLogin = async (savedLogin: string, savedPassword: string) => {
        setIsLoading(true)
        try {
            const response = await fetch('http://localhost:3000/users')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const users = await response.json()
            const user = users.find((u: any) => u.userName === savedLogin)

            if (user && user.password === savedPassword) {
                sessionStorage.setItem('currentUser', savedLogin)
                navigate('/')
            } else {
                localStorage.removeItem('rememberedUser')
                setError('Сохраненные данные устарели. Войдите снова.')
            }
        } catch (error) {
            console.error('Error:', error)
            setError('Ошибка подключения к серверу')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        try {
            const response = await fetch('http://localhost:3000/users')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const users = await response.json()
            const user = users.find((u: any) => u.userName === login)

            if (user && user.password === password) {
                sessionStorage.setItem('currentUser', login)

                if (rememberMe) {
                    localStorage.setItem(
                        'rememberedUser',
                        JSON.stringify({ login, password })
                    )
                } else {
                    localStorage.removeItem('rememberedUser')
                }
                navigate('/')
            } else {
                setError('Неверный логин или пароль')
            }
        } catch (error) {
            console.error('Error:', error)
            setError('Ошибка подключения к серверу')
        } finally {
            setIsLoading(false)
        }
    }

    const handleRememberMe = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setRememberMe(e.currentTarget.checked)
        },
        []
    )

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <div className={classes.LoginPage}>
        <Form onSubmit={handleSubmit} className={classes.LoginPageForm}>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form.Group className={classes.LoginPageForm} controlId="formBasicEmail">
                <Form.Text><h1>Авторизация</h1></Form.Text>
                <Form.Label className={classes.LoginPageLabel}>Логин</Form.Label>
                <Form.Control
                    className={classes.LoginPageControl}
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className={classes.LoginPageForm} controlId="formBasicPassword">
                <Form.Label className={classes.LoginPageLabel}>Пароль</Form.Label>
                <Form.Control
                    className={classes.LoginPageControl}
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className={classes.LoginPageForm} controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    label="Запомнить меня?"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                />
            </Form.Group>
            <Button className={classes.LoginPageButton} variant="primary" type="submit">
                Войти
            </Button>
        </Form>
        </div>
    );
}
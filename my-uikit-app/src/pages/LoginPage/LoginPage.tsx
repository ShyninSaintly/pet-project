import React, {useCallback, useState} from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
// interface ILoginPageProps {
//     login: string,
//     password: string,
// }
export const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    // const [formData, setFormData] = useState<ILoginPageProps>({
    //     login: "",
    //     password: '',
    // });
    const getUserInfo = () => {
        fetch('http://localhost:3000/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if(data.password ===password && data.userName === login){
navigate('/');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', login, 'Password:', password);
    };
    const handleRememberMe = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked);
    }, []);
    return (
        <Form onSubmit={(e)=>e.preventDefault()}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="login" placeholder="Логин" onChange={(e) => setLogin(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Запомнить меня?" onChange={handleRememberMe} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={getUserInfo}>
                Submit
            </Button>
        </Form>
    );
};
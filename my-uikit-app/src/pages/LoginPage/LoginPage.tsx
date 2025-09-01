import React, {useCallback, useState} from 'react';
import {Button} from "uikit-react";
interface ILoginPageProps {
    login: string,
    password: string,
}
export const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState<ILoginPageProps>({
        login: "",
        password: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', login, 'Password:', password);
    };
    const handleRememberMe = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked);
    }, []);
    return (
            <div className="uk-height-medium uk-flex uk-flex-center uk-flex-middle">
                    <div className="uk-card uk-card-default uk-card-body uk-box-shadow-large">
                        <h2 className="uk-text-center uk-heading-divider">Авторизация</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="uk-margin">
                                <input
                                    className="uk-input"
                                    type="login"
                                    placeholder="Логин"
                                    value={login}
                                    required
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </div>

                            <div className="uk-margin">
                                <input
                                    className="uk-input"
                                    type="password"
                                    placeholder="Пароль"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="uk-margin">
                                <label>
                                    <input className="uk-radio" type="radio" name="radio1" checked={rememberMe} onChange={handleRememberMe}/> Запомнить меня?
                                </label>
                            </div>
                                <Button
                                className="uk-button uk-button-primary uk-width-1-1"
                                type="submit"
                                onClick={handleSubmit}
                                >
                                    Войти
                                </Button>
                        </form>
                    </div>
            </div>
    );
};
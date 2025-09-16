import {CardImg,Container, Form, Row} from "react-bootstrap";

export const UserPage = () => {
    return (
        <>
            <Container>
                <Row>
                    <CardImg ></CardImg>
                </Row>
            </Container>
            <Form>
                <Form.Group>
                    <Form.Label> Юзер</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Логин"
                        required
                    />
                </Form.Group>
                <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Пароль"
                    required
                />
            </Form.Group>
            </Form>
        </>
    );
};
import { Col, Container, Form, Row } from 'react-bootstrap'
import { NavLinks } from '../../shared/ui/NavLinks/NavLinks.tsx'

export const UserPage = () => {
    return (
        <>
            <NavLinks header={"Профиль"}></NavLinks>
            <Container>
                <Row>
                    <Col xs={6} md={4}></Col>
                </Row>

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
            </Container>
        </>
    )
}

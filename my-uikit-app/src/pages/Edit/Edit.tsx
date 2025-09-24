import { Form, Container} from "react-bootstrap";
import classes from './Edit.module.scss'
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavLinks } from "../../shared/ui/NavLinks/NavLinks.tsx";

interface DeskData {
    id: string;
    title: string;
    description: string;
    author: string;
    dateOfCreation: string;
}

export const Edit = () => {
    const { deskId } = useParams<{ deskId: string }>();
    const navigate = useNavigate();

    const [deskNameCh, setDeskCh] = useState("");
    const [deskDescriptionCh, setDeskDescriptionCh] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeskData = async () => {
            if (!deskId) {
                console.log("ID доски не указан");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/desks/${deskId}`);
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                const deskData: DeskData = await response.json();

                setDeskCh(deskData.title);
                setDeskDescriptionCh(deskData.description);
            } catch (err) {
                console.error('Ошибка загрузки данных доски:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDeskData();
    }, [deskId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!deskId) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/desks/${deskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: deskNameCh,
                    description: deskDescriptionCh,
                }),
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            navigate("/");

        } catch (err) {
            console.error('Ошибка при обновлении данных:', err);
        }
    };

    if (loading) {
        return (
            <>
                <NavLinks />
                <Container>
                    <h1>Загрузка...</h1>
                </Container>
            </>
        );
    }

    return (
        <>
            <NavLinks />
            <Container>
                <Form onSubmit={handleSubmit} className={classes.EditPageForm}>
                    <Form.Text><h1>Изменить доску</h1></Form.Text>

                    <Form.Group className={classes.EditPageForm}>
                        <Form.Label className={classes.EditPageLabel}>Название</Form.Label>
                        <Form.Control
                            className={classes.EditPageControl}
                            type="text"
                            placeholder="Изменить название доски"
                            value={deskNameCh}
                            onChange={(e) => setDeskCh(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className={classes.EditPageForm}>
                        <Form.Label className={classes.EditPageLabel}>Описание</Form.Label>
                        <Form.Control
                            className={classes.EditPageControl}
                            as="textarea"
                            rows={3}
                            placeholder="Изменить описание доски"
                            value={deskDescriptionCh}
                            onChange={(e) => setDeskDescriptionCh(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className={classes.EditPageButton} variant="primary" type="submit">
                        Сохранить изменения
                    </Button>
                </Form>
            </Container>
        </>
    );
};
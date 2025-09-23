import {Form} from "react-bootstrap";
import classes from "../LoginPage/LoginPage.module.scss";
import Button from "react-bootstrap/Button";
import {useState} from "react";

export const Edit = () => {
    const [deskNameCh,setDeskCh] = useState("");
    const [deskDescriptionCh,setDeskDescriptionCh] = useState("");
    const deskData=fetch('http://localhost:3000/desks',{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            id:'desk1',
            title:'deskTitle',
            description:'Desk description',
        })
    })
        .then(res=>console.log(res))
        .catch(err=>{
            console.log('Error:', err)
        })
    const handleSubmit=(e:any)=>{
        e.preventDefault();

    }
    return (
        <Form>
            <Form.Label>
                <Form.Text><h1>Изменить доску</h1></Form.Text>
                <Form.Group>
                    <Form.Label className={classes.LoginPageLabel}>Название</Form.Label>
                    <Form.Control
                        className={classes.LoginPageControl}
                        type="text"
                        placeholder="Изменить название доски"
                        value={deskNameCh}
                        defaultValue={''}
                        onChange={(e) => setDeskCh(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label className={classes.LoginPageLabel}>Описание</Form.Label>
                    <Form.Control
                        className={classes.LoginPageControl}
                        type="text"
                        placeholder="Изменить описание доски"
                        value={deskDescriptionCh}
                        defaultValue={''}
                        onChange={(e) => setDeskDescriptionCh(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button className={classes.LoginPageButton} variant="primary" type="submit" onClick={handleSubmit}>
                    Сохранить
                </Button>
            </Form.Label>
        </Form>
    );
};
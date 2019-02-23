import React from 'react'
import {Container, Card} from 'react-bootstrap'
import {storageKeys as CONST} from "../../constants";
import {Redirect} from 'react-router-dom';
import {vol_pages} from '../constants'

const FILE = './src/Volunteer/components/Reg.js';

class Reg extends React.Component {

    constructor(props) {
        super(props);

        props.activNavItem(vol_pages.REG);
    }

    render() {
        const FUNC = 'render()';
        console.log(FILE, FUNC, '\n', 'start');

        const token = localStorage.getItem(CONST.TOKEN) || sessionStorage.getItem(CONST.TOKEN);
        if (token === null) return <Redirect to="/volunteer/login"/>;

        return (
            <Container  className="d-flex align-items-center">
                <Card className="my-3 w-100">
                    <Card.Header style={{background: "#7fd5fc"}}>
                        <h1 className="display-4 text-white m-0">Регистрация</h1>
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote text-right">
                            <p className="mb-0">В данном разделе будет форма для регистрации в системе новых волонтеров.</p>
                            <footer className="blockquote-footer">Разработчик <cite title="Название источника">Ковальчук А . Д. &copy; {new Date().getFullYear()}</cite></footer>
                        </blockquote>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Reg;
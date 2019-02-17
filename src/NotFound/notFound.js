import React from 'react'
import {Jumbotron, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './notFound.css'

export default class NotFound extends React.Component {

    constructor(){
        super();

        document.title = "NotFound";
    }

    render() {
        return (
            <div className="bodyNotFound">
                <Container className="d-flex text-center align-items-center"
                           style={{height: "100vh"}}>
                    <Jumbotron className="m-2 w-100">
                        <h1 className="display-4">404</h1>
                        <p className="lead">Прости. Не удалось найти страницу по твоему запросу :(</p>
                        <hr className="my-4"/>
                        <p>Можешь перейти на основную страницу нашего сайта.</p>
                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" role="button" to="/">Перейти</Link>
                        </p>
                    </Jumbotron>
                </Container>
            </div>
        );
    }
}
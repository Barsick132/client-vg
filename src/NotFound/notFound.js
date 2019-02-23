import React from 'react'
import {Card, Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './notFound.css'

export default class NotFound extends React.Component {

    constructor() {
        super();

        document.title = "NotFound";
    }

    render() {
        return (
            <div className="bodyNotFound h-100">
                <Container className="d-flex justify-content-center text-center h-100">
                    <Row>
                        <Col className="align-self-center">
                            <Card className="w-100 my-3 px-3" style={{background: '#e8f6ff'}}>
                                <h1 className="display-4">404</h1>
                                <p className="lead">Прости. Не удалось найти страницу по твоему запросу :(</p>
                                <hr className="my-4"/>
                                <p>Можешь перейти на основную страницу нашего сайта.</p>
                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" role="button" to="/">Перейти</Link>
                                </p>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
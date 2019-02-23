import React from 'react'
import {Card, Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {vol_pages} from "../constants";

export default class NotFoundVol extends React.Component {

    constructor(props) {
        super(props);

        props.activNavItem(vol_pages.NOT_FOUND_VOL);
    }

    render() {
        return (
            <Container className="d-flex justify-content-center text-center" style={{height: '85%'}}>
                <Row>
                    <Col className="align-self-center">
                        <Card className="w-100 my-3 px-3" style={{background: '#e8f6ff'}}>
                            <h1 className="display-4">404</h1>
                            <p className="lead">Прости. Не удалось найти страницу по твоему запросу :(</p>
                            <hr className="my-4"/>
                            <p>Можешь перейти на основную страницу панели Voice Gen. Vol.</p>
                            <p className="lead">
                                <Link className="btn btn-primary btn-lg" role="button" to="/volunteer">Перейти</Link>
                            </p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}
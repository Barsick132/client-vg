import React from 'react'
import {Container, Card, Alert, Row, Col, Image, Form, InputGroup, Button} from 'react-bootstrap'
import {storageKeys as CONST} from "../../constants";
import {Redirect} from 'react-router-dom';
import {vol_pages} from "../constants";

const FILE = './src/Volunteer/components/Requests.js';

class Requests extends React.Component {

    constructor(props) {
        super(props);

        props.activNavItem(vol_pages.REQUEST);

        this.state = {
            vol_id: localStorage.getItem(CONST.VOL_ID) || sessionStorage.getItem(CONST.VOL_ID),
            token: localStorage.getItem(CONST.TOKEN) || sessionStorage.getItem(CONST.TOKEN)
        };

        this.props.waitingReq(this.state.vol_id, this.state.token);
    }

    render() {
        const FUNC = 'render()';
        console.log(FILE, FUNC, '\n', 'start');

        if (this.state.token === null) return <Redirect to="/volunteer/login"/>;

        const req_data = this.props.rqt_data;

        const parseDate = date => {
            const options = {
                year: '2-digit',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            };
            return date.toLocaleString("ru", options);
        };

        return (
            <Container className="d-flex align-items-center">
                {this.props.errorMsgRqt && <Alert>
                    <Alert.Heading>{this.prps.errorMsgRqt.head}</Alert.Heading>
                    <p>{this.props.errorMsgRqt.body}</p>
                    <hr/>
                    {this.props.errorMsgRqt.buttons && (
                        <div className="d-flex justify-content-end">
                            {this.props.errorMsgRqt.buttons.map((btn) => (
                                <Button onClick={btn.click} variant="outline-success">
                                    {btn.text}
                                </Button>
                            ))}
                        </div>
                    )}
                </Alert>}

                <Card className="my-3 w-100">
                    <Card.Header className="media" style={{background: "#7fd5fc"}}>
                        {req_data === undefined &&
                        <div className="spinner-border text-light mr-3 align-self-center" role="status">
                            <span className="sr-only">Загрузка...</span>
                        </div>}
                        <h1 className="display-4 text-white m-0">Заявки</h1>
                    </Card.Header>
                    <Card.Body>
                        {req_data === undefined &&
                        <p className="lead">
                            На данный момент заявок нет. Можешь выпить горячего чаю
                            <span role="img" aria-label="HOT BEVERAGE">&nbsp;&#9749;&nbsp;</span>
                            пока ожидаешь<span role="img" aria-label="WINKING FACE">&nbsp;&#128521;&nbsp;</span></p>}
                        {req_data && (
                            <Container>
                                <Row>
                                    <Col>
                                        <p className="lead">Заявка №{req_data.rqt_id}</p>
                                    </Col>
                                    <Col>
                                        <p className="lead text-right">{parseDate(new Date(req_data.rqt_dt))}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form>
                                            {req_data.rqt_url && (
                                                <Form.Group controlId="formUrlGroup">
                                                    <Form.Label>Ссылка на подозрительный ресурс</Form.Label>
                                                    <Form.Control type="url"
                                                                  readOnly={true} value={req_data.rqt_url}/>
                                                </Form.Group>
                                            )}
                                            {req_data.cli_data.cli_fullname && (
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="inpGroupName">Имя</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control type="text" readOnly={true}
                                                                  aria-label="Имя" aria-describedby="inpGroupName"
                                                                  value={req_data.cli_data.cli_fullname}/>
                                                </InputGroup>
                                            )}
                                            {req_data.cli_data.cli_email && (
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="inpGroupEmail">Email</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control type="email" readOnly={true}
                                                                  aria-label="Email" aria-describedby="inpGroupEmail"
                                                                  value={req_data.cli_data.cli_email}/>
                                                </InputGroup>
                                            )}
                                            {req_data.cli_data.cli_phone && (
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="inpGroupPhone">Телефон</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control type="tel" readOnly={true}
                                                                  aria-label="Телефон" aria-describedby="inpGroupPhone"
                                                                  value={req_data.cli_data.cli_phone}/>
                                                </InputGroup>
                                            )}
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Image src={"https://" + req_data.rqt_imgsource} fluid />;
                                    </Col>
                                </Row>
                            </Container>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default Requests;
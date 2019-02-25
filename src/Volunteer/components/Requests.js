import React from 'react'
import {Container, Card, Alert, Row, Col, Image, Form, InputGroup, Button} from 'react-bootstrap'
import {storageKeys as CONST} from "../../constants";
import {Redirect} from 'react-router-dom';
import {vol_pages} from "../constants";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCopy} from '@fortawesome/free-solid-svg-icons'
import {Chat} from "./Chat";

const FILE = './src/Volunteer/components/Requests.js';

class Requests extends React.Component {

    constructor(props) {
        super(props);
        const FUNC = 'constructor(props)';
        console.log(FILE, FUNC, '\n', 'start');

        props.activNavItem(vol_pages.REQUEST);

        this.state = {
            vol_id: localStorage.getItem(CONST.VOL_ID) || sessionStorage.getItem(CONST.VOL_ID),
            token: localStorage.getItem(CONST.TOKEN) || sessionStorage.getItem(CONST.TOKEN)
        };

        this.props.waitingReq(this.state.vol_id, this.state.token);

        this.onCopy = this.onCopy.bind(this);
    }

    onCopy(e) {
        const FUNC = 'onCopy(e)';
        navigator.clipboard.writeText(e)
            .then(() => {
                console.log(FILE, FUNC, '\n', 'successful');
            })
            .catch(err => {
                console.log(FILE, FUNC, '\n', 'unSuccessful: ', err);
            });
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
            <Container className="my-3">
                {this.props.errorMsgRqt !== undefined &&
                <Row>
                    <Col>
                        <Alert variant="danger">
                            <Alert.Heading>
                                <div dangerouslySetInnerHTML={this.props.errorMsgRqt.head}/>
                            </Alert.Heading>
                            <p>
                                <div dangerouslySetInnerHTML={this.props.errorMsgRqt.body}/>
                            </p>
                            <hr/>
                            {this.props.errorMsgRqt.buttons && (
                                <div className="d-flex justify-content-end">
                                    {this.props.errorMsgRqt.buttons.map((btn) => {
                                        return (
                                            <Button onClick={() => {
                                                const user_data = {
                                                    vol_id: localStorage.getItem(CONST.VOL_ID) || sessionStorage.getItem(CONST.VOL_ID),
                                                    token: localStorage.getItem(CONST.TOKEN) || sessionStorage.getItem(CONST.TOKEN)
                                                };
                                                btn.click(user_data.vol_id, user_data.token)
                                            }}
                                                    variant="success">
                                                {btn.text}
                                            </Button>
                                        )
                                    })}
                                </div>
                            )}
                        </Alert>
                    </Col>
                </Row>}

                <Row>
                    <Col>
                        <Card>
                            <Card.Header className="media" style={{background: "#7fd5fc"}}>
                                <Container>
                                    <Row className="d-flex align-items-center">
                                        <Col sm={8}>
                                            {req_data === undefined && this.props.errorMsgRqt === undefined &&
                                            <div
                                                className="d-sm-inline-block align-baseline spinner-border text-light mr-3"
                                                role="status">
                                                <span className="sr-only">Загрузка...</span>
                                            </div>}
                                            <h1 className="d-sm-inline-block display-4 text-white m-0">Заявки</h1>
                                        </Col>
                                        {req_data !== undefined && this.props.errorMsgRqt === undefined && (
                                            <Col sm={4} className="text-sm-right">
                                                <Button variant="success" size="lg" onClick={() => {
                                                    const user_data = {
                                                        vol_id: localStorage.getItem(CONST.VOL_ID) || sessionStorage.getItem(CONST.VOL_ID),
                                                        token: localStorage.getItem(CONST.TOKEN) || sessionStorage.getItem(CONST.TOKEN)
                                                    };
                                                    this.props.closeReq(req_data.rqt_id, user_data.vol_id, user_data.token);
                                                }}>Далее</Button>
                                            </Col>
                                        )}
                                    </Row>
                                </Container>
                            </Card.Header>
                            <Card.Body>
                                {req_data === undefined &&
                                <p className="lead">
                                    На данный момент заявок нет. Можешь выпить горячего чаю
                                    <span role="img" aria-label="HOT BEVERAGE">&nbsp;&#9749;&nbsp;</span>
                                    пока ожидаешь<span role="img" aria-label="WINKING FACE">&nbsp;&#128521;&nbsp;</span>
                                </p>}
                                {req_data && (
                                    <Container>

                                        <Row>
                                            <Col sm>
                                                <p className="lead">Заявка №{req_data.rqt_id}</p>
                                            </Col>
                                            <Col sm>
                                                <p className="lead text-sm-right">{parseDate(new Date(req_data.rqt_dt))}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md>
                                                <Form>
                                                    {req_data.rqt_url && (
                                                        <Form.Group controlId="formUrlGroup">
                                                            <Form.Label>Ссылка на подозрительный ресурс</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control type="url"
                                                                              className="bg-white text-dark"
                                                                              readOnly={true}
                                                                              aria-label="URL"
                                                                              value={req_data.rqt_url}/>
                                                                <InputGroup.Append>
                                                                    <Button variant="outline-info"
                                                                            onClick={() => this.onCopy(req_data.rqt_url)}>
                                                                        <FontAwesomeIcon icon={faCopy}/>
                                                                    </Button>
                                                                </InputGroup.Append>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    )}
                                                    {req_data.rqt_comment && (
                                                        <Form.Group controlId="formUrlGroup">
                                                            <Form.Label>Ссылка на подозрительный ресурс</Form.Label>
                                                            <InputGroup className="mb-3">
                                                                <Form.Control as="textarea"
                                                                              className="bg-white text-dark"
                                                                              readOnly={true}
                                                                              aria-label="URL"
                                                                              value={req_data.rqt_comment}/>
                                                                <InputGroup.Append>
                                                                    <Button variant="outline-info"
                                                                            onClick={() => this.onCopy(req_data.rqt_comment)}>
                                                                        <FontAwesomeIcon icon={faCopy}/>
                                                                    </Button>
                                                                </InputGroup.Append>
                                                            </InputGroup>
                                                        </Form.Group>
                                                    )}
                                                    {req_data.cli_data.cli_fullname && (
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inpGroupName"
                                                                                 className="bg-info text-white">
                                                                    Имя
                                                                </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control type="text"
                                                                          className="bg-white text-dark"
                                                                          readOnly={true}
                                                                          aria-label="Имя"
                                                                          aria-describedby="inpGroupName"
                                                                          value={req_data.cli_data.cli_fullname}/>
                                                            <InputGroup.Append>
                                                                <Button variant="outline-info"
                                                                        onClick={() => this.onCopy(req_data.cli_data.cli_fullname)}>
                                                                    <FontAwesomeIcon icon={faCopy}/>
                                                                </Button>
                                                            </InputGroup.Append>
                                                        </InputGroup>
                                                    )}
                                                    {req_data.cli_data.cli_email && (
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inpGroupEmail"
                                                                                 className="bg-info text-white">
                                                                    Email
                                                                </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control type="email"
                                                                          className="bg-white text-dark"
                                                                          readOnly={true}
                                                                          aria-label="Email"
                                                                          aria-describedby="inpGroupEmail"
                                                                          value={req_data.cli_data.cli_email}/>
                                                            <InputGroup.Append>
                                                                <Button variant="outline-info"
                                                                        onClick={() => this.onCopy(req_data.cli_data.cli_email)}>
                                                                    <FontAwesomeIcon icon={faCopy}/>
                                                                </Button>
                                                            </InputGroup.Append>
                                                        </InputGroup>
                                                    )}
                                                    {req_data.cli_data.cli_phone && (
                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Prepend>
                                                                <InputGroup.Text id="inpGroupPhone"
                                                                                 className="bg-info text-white">
                                                                    Телефон
                                                                </InputGroup.Text>
                                                                <InputGroup.Text id="inpGroupPhone2"
                                                                                 className="bg-info text-white">
                                                                    +7
                                                                </InputGroup.Text>
                                                            </InputGroup.Prepend>
                                                            <Form.Control type="tel"
                                                                          className="bg-white text-dark"
                                                                          readOnly={true}
                                                                          aria-label="Телефон"
                                                                          aria-describedby="inpGroupPhone"
                                                                          value={req_data.cli_data.cli_phone}/>
                                                            <InputGroup.Append>
                                                                <Button variant="outline-info"
                                                                        onClick={() => this.onCopy(req_data.cli_data.cli_phone)}
                                                                >
                                                                    <FontAwesomeIcon icon={faCopy}/>
                                                                </Button>
                                                            </InputGroup.Append>
                                                        </InputGroup>
                                                    )}
                                                </Form>
                                            </Col>
                                            <Col md>
                                                <Row>
                                                    <Col>
                                                        <Image className="lead"
                                                               src={"https://" + req_data.rqt_imgsource}
                                                               alt="Не удалось загрузить скриншот" fluid={true}/>
                                                    </Col>
                                                </Row>
                                                {req_data.dlg_id && (
                                                    <Row>
                                                        <Chat dlg_id={req_data.dlg_id}
                                                              rqt_id={req_data.rqt_id}
                                                              cli_fullname={req_data.cli_data.cli_fullname}
                                                              vol_id={localStorage.getItem(CONST.VOL_ID) ||
                                                              sessionStorage.getItem(CONST.VOL_ID)}
                                                              vol_fullname={localStorage.getItem(CONST.VOL_FULLNAME) ||
                                                              sessionStorage.getItem(CONST.VOL_FULLNAME)}
                                                              vol_admin={localStorage.getItem(CONST.VOL_ADMIN) ||
                                                              sessionStorage.getItem(CONST.VOL_ADMIN)}
                                                              hideChat={req_data === undefined}
                                                        />
                                                    </Row>)}
                                            </Col>
                                        </Row>
                                    </Container>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Requests;